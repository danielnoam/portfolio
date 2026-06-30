/*==============================================
            UI MANAGER MODULE
================================================*/
export class UIManager {
    constructor(config) {
        this.config = config;
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            document.addEventListener('click', (event) => {
                if (!sidebar.contains(event.target) &&
                    !menuToggle.contains(event.target) &&
                    sidebar.classList.contains('active')) {
                    this.closeSidebar(sidebar);
                }
            });
        }
    }

    closeSidebar(sidebar) {
        sidebar.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    initScrollToTop() {
        let isVisible = false;

        window.onscroll = () => {
            const button = document.getElementById("back-to-top");
            if (button) {
                const shouldShow = document.body.scrollTop > 200 ||
                    document.documentElement.scrollTop > 200;

                if (shouldShow && !isVisible) {
                    button.classList.add('show');
                    isVisible = true;
                } else if (!shouldShow && isVisible) {
                    button.classList.remove('show');
                    isVisible = false;
                }
            }
        };

        const backToTopButton = document.getElementById("back-to-top");
        if (backToTopButton) {
            backToTopButton.onclick = () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            };
        }
    }

    renderVersion() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar || !this.config.version) return;

        // Keep idempotent in case this runs more than once
        let marker = document.getElementById('version-marker');
        if (!marker) {
            marker = document.createElement('div');
            marker.id = 'version-marker';
            marker.className = 'version-marker';
        }

        marker.textContent = `v${this.config.version}`;

        // Always keep it as the last element in the sidebar
        sidebar.appendChild(marker);
    }

    applyVisibilitySettings() {
        const { showUrls, showTopBar, showThemeToggle } = this.config.uiSettings;

        document.documentElement.classList.toggle('hide-urls', !showUrls);
        document.documentElement.classList.toggle('show-top-bar', showTopBar);
        document.documentElement.classList.toggle('show-theme-toggle', showThemeToggle);
        document.documentElement.classList.toggle('hide-theme-toggle', !showThemeToggle);
    }
}