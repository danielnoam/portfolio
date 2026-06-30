/*==============================================
            ROUTER MODULE
================================================*/
export class Router {
    constructor(config, contentManager, navigationManager) {
        this.config = config;
        this.contentManager = contentManager;
        this.navigationManager = navigationManager;
    }

    init() {
        window.onpopstate = (event) => {
            if (event.state && event.state.path) {
                this.contentManager.loadContent(event.state.path);
                const link = this.navigationManager.findNavigationLink(event.state.path);
                if (link) this.navigationManager.setActiveLink(link);
            } else {
                this.loadDefault();
            }
        };
    }

    async handleInitialRoute() {
        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
            localStorage.removeItem('redirectPath');
            return await this.handleRedirect(redirectPath);
        }

        if (history.state && history.state.path) {
            return await this.loadFromHistory();
        }

        const currentPath = window.location.pathname;
        return await this.loadFromPath(currentPath);
    }

    async handleRedirect(redirectPath) {
        if (redirectPath === `${this.config.baseUrl}/about`) {
            await this.loadDefault();
            history.replaceState(
                {path: this.config.defaultPath},
                '',
                redirectPath
            );
            return true;
        }

        const pageMatch = redirectPath.match(new RegExp(`^${this.config.baseUrl}/([^/]+)$`));
        if (pageMatch) {
            const pageName = pageMatch[1];
            const foundPath = this.findContentPath(pageName);

            if (foundPath) {
                await this.contentManager.loadContent(foundPath.path);
                history.replaceState({path: foundPath.path}, '', redirectPath);
                if (foundPath.link) {
                    this.navigationManager.setActiveLink(foundPath.link);
                }
                return true;
            }
        }
        return false;
    }

    async loadFromHistory() {
        await this.contentManager.loadContent(history.state.path);
        const link = this.navigationManager.findNavigationLink(history.state.path);
        if (link) this.navigationManager.setActiveLink(link);
        return true;
    }

    async loadFromPath(currentPath) {
        const aboutMatch = currentPath === `${this.config.baseUrl}/about`;
        const pageMatch = currentPath.match(new RegExp(`^${this.config.baseUrl}/([^/]+)$`));

        if (aboutMatch) {
            await this.loadDefault();
            history.replaceState({path: this.config.defaultPath}, '', currentPath);
            return true;
        }

        if (pageMatch) {
            const pageName = pageMatch[1];
            const foundPath = this.findContentPath(pageName);

            if (foundPath) {
                await this.contentManager.loadContent(foundPath.path);
                history.replaceState({path: foundPath.path}, '', currentPath);
                if (foundPath.link) {
                    this.navigationManager.setActiveLink(foundPath.link);
                }
                return true;
            }

            window.location.href = `${this.config.baseUrl}/`;
            return false;
        }

        if (currentPath === `${this.config.baseUrl}/` ||
            currentPath === `${this.config.baseUrl}/index.html`) {
            await this.loadDefault();
            const newUrl = `${this.config.baseUrl}/about`;
            history.replaceState({path: this.config.defaultPath}, '', newUrl);
            return true;
        }

        window.location.href = `${this.config.baseUrl}/`;
        return false;
    }

    async loadDefault() {
        await this.contentManager.loadContent(this.config.defaultPath);
        const aboutLink = document.querySelector('nav a');
        if (aboutLink) this.navigationManager.setActiveLink(aboutLink);
    }

    findContentPath(pageName) {
        for (const [section, content] of Object.entries(this.config.structure)) {
            const matchingPage = content.pages.find(page => {
                const folderName = page.folder.split('/').pop();
                return folderName === pageName;
            });

            if (matchingPage) {
                const path = `${this.config.baseUrl}/${matchingPage.folder}/content.md`;
                const links = document.querySelectorAll('nav a');
                let link = null;

                for (const l of links) {
                    if (l.textContent === matchingPage.title) {
                        link = l;
                        break;
                    }
                }

                return { path, link };
            }
        }
        return null;
    }
}