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

        this._initAdminShortcut(marker);
    }

    /**
     * Five quick taps on the version marker open the admin panel.
     *
     * Deliberately undiscoverable: the marker keeps its plain-text cursor and
     * styling, so a visitor has no reason to tap it at all. It exists so the
     * panel can be reached from a phone without typing the URL — the panel
     * itself is still password-locked, so this is convenience, not access.
     */
    _initAdminShortcut(marker) {
        if (marker.dataset.adminShortcut) return;
        marker.dataset.adminShortcut = 'true';

        const TAPS_REQUIRED = 5;
        const RESET_DELAY_MS = 1500;

        let taps = 0;
        let resetTimer = null;

        const reset = () => {
            taps = 0;
            marker.classList.remove('is-counting');
            marker.textContent = `v${this.config.version}`;
        };

        marker.addEventListener('click', () => {
            taps++;
            clearTimeout(resetTimer);

            if (taps >= TAPS_REQUIRED) {
                reset();
                window.location.href = `${this.config.baseUrl}/admin.html`;
                return;
            }

            // Stay silent through the first few taps — an accidental double
            // tap should look like nothing happened. Only once the sequence
            // is clearly deliberate does the marker start counting down, so
            // you can tell on a phone that it's registering.
            const remaining = TAPS_REQUIRED - taps;
            if (remaining <= 2) {
                marker.classList.add('is-counting');
                marker.textContent = `v${this.config.version} · ${remaining}`;
            }

            resetTimer = setTimeout(reset, RESET_DELAY_MS);
        });
    }

    applyVisibilitySettings() {
        const { showUrls, showTopBar, showThemeToggle } = this.config.uiSettings;

        document.documentElement.classList.toggle('hide-urls', !showUrls);
        document.documentElement.classList.toggle('show-top-bar', showTopBar);
        document.documentElement.classList.toggle('show-theme-toggle', showThemeToggle);
        document.documentElement.classList.toggle('hide-theme-toggle', !showThemeToggle);
    }
}