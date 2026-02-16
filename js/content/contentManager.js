/*==============================================
            CONTENT MANAGER MODULE
================================================*/

export class ContentManager {
    constructor(config) {
        this.config = config;
        this.contentElement = document.getElementById('content');
        this.projects = [];
    }

    parseFrontmatter(content) {
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            return { metadata: null, content: content };
        }

        const frontmatterText = match[1];
        const markdownContent = match[2];

        const metadata = {};
        const lines = frontmatterText.split(/\r?\n/);

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => v.trim());
            }

            metadata[key] = value;
        }

        return { metadata, content: markdownContent };
    }

    async loadProjects() {
        this.projects = [];
        const paths = this.extractAllPagePaths();

        const projectPromises = paths.map(async (pathData) => {
            try {
                const response = await fetch(pathData.fullPath);
                if (!response.ok) return null;

                const content = await response.text();
                const { metadata } = this.parseFrontmatter(content);

                if (!metadata || !metadata.tags) return null;

                return {
                    id: pathData.id,
                    title: pathData.title,
                    folder: pathData.folder,
                    thumbnail: metadata.thumbnail || '',
                    shortDescription: metadata.shortDescription || '',
                    tags: metadata.tags || []
                };
            } catch (error) {
                console.error(`Error loading project ${pathData.id}:`, error);
                return null;
            }
        });

        const results = await Promise.all(projectPromises);
        this.projects = results.filter(p => p !== null);
    }

    extractAllPagePaths() {
        const paths = [];

        for (const [section, content] of Object.entries(this.config.structure)) {
            content.pages.forEach(page => {
                const fullPath = `${this.config.baseUrl}/${page.folder}/content.md`;
                const id = page.folder.split('/').pop();

                paths.push({
                    id: id,
                    title: page.title,
                    folder: page.folder,
                    fullPath: fullPath
                });
            });
        }

        return paths;
    }

    filterProjectsByTags(includeTags = [], excludeTags = []) {
        if (!this.projects) return [];

        return this.projects.filter(project => {
            const projectTags = project.tags || [];

            const hasIncludedTag = includeTags.length === 0 ||
                includeTags.some(tag => projectTags.includes(tag));

            const hasExcludedTag = excludeTags.length > 0 &&
                excludeTags.some(tag => projectTags.includes(tag));

            return hasIncludedTag && !hasExcludedTag;
        });
    }

    async loadContent(path) {
        try {
            this.contentElement.classList.add('page-transitioning');
            await new Promise(resolve => setTimeout(resolve, 200));

            const response = await fetch(path);
            if (!response.ok) throw new Error('Content not found');
            const content = await response.text();

            const { content: markdownContent } = this.parseFrontmatter(content);

            this.contentElement.classList.add('loading');
            this.contentElement.innerHTML = marked.parse(markdownContent);
            this.contentElement.classList.remove('loading');

            if (window.portfolioApp && window.portfolioApp.modules.autoCarousel) {
                window.portfolioApp.modules.autoCarousel.initialize();
            }

            setTimeout(() => {
                this.contentElement.classList.remove('page-transitioning');
            }, 50);

            window.scrollTo(0, 0);
            this.updateDocumentTitle(path);

            if (window.portfolioApp && window.portfolioApp.modules.navigation) {
                window.portfolioApp.modules.navigation.syncActiveLink(path);
            }

            setTimeout(() => {
                if (window.portfolioApp && window.portfolioApp.modules.background) {
                    window.portfolioApp.modules.background.setBackground(path);
                }
            }, 50);

            return path;
        } catch (error) {
            console.error('Error loading content:', error);
            this.contentElement.innerHTML = `
                <div class="error-message">
                    <h1>Content Not Found</h1>
                    <p>Sorry, the requested content could not be loaded.</p>
                </div>
            `;
            this.contentElement.classList.remove('page-transitioning');
            throw error;
        }
    }

    updateDocumentTitle(path) {
        let title = this.config.siteTitle;
        const pathSegments = path.split('/');
        const pageName = pathSegments[pathSegments.length - 2].replace(/-/g, ' ');

        if (pageName) {
            title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | ${title}`;
        }
        document.title = title;
    }
}