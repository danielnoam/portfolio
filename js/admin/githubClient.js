/*==============================================
            GITHUB CLIENT MODULE

    The panel's "backend". Reads the files it edits
    straight from the repo and writes them back
    through the Git Data API, so a save that touches
    config.js, a new content.md and CHANGELOG.md
    lands as ONE commit — and therefore one Pages
    deploy — instead of three.
================================================*/

const API_ROOT = 'https://api.github.com';
const FILE_MODE = '100644';

// Used when the location can't say which repo this is — i.e. local development.
const FALLBACK_REPO = { owner: 'danielnoam', repo: 'portfolio', branch: 'main' };

/**
 * Work out which repository the panel is editing from where it is being
 * served: a project page lives at `<owner>.github.io/<repo>/`, which is
 * everything needed. Deriving it means there is nothing to fill in by hand
 * and nothing to keep in sync if the repo is ever renamed.
 */
export function detectRepository() {
    const userSite = window.location.hostname.match(/^([^.]+)\.github\.io$/);
    const owner = userSite ? userSite[1] : FALLBACK_REPO.owner;

    // The first path segment is the repo on a project page. A segment with a
    // dot in it is a file (admin.html), which means this is a user site.
    const [, firstSegment] = window.location.pathname.split('/');
    const isRepoSegment = firstSegment && !firstSegment.includes('.');

    const repo = isRepoSegment
        ? firstSegment
        : (userSite ? `${owner}.github.io` : FALLBACK_REPO.repo);

    return { owner, repo, branch: FALLBACK_REPO.branch };
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** Base64 for arbitrary UTF-8 text (btoa alone chokes on non-Latin-1). */
function encodeContent(text) {
    let binary = '';
    for (const byte of encoder.encode(text)) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function decodeContent(base64) {
    const binary = atob(base64.replace(/\n/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return decoder.decode(bytes);
}

export class GitHubClient {
    constructor({ token, owner, repo, branch }) {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
        this.branch = branch;
    }

    get repoPath() {
        return `${this.owner}/${this.repo}`;
    }

    async request(endpoint, options = {}) {
        const response = await fetch(`${API_ROOT}${endpoint}`, {
            ...options,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${this.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                ...(options.body ? { 'Content-Type': 'application/json' } : {}),
                ...options.headers
            }
        });

        if (response.status === 404 && options.allow404) return null;

        if (!response.ok) {
            const detail = await response.json().catch(() => ({}));
            throw new Error(this._describeError(response, detail));
        }

        return response.status === 204 ? null : response.json();
    }

    _describeError(response, detail) {
        const message = detail.message || response.statusText;

        if (response.status === 401) {
            return 'GitHub rejected the token (401). It may have expired or been revoked — set up admin access again with a new one.';
        }
        if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
            return 'GitHub API rate limit reached. Try again in a few minutes.';
        }
        if (response.status === 403 || response.status === 404) {
            return `GitHub denied access to ${this.repoPath} (${response.status}). Check the token has Contents: Read and write on this repository.`;
        }
        if (response.status === 409) {
            return 'The branch moved while you were editing. Reload the panel to pick up the latest version, then re-apply your changes.';
        }
        return `GitHub API error ${response.status}: ${message}`;
    }

    /** Confirm the token can actually see the repo, before showing the editor. */
    async verifyAccess() {
        const repo = await this.request(`/repos/${this.repoPath}`);
        if (!repo.permissions?.push) {
            throw new Error(`The token can read ${this.repoPath} but not write to it. It needs Contents: Read and write.`);
        }
        return repo;
    }

    /** File text plus its blob sha, or null when the path doesn't exist. */
    async getFile(path) {
        const result = await this.request(
            `/repos/${this.repoPath}/contents/${encodeURI(path)}?ref=${encodeURIComponent(this.branch)}`,
            { allow404: true }
        );
        if (!result || Array.isArray(result)) return null;
        return { text: decodeContent(result.content), sha: result.sha };
    }

    /** Every file path under `path`, recursively. Empty when it doesn't exist. */
    async listFiles(path) {
        const entries = await this.request(
            `/repos/${this.repoPath}/contents/${encodeURI(path)}?ref=${encodeURIComponent(this.branch)}`,
            { allow404: true }
        );
        if (!Array.isArray(entries)) return [];

        const files = [];
        for (const entry of entries) {
            if (entry.type === 'dir') {
                files.push(...await this.listFiles(entry.path));
            } else {
                files.push(entry.path);
            }
        }
        return files;
    }

    /**
     * Commit a set of changes as one commit and move the branch to it.
     * `changes` are `{ path, content }` to write, or `{ path, deleted: true }`.
     * Returns the new commit's sha and URL.
     */
    async commit(message, changes) {
        if (!changes.length) throw new Error('Nothing to commit.');

        const ref = await this.request(
            `/repos/${this.repoPath}/git/ref/heads/${encodeURIComponent(this.branch)}`
        );
        const headSha = ref.object.sha;
        const headCommit = await this.request(
            `/repos/${this.repoPath}/git/commits/${headSha}`
        );

        const tree = [];
        for (const change of changes) {
            if (change.deleted) {
                tree.push({ path: change.path, mode: FILE_MODE, type: 'blob', sha: null });
                continue;
            }

            const blob = await this.request(`/repos/${this.repoPath}/git/blobs`, {
                method: 'POST',
                body: JSON.stringify({ content: encodeContent(change.content), encoding: 'base64' })
            });
            tree.push({ path: change.path, mode: FILE_MODE, type: 'blob', sha: blob.sha });
        }

        const newTree = await this.request(`/repos/${this.repoPath}/git/trees`, {
            method: 'POST',
            body: JSON.stringify({ base_tree: headCommit.tree.sha, tree })
        });

        const commit = await this.request(`/repos/${this.repoPath}/git/commits`, {
            method: 'POST',
            body: JSON.stringify({ message, tree: newTree.sha, parents: [headSha] })
        });

        await this.request(
            `/repos/${this.repoPath}/git/refs/heads/${encodeURIComponent(this.branch)}`,
            { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) }
        );

        return { sha: commit.sha, url: commit.html_url };
    }
}
