/*==============================================
            NAVIGATION MODULE
================================================*/
import { getContentId, pageRouteUrl } from '../core/domUtils.js';

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

    // Add this new method
    syncActiveLink(contentPath) {
        // Find the nav link that matches this content path
        const nav = document.getElementById('main-nav');
        const links = nav.querySelectorAll('a[data-content-path]');

        for (const link of links) {
            if (link.dataset.contentPath === contentPath) {
                this.setActiveLink(link);
                return;
            }
        }

        // If no match found, clear active state
        this.setActiveLink(null);
    }

    findNavigationLink(contentPath) {
        if (!contentPath) return null;

        const nav = document.getElementById('main-nav');
        const links = nav.getElementsByTagName('a');
        const folderName = getContentId(contentPath);

        if (!folderName) return null;

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

        const newUrl = pageRouteUrl(this.config.baseUrl, path);
        history.pushState({path: path}, '', newUrl);
    }

    buildNavigation(onClickHandler) {
        const nav = document.getElementById('main-nav');
        nav.innerHTML = '';

        // Build static links (top of the nav)
        this.config.navigation.staticLinks.forEach(linkConfig => {
            nav.appendChild(this._createStaticLink(linkConfig, onClickHandler));
        });

        // Build dynamic sections
        for (const [section, content] of Object.entries(this.config.structure)) {
            const visiblePages = content.pages.filter(page => page.visible !== false);

            if (visiblePages.length > 0) {
                const header = document.createElement('h2');
                header.textContent = section;

                // Check if this section should be a foldout
                if (content.foldout === true) {
                    header.classList.add('foldout-header');

                    // Add arrow icon
                    const arrow = document.createElement('span');
                    arrow.className = 'foldout-arrow';
                    arrow.textContent = '▶';
                    header.insertBefore(arrow, header.firstChild);

                    // Create collapsible container
                    const container = document.createElement('div');
                    container.className = 'foldout-content';

                    // Check localStorage for saved state
                    const storageKey = `foldout-${section}`;
                    const isOpen = localStorage.getItem(storageKey) === 'true';

                    if (isOpen) {
                        header.classList.add('open');
                        container.classList.add('open');
                    }

                    // Add click handler to toggle
                    header.onclick = () => {
                        const isCurrentlyOpen = header.classList.toggle('open');
                        container.classList.toggle('open');
                        localStorage.setItem(storageKey, isCurrentlyOpen);
                    };

                    // Add pages to container
                    visiblePages.forEach(page => {
                        const link = document.createElement('a');
                        link.textContent = page.title;
                        const fullPath = `${this.config.baseUrl}/${page.folder}/content.md`;
                        link.dataset.contentPath = fullPath;
                        link.onclick = () => onClickHandler(fullPath, link);
                        container.appendChild(link);
                    });

                    nav.appendChild(header);
                    nav.appendChild(container);
                } else {
                    // Regular header (not a foldout)
                    nav.appendChild(header);

                    visiblePages.forEach(page => {
                        const link = document.createElement('a');
                        link.textContent = page.title;
                        const fullPath = `${this.config.baseUrl}/${page.folder}/content.md`;
                        link.dataset.contentPath = fullPath;
                        link.onclick = () => onClickHandler(fullPath, link);
                        nav.appendChild(link);
                    });
                }
            }
        }

        // Static content links pinned to the end of the nav list, in their own
        // divider-separated group so they don't read as part of the last section.
        const bottomStatic = this.config.navigation.staticLinksBottom || [];
        if (bottomStatic.length > 0) {
            const group = document.createElement('div');
            group.className = 'nav-bottom-links';
            bottomStatic.forEach(linkConfig => {
                group.appendChild(this._createStaticLink(linkConfig, onClickHandler));
            });
            nav.appendChild(group);
        }
    }

    _createStaticLink(linkConfig, onClickHandler) {
        const link = document.createElement('a');
        link.textContent = linkConfig.title;

        if (linkConfig.type === 'content') {
            const fullPath = `${this.config.baseUrl}/${linkConfig.path}`;
            link.dataset.contentPath = fullPath;
            link.onclick = () => onClickHandler(fullPath, link);
        } else if (linkConfig.type === 'external') {
            this._setupExternalLink(link, linkConfig);
        }
        return link;
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
            this.closeMobileSidebar();
        };
    }
}