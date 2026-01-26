/*==============================================
            THEME MANAGER MODULE
================================================*/

export class ThemeManager {
    constructor() {
        this.toggles = [];
    }

    init() {
        const sidebarToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.querySelector('.mobile-theme-toggle');
        this.toggles = [sidebarToggle, mobileToggle].filter(t => t);

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        document.documentElement.classList.toggle('light-mode', defaultTheme === 'light');
        this.updateToggles(defaultTheme === 'light');

        this.toggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.handleToggle());
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const isLight = !e.matches;
                document.documentElement.classList.toggle('light-mode', isLight);
                this.updateToggles(isLight);
            }
        });
    }

    handleToggle() {
        const isLightMode = document.documentElement.classList.toggle('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        this.updateToggles(isLightMode);
    }

    updateToggles(isLight) {
        this.toggles.forEach(toggle => {
            const themeIcon = toggle.querySelector('.theme-icon');
            const themeText = toggle.querySelector('.theme-text');

            if (themeIcon) {
                themeIcon.textContent = isLight ? '🌙' : '☀️';
            }
            if (themeText && !themeText.classList.contains('sr-only')) {
                themeText.textContent = `${isLight ? 'Dark' : 'Light'} Mode`;
            }
            toggle.setAttribute('aria-label', `${isLight ? 'Dark' : 'Light'} Mode`);
        });
    }
}