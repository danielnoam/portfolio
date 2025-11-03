/*==============================================
            NAVIGATION MODULE
================================================*/


export class NavigationManager {
    constructor(config) {
        this.config = config;
        this.activeLink = null;
    }

    setActiveLink(link) {
        if (this.activeLink) {
            this.activeLink.classList.remove('active');
        }
        if (link) {
            link.classList.add('active');
            this.activeLink = link;
        }
    }

    findNavigationLink(contentPath) {
        if (!contentPath) return null;

        const nav = document.getElementById('main-nav');
        const links = nav.getElementsByTagName('a');
        const folderMatch = contentPath.match(/\/([^\/]+)\/content\.md$/);

        if (!folderMatch) return null;

        const folderName = folderMatch[1];

        for (const link of links) {
            if (link.onclick && link.onclick.toString().includes(folderName)) {
                return link;
            }
        }
        return null;
    }

    closeMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    handleNavigationClick(path, link, contentManager) {
        contentManager.loadContent(path);
        this.setActiveLink(link);
        this.closeMobileSidebar();

        const pathSegments = path.split('/');
        const section = pathSegments[pathSegments.length - 3];
        const pageName = pathSegments[pathSegments.length - 2];

        let newUrl;
        if (section === "about") {
            newUrl = `${this.config.baseUrl}/about`;
        } else {
            newUrl = `${this.config.baseUrl}/${pageName}`;
        }

        history.pushState({path: path}, '', newUrl);
    }

    buildNavigation(onClickHandler) {
        const nav = document.getElementById('main-nav');
        nav.innerHTML = '';

        // Build static links
        this.config.navigation.staticLinks.forEach(linkConfig => {
            const link = document.createElement('a');
            link.textContent = linkConfig.title;

            if (linkConfig.type === 'content') {
                link.onclick = () => onClickHandler(`${this.config.baseUrl}/${linkConfig.path}`, link);
            } else if (linkConfig.type === 'external') {
                this._setupExternalLink(link, linkConfig);
            }
            nav.appendChild(link);
        });

        // Build dynamic sections
        for (const [section, content] of Object.entries(this.config.structure)) {
            const visiblePages = content.pages.filter(page => page.visible !== false);

            if (visiblePages.length > 0) {
                const header = document.createElement('h2');
                header.textContent = section;
                nav.appendChild(header);

                visiblePages.forEach(page => {
                    const link = document.createElement('a');
                    link.textContent = page.title;
                    link.onclick = () => onClickHandler(
                        `${this.config.baseUrl}/${content.path}/${page.folder}/content.md`,
                        link
                    );
                    nav.appendChild(link);
                });
            }
        }
    }

    buildBottomNavigation() {
        const existingBottomNav = document.querySelector('.bottom-nav');
        if (existingBottomNav) {
            existingBottomNav.remove();
        }

        if (this.config.navigation.bottomLinks && this.config.navigation.bottomLinks.length > 0) {
            const sidebar = document.querySelector('.sidebar');
            const bottomNav = document.createElement('nav');
            bottomNav.className = 'bottom-nav';

            this.config.navigation.bottomLinks.forEach(linkConfig => {
                const link = document.createElement('a');
                link.textContent = linkConfig.title;

                if (linkConfig.type === 'external') {
                    this._setupExternalLink(link, linkConfig);
                }
                bottomNav.appendChild(link);
            });

            // Move theme toggle after bottom nav
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.remove();
            }

            sidebar.appendChild(bottomNav);

            // Re-add theme toggle after bottom nav
            if (themeToggle) {
                sidebar.appendChild(themeToggle);
            }
        }
    }

    _setupExternalLink(link, linkConfig) {
        if (linkConfig.url.startsWith('http') || linkConfig.url.startsWith('mailto:')) {
            link.href = linkConfig.url;
        } else {
            link.href = `${this.config.baseUrl}/${linkConfig.url}`;
        }
        if (linkConfig.target) {
            link.target = linkConfig.target;
        }
        link.onclick = () => {
            console.log(`${linkConfig.title} viewed`);
            this.closeMobileSidebar();
        };
    }
}