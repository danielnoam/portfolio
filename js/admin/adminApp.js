/*==============================================
            ADMIN APP MODULE

    Wires the login screen, the page/section editor
    and the publish flow together.

    The editor works on an in-memory model and never
    touches the live site as you type — nothing is
    real until you publish, at which point one commit
    to the deploy branch rewrites config.js (and, for
    new pages, adds their content.md).
================================================*/

import { vault } from './vault.js';
import { GitHubClient, detectRepository } from './githubClient.js';
import * as changeSet from './changeSet.js';
import {
    paths,
    parseConfig,
    toModel,
    cloneModel,
    applyStructure,
    getVersion,
    applyVersion,
    bumpPatch,
    prependChangelogEntry,
    newPageContent,
    contentPath,
    suggestFolder
} from './configFile.js';

const DEFAULT_COMMIT_MESSAGE = 'Update site pages from the admin panel';

/** Page slugs the router already answers to, so a new page can't shadow them. */
const RESERVED_SLUGS = ['about', 'admin', 'index'];

function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);

    Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key === 'class') node.className = value;
        else if (key === 'dataset') Object.assign(node.dataset, value);
        else if (key in node) node[key] = value;
        else node.setAttribute(key, value);
    });

    (Array.isArray(children) ? children : [children])
        .filter(child => child !== null && child !== undefined)
        .forEach(child => node.append(child));

    return node;
}

function $(selector) {
    return document.querySelector(selector);
}

export class AdminApp {
    constructor() {
        this.client = null;
        this.token = null;
        this.passkeySupported = false;

        this.configSource = '';
        this.original = [];
        this.model = [];
        this.staticSlugs = [];
    }

    /*==============================================
                BOOTSTRAP
    ================================================*/

    init() {
        this._bindAuthScreen();
        this._bindEditorScreen();

        window.addEventListener('beforeunload', event => {
            if (this.client && this._changes().length) {
                event.preventDefault();
                event.returnValue = '';
            }
        });

        this._start();
    }

    async _start() {
        this.passkeySupported = await vault.isPasskeySupported();
        this._showAuthScreen();
    }

    /*==============================================
                AUTH SCREEN
    ================================================*/

    _bindAuthScreen() {
        $('#setup-form').addEventListener('submit', event => {
            event.preventDefault();
            this._handleSetup();
        });

        $('#pin-form').addEventListener('submit', event => {
            event.preventDefault();
            this._handleUnlock(() => vault.unlockWithPin($('#pin').value), 'Unlocking…');
        });

        $('#passkey-btn').addEventListener('click', () => {
            this._handleUnlock(() => vault.unlockWithPasskey(), 'Waiting for Face ID…');
        });

        $('#toggle-token').addEventListener('click', () => {
            const field = $('#token');
            const revealed = field.type === 'text';
            field.type = revealed ? 'password' : 'text';
            $('#toggle-token').textContent = revealed ? 'Show' : 'Hide';
        });

        $('#reset-vault').addEventListener('click', () => {
            if (!confirm('Forget the token stored on this device and start over?')) return;
            vault.clear();
            this._showAuthScreen();
        });

        $('#add-passkey').addEventListener('click', () => this._addPasskey());

        $('#lock-btn').addEventListener('click', () => {
            if (this._changes().length && !confirm('You have unpublished changes. Log out and discard them?')) return;
            this._logout();
        });
    }

    _logout() {
        this.client = null;
        this.token = null;
        this._showAuthScreen();
        this._toast('Logged out. The token stays encrypted on this device.', 'ok');
    }

    _showAuthScreen() {
        const returning = vault.exists();

        $('#editor-screen').hidden = true;
        $('#auth-screen').hidden = false;
        $('#lock-btn').hidden = true;
        $('#add-passkey').hidden = true;
        $('#repo-label').textContent = '';
        $('#config-version').textContent = '';

        $('#login-panel').hidden = !returning;
        $('#setup-panel').hidden = returning;

        // Biometric unlock only appears once it has actually been set up here.
        const passkeyReady = returning && vault.hasPasskey();
        $('#passkey-btn').hidden = !passkeyReady;
        $('#unlock-divider').hidden = !passkeyReady;
        $('#biometric-opt').hidden = returning || !this.passkeySupported;

        ['#token', '#new-pin', '#pin'].forEach(selector => { $(selector).value = ''; });
        $('#auth-error').textContent = '';
        $('#auth-status').textContent = '';

        const focusTarget = returning ? (passkeyReady ? '#passkey-btn' : '#pin') : '#token';
        requestAnimationFrame(() => $(focusTarget).focus());
    }

    async _handleSetup() {
        const token = $('#token').value.trim();
        const pin = $('#new-pin').value.trim();
        const wantsPasskey = this.passkeySupported && $('#enable-passkey').checked;

        if (!token) {
            this._authError('Paste a GitHub token to continue.');
            return;
        }
        if (pin.length < vault.minPinLength) {
            this._authError(`The PIN needs at least ${vault.minPinLength} digits.`);
            return;
        }

        this._setAuthBusy(true, 'Checking the token…');
        let connection;

        try {
            // Prove the token works before storing anything, so a typo fails
            // here rather than after the vault is written.
            connection = await this._connect(token);

            this._setAuthBusy(true, 'Encrypting…');
            await vault.create(token, pin);
        } catch (error) {
            this._authError(error.message);
            this._setAuthBusy(false);
            return;
        }

        if (wantsPasskey) {
            // Not fatal — the PIN vault already exists, so the panel stays
            // usable and biometrics can be added from the editor later.
            this._setAuthBusy(true, 'Waiting for Face ID…');
            try {
                await vault.enablePasskey(token);
            } catch (error) {
                this._toast(`Set up without biometric unlock: ${error.message}`, 'warn');
            }
        }

        this._setAuthBusy(false);
        await this._enterEditor(connection, token);
        this._syncPasskeyButton();
    }

    async _handleUnlock(unlock, busyMessage) {
        this._setAuthBusy(true, busyMessage);

        try {
            const token = await unlock();
            this._setAuthBusy(true, 'Loading…');
            await this._enterEditor(await this._connect(token), token);
            this._syncPasskeyButton();
        } catch (error) {
            this._authError(error.message);
        } finally {
            this._setAuthBusy(false);
        }
    }

    /** Offer to add biometrics later if the device could do it but hasn't. */
    _syncPasskeyButton() {
        $('#add-passkey').hidden = !this.passkeySupported || vault.hasPasskey();
    }

    async _addPasskey() {
        $('#add-passkey').disabled = true;

        try {
            await vault.enablePasskey(this.token);
            this._syncPasskeyButton();
            this._toast('Biometric unlock added on this device.', 'ok');
        } catch (error) {
            this._toast(error.message, 'error');
        } finally {
            $('#add-passkey').disabled = false;
        }
    }

    _authError(message) {
        $('#auth-error').textContent = message;
    }

    _setAuthBusy(busy, message = '') {
        document.querySelectorAll('#auth-screen button, #auth-screen input')
            .forEach(node => { node.disabled = busy; });
        $('#auth-status').textContent = busy ? message : '';
    }

    /*==============================================
                LOADING THE CONFIG
    ================================================*/

    /**
     * Check the token can reach the repo. Kept separate from opening the
     * editor so setup can verify, then store, then show — a vault that failed
     * to write should never be hidden behind a working editor.
     */
    async _connect(token) {
        const repository = detectRepository();
        const client = new GitHubClient({ token, ...repository });
        await client.verifyAccess();
        return { client, repository };
    }

    async _enterEditor({ client, repository }, token) {
        this.client = client;
        // Kept in memory so biometrics can be added later without re-entry.
        this.token = token;
        await this._loadConfig();

        $('#auth-screen').hidden = true;
        $('#editor-screen').hidden = false;
        $('#lock-btn').hidden = false;
        $('#repo-label').textContent = `${repository.owner}/${repository.repo} · ${repository.branch}`;

        this.render();
    }

    async _loadConfig() {
        const file = await this.client.getFile(paths.config);
        if (!file) throw new Error(`${paths.config} was not found on this branch.`);

        const config = parseConfig(file.text);

        this.configSource = file.text;
        this.model = toModel(config.structure || {});
        this.original = cloneModel(this.model);

        // Pages reached through the static nav lists rather than `structure`.
        // They own their slugs, so the editor must not hand the same one out.
        const staticLinks = [
            ...(config.navigation?.staticLinks || []),
            ...(config.navigation?.bottomLinks || [])
        ];
        this.staticSlugs = staticLinks
            .filter(link => link.type === 'content' && link.path)
            .map(link => link.path.split('/').slice(-2, -1)[0]);

        $('#config-version').textContent = `v${getVersion(file.text)}`;
    }

    /*==============================================
                RENDERING
    ================================================*/

    render() {
        const list = $('#sections');
        list.replaceChildren(...this.model.map(section => this._renderSection(section)));

        if (!this.model.length) {
            list.append(el('p', {
                class: 'empty-note',
                textContent: 'No sections yet. Add one to start building the sidebar.'
            }));
        }

        this._updateSaveBar();
    }

    _renderSection(section) {
        const index = this.model.indexOf(section);

        const header = el('header', { class: 'section-head' }, [
            el('input', {
                type: 'text',
                class: 'section-name',
                value: section.name,
                'aria-label': 'Section name',
                dataset: { field: 'section-name', id: section.id }
            }),
            el('label', { class: 'checkbox' }, [
                el('input', {
                    type: 'checkbox',
                    checked: section.foldout,
                    dataset: { field: 'section-foldout', id: section.id }
                }),
                'Collapsible'
            ]),
            el('div', { class: 'row-actions' }, [
                this._iconButton('↑', 'Move section up', 'section-up', section.id, index === 0),
                this._iconButton('↓', 'Move section down', 'section-down', section.id, index === this.model.length - 1),
                this._textButton('Delete', 'section-delete', section.id, 'danger')
            ])
        ]);

        const pages = section.pages.length
            ? section.pages.map(page => this._renderPage(section, page))
            : [el('li', { class: 'empty-note', textContent: 'No pages in this section yet.' })];

        return el('article', { class: 'section-card', dataset: { id: section.id } }, [
            header,
            el('ul', { class: 'page-list' }, pages),
            el('div', { class: 'section-foot' }, [
                this._textButton('+ Add page', 'page-add', section.id)
            ])
        ]);
    }

    _renderPage(section, page) {
        const index = section.pages.indexOf(page);

        const sectionPicker = el('select', {
            class: 'page-section',
            'aria-label': 'Section',
            dataset: { field: 'page-section', id: page.id }
        }, this.model.map(target => el('option', {
            value: target.id,
            textContent: target.name || 'Untitled section',
            selected: target.id === section.id
        })));

        return el('li', {
            class: `page-row${page.visible ? '' : ' is-hidden'}`,
            dataset: { id: page.id }
        }, [
            el('div', { class: 'page-fields' }, [
                el('input', {
                    type: 'text',
                    class: 'page-title',
                    value: page.title,
                    placeholder: 'Page title',
                    'aria-label': 'Page title',
                    dataset: { field: 'page-title', id: page.id }
                }),
                el('input', {
                    type: 'text',
                    class: 'page-folder',
                    value: page.folder,
                    placeholder: 'content/section/page',
                    'aria-label': 'Content folder',
                    dataset: { field: 'page-folder', id: page.id }
                })
            ]),
            el('div', { class: 'page-controls' }, [
                el('label', { class: 'checkbox' }, [
                    el('input', {
                        type: 'checkbox',
                        checked: page.visible,
                        dataset: { field: 'page-visible', id: page.id }
                    }),
                    'Visible'
                ]),
                sectionPicker,
                this._iconButton('↑', 'Move page up', 'page-up', page.id, index === 0),
                this._iconButton('↓', 'Move page down', 'page-down', page.id, index === section.pages.length - 1),
                this._textButton('Remove', 'page-delete', page.id, 'danger')
            ])
        ]);
    }

    _iconButton(label, title, action, id, disabled = false) {
        return el('button', {
            type: 'button',
            class: 'icon-btn',
            textContent: label,
            title,
            'aria-label': title,
            disabled,
            dataset: { action, id }
        });
    }

    _textButton(label, action, id, variant = '') {
        return el('button', {
            type: 'button',
            class: `text-btn ${variant}`.trim(),
            textContent: label,
            dataset: { action, id }
        });
    }

    /*==============================================
                EDITING
    ================================================*/

    _bindEditorScreen() {
        const list = $('#sections');

        list.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (button) this._handleAction(button.dataset.action, button.dataset.id);
        });

        // Typing edits the model in place; re-rendering here would steal focus
        // mid-word, so only structural actions above trigger a redraw.
        list.addEventListener('input', event => {
            const field = event.target.dataset.field;
            if (field) this._handleFieldInput(field, event.target);
        });

        list.addEventListener('change', event => {
            const field = event.target.dataset.field;
            if (field === 'page-section') this._movePageToSection(event.target.dataset.id, event.target.value);
        });

        $('#add-section').addEventListener('click', () => this._addSection());
        $('#reload-config').addEventListener('click', () => this._reload());
        $('#discard-changes').addEventListener('click', () => this._discard());
        $('#review-changes').addEventListener('click', () => this._openPublishDialog());
        $('#publish-form').addEventListener('submit', event => {
            event.preventDefault();
            this._publish();
        });
        $('#publish-cancel').addEventListener('click', () => $('#publish-dialog').close());
    }

    _findSection(id) {
        return this.model.find(section => section.id === id);
    }

    _findPage(id) {
        for (const section of this.model) {
            const page = section.pages.find(candidate => candidate.id === id);
            if (page) return { section, page };
        }
        return null;
    }

    _handleFieldInput(field, input) {
        const id = input.dataset.id;

        if (field === 'section-name') {
            this._findSection(id).name = input.value;
            // The section pickers list section names, so keep them in step.
            document.querySelectorAll(`.page-section option[value="${id}"]`)
                .forEach(option => { option.textContent = input.value || 'Untitled section'; });
        } else if (field === 'section-foldout') {
            this._findSection(id).foldout = input.checked;
        } else if (field === 'page-title') {
            this._findPage(id).page.title = input.value;
        } else if (field === 'page-folder') {
            this._findPage(id).page.folder = input.value.trim();
        } else if (field === 'page-visible') {
            const { page } = this._findPage(id);
            page.visible = input.checked;
            input.closest('.page-row').classList.toggle('is-hidden', !page.visible);
        }

        this._updateSaveBar();
    }

    _handleAction(action, id) {
        const actions = {
            'section-up': () => this._moveSection(id, -1),
            'section-down': () => this._moveSection(id, 1),
            'section-delete': () => this._deleteSection(id),
            'page-add': () => this._addPage(id),
            'page-up': () => this._movePage(id, -1),
            'page-down': () => this._movePage(id, 1),
            'page-delete': () => this._deletePage(id)
        };

        if (actions[action]) {
            actions[action]();
            this.render();
        }
    }

    _addSection() {
        this.model.push({
            id: crypto.randomUUID(),
            name: 'New Section',
            foldout: false,
            pages: []
        });
        this.render();
        // A brand-new section's name is the first thing you'll want to change.
        const input = $('#sections .section-card:last-child .section-name');
        input.focus();
        input.select();
    }

    _deleteSection(id) {
        const section = this._findSection(id);
        const warning = section.pages.length
            ? `Delete the "${section.name}" section and remove its ${section.pages.length} page(s) from the sidebar?`
            : `Delete the "${section.name}" section?`;

        if (confirm(warning)) {
            this.model.splice(this.model.indexOf(section), 1);
        }
    }

    _moveSection(id, offset) {
        const index = this.model.findIndex(section => section.id === id);
        const target = index + offset;
        if (target < 0 || target >= this.model.length) return;
        [this.model[index], this.model[target]] = [this.model[target], this.model[index]];
    }

    _addPage(sectionId) {
        const section = this._findSection(sectionId);
        const title = 'New Page';

        section.pages.push({
            id: crypto.randomUUID(),
            title,
            folder: this._uniqueFolder(suggestFolder(section.name, title)),
            visible: true
        });
    }

    /** Nudge a suggested folder until its slug collides with nothing. */
    _uniqueFolder(folder) {
        const taken = new Set([
            ...this.model.flatMap(section => section.pages.map(page => this._slugOf(page.folder))),
            ...this.staticSlugs,
            ...RESERVED_SLUGS
        ]);

        const base = folder.replace(/\/+$/, '');
        if (!taken.has(this._slugOf(base))) return base;

        for (let suffix = 2; ; suffix++) {
            const candidate = `${base}-${suffix}`;
            if (!taken.has(this._slugOf(candidate))) return candidate;
        }
    }

    _slugOf(folder) {
        return folder.replace(/\/+$/, '').split('/').pop();
    }

    _deletePage(id) {
        const { section, page } = this._findPage(id);
        if (!confirm(`Remove "${page.title}" from the sidebar?`)) return;
        section.pages.splice(section.pages.indexOf(page), 1);
    }

    _movePage(id, offset) {
        const { section, page } = this._findPage(id);
        const index = section.pages.indexOf(page);
        const target = index + offset;
        if (target < 0 || target >= section.pages.length) return;
        [section.pages[index], section.pages[target]] = [section.pages[target], section.pages[index]];
    }

    _movePageToSection(pageId, sectionId) {
        const { section, page } = this._findPage(pageId);
        const target = this._findSection(sectionId);
        if (!target || target === section) return;

        section.pages.splice(section.pages.indexOf(page), 1);
        target.pages.push(page);
        this.render();
    }

    /*==============================================
                SAVE BAR + VALIDATION
    ================================================*/

    _changes() {
        return changeSet.summarize(this.original, this.model);
    }

    _updateSaveBar() {
        const changes = this._changes();
        const problems = this._validate();

        $('#change-count').textContent = changes.length
            ? `${changes.length} unpublished change${changes.length === 1 ? '' : 's'}`
            : 'No changes yet';

        $('#save-bar').classList.toggle('is-dirty', changes.length > 0);
        $('#review-changes').disabled = changes.length === 0;
        $('#discard-changes').disabled = changes.length === 0;

        const problemList = $('#problems');
        problemList.replaceChildren(...problems.map(text => el('li', { textContent: text })));
        problemList.hidden = problems.length === 0;
    }

    /**
     * Everything that would produce a broken site if published. The slug rules
     * matter most: the router resolves `/portfolio/<slug>` by the last segment
     * of a page's folder, so duplicates would make one page unreachable.
     */
    _validate() {
        const problems = [];
        const sectionNames = new Set();
        const slugs = new Map();

        this.model.forEach(section => {
            const name = section.name.trim();
            if (!name) {
                problems.push('A section has no name.');
            } else if (sectionNames.has(name.toLowerCase())) {
                problems.push(`Two sections are both called "${name}".`);
            } else {
                sectionNames.add(name.toLowerCase());
            }

            section.pages.forEach(page => {
                const label = page.title.trim() || 'an untitled page';

                if (!page.title.trim()) {
                    problems.push(`A page in "${name}" has no title.`);
                }
                if (!page.folder.trim()) {
                    problems.push(`"${label}" has no content folder.`);
                    return;
                }
                if (!/^content\/[a-zA-Z0-9._/-]+$/.test(page.folder)) {
                    problems.push(`"${label}" has an invalid folder — it must start with "content/" and avoid spaces (currently "${page.folder}").`);
                    return;
                }

                const slug = this._slugOf(page.folder);
                if (RESERVED_SLUGS.includes(slug) || this.staticSlugs.includes(slug)) {
                    problems.push(`"${label}" uses the reserved page address "/${slug}". Rename its folder.`);
                } else if (slugs.has(slug)) {
                    problems.push(`"${label}" and "${slugs.get(slug)}" would both live at "/${slug}". Folder names must end in something unique.`);
                } else {
                    slugs.set(slug, label);
                }
            });
        });

        return problems;
    }

    async _reload() {
        if (this._changes().length && !confirm('Reload from GitHub and discard your unpublished changes?')) return;

        try {
            await this._loadConfig();
            this.render();
            this._toast('Reloaded the latest config from GitHub.', 'ok');
        } catch (error) {
            this._toast(error.message, 'error');
        }
    }

    _discard() {
        if (!confirm('Discard all unpublished changes?')) return;
        this.model = cloneModel(this.original);
        this.render();
    }

    /*==============================================
                PUBLISHING
    ================================================*/

    _openPublishDialog() {
        const changes = this._changes();
        const problems = this._validate();

        if (problems.length) {
            this._toast('Fix the problems listed above before publishing.', 'error');
            return;
        }

        const added = changeSet.addedPages(this.original, this.model);
        const removed = changeSet.removedPages(this.original, this.model);

        $('#publish-list').replaceChildren(
            ...changes.map(change => el('li', { class: change.type, textContent: change.text }))
        );

        $('#publish-new-files').replaceChildren(
            ...added.map(page => el('li', { textContent: `${contentPath(page.folder)} (new, with a starter template)` }))
        );
        $('#publish-new-files-wrap').hidden = added.length === 0;

        $('#delete-content-wrap').hidden = removed.length === 0;
        $('#delete-content-label').textContent =
            `Also delete the markdown for ${removed.length} removed page(s). Leave this off to keep the files in the repo.`;
        $('#delete-content').checked = false;

        $('#commit-message').value = this._suggestCommitMessage(changes);
        $('#publish-error').textContent = '';
        $('#publish-dialog').showModal();
    }

    _suggestCommitMessage(changes) {
        if (changes.length === 1) return changes[0].text;

        const added = changes.filter(change => change.type === 'add').length;
        const removed = changes.filter(change => change.type === 'remove').length;

        if (added && !removed) return `Add ${added} page/section entr${added === 1 ? 'y' : 'ies'} to the sidebar`;
        if (removed && !added) return `Remove ${removed} page/section entr${removed === 1 ? 'y' : 'ies'} from the sidebar`;
        return DEFAULT_COMMIT_MESSAGE;
    }

    async _publish() {
        const message = $('#commit-message').value.trim() || DEFAULT_COMMIT_MESSAGE;
        const shouldBump = $('#bump-version').checked;
        const shouldDeleteContent = $('#delete-content').checked;

        this._setPublishBusy(true);

        try {
            const changes = this._changes();
            const files = [];

            let source = applyStructure(this.configSource, this.model);
            let version = getVersion(source);

            if (shouldBump) {
                version = bumpPatch(version);
                source = applyVersion(source, version);
            }
            files.push({ path: paths.config, content: source });

            // New pages need somewhere to point, or the site 404s on them.
            for (const page of changeSet.addedPages(this.original, this.model)) {
                const path = contentPath(page.folder);
                if (!await this.client.getFile(path)) {
                    files.push({ path, content: newPageContent(page.title) });
                }
            }

            if (shouldDeleteContent) {
                for (const page of changeSet.removedPages(this.original, this.model)) {
                    const existing = await this.client.listFiles(page.folder);
                    existing.forEach(path => files.push({ path, deleted: true }));
                }
            }

            if (shouldBump) {
                const changelog = await this.client.getFile(paths.changelog);
                if (changelog) {
                    files.push({
                        path: paths.changelog,
                        content: prependChangelogEntry(
                            changelog.text,
                            version,
                            new Date().toISOString().slice(0, 10),
                            changes.map(change => change.text)
                        )
                    });
                }
            }

            const commit = await this.client.commit(message, files);

            $('#publish-dialog').close();
            await this._loadConfig();
            this.render();
            this._published(commit, shouldBump ? version : null);
        } catch (error) {
            $('#publish-error').textContent = error.message;
        } finally {
            this._setPublishBusy(false);
        }
    }

    _setPublishBusy(busy) {
        $('#publish-dialog').querySelectorAll('button, input, textarea')
            .forEach(node => { node.disabled = busy; });
        $('#publish-submit').textContent = busy ? 'Publishing…' : 'Publish';
    }

    _published(commit, version) {
        const banner = $('#result-banner');
        const marker = version
            ? ` The sidebar will read v${version} once it's live.`
            : '';

        banner.replaceChildren(
            el('strong', { textContent: 'Published.' }),
            document.createTextNode(
                ` GitHub Pages usually rebuilds within a minute or two.${marker} `
            ),
            el('a', { href: commit.url, target: '_blank', rel: 'noopener', textContent: 'View the commit' })
        );
        banner.hidden = false;
    }

    /*==============================================
                FEEDBACK
    ================================================*/

    _toast(message, kind = 'ok') {
        const toast = $('#toast');
        toast.textContent = message;
        toast.className = `toast is-${kind} is-visible`;

        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 6000);
    }
}
