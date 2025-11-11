/*==============================================
            MAIN APPLICATION
================================================*/
import { NavigationManager } from './modules/navigation.js';
import { ContentManager } from './modules/contentManager.js';
import { ThemeManager } from './modules/themeManager.js';
import { UIManager } from './modules/uiManager.js';
import { AnimationManager } from './modules/animationManager.js';
import { Router } from './modules/router.js';
import { LightboxManager } from './modules/lightboxManager.js';
import { BackgroundManager } from './modules/backgroundManager.js';

/*==============================================
            APPLICATION CLASS
================================================*/
class PortfolioApp {
    constructor(config) {
        this.config = config;
        this.modules = {};
    }

    async init() {
        // Initialize modules
        this.modules.background = new BackgroundManager();
        this.modules.content = new ContentManager(this.config);
        this.modules.navigation = new NavigationManager(this.config);
        this.modules.theme = new ThemeManager();
        this.modules.ui = new UIManager(this.config);
        this.modules.animation = new AnimationManager();
        this.modules.lightbox = new LightboxManager();
        this.modules.router = new Router(
            this.config,
            this.modules.content,
            this.modules.navigation
        );

        // Build navigation
        const navClickHandler = (path, link) => {
            this.modules.navigation.handleNavigationClick(
                path,
                link,
                this.modules.content
            );
        };
        this.modules.navigation.buildNavigation(navClickHandler);
        this.modules.navigation.buildBottomNavigation();

        // Initialize UI
        this.modules.ui.initMobileMenu();
        this.modules.theme.init();
        this.modules.ui.initScrollToTop();
        this.modules.ui.applyVisibilitySettings();
        this.modules.router.init();
        this.modules.background.init();

        // Load initial route
        await this.modules.router.handleInitialRoute();

        // Initialize post-content features
        this.modules.animation.init();
        this.modules.lightbox.init();

        // Reinitialize lightbox when content changes
        const contentElement = document.getElementById('content');
        if (contentElement) {
            const observer = new MutationObserver(() => {
                clearTimeout(this.reinitTimeout);
                this.reinitTimeout = setTimeout(() => {
                    this.modules.lightbox.reinitialize();
                }, 100);
            });
            observer.observe(contentElement, { childList: true, subtree: true });
        }
    }

    setupGlobalHandlers() {
        window.handleNavigationClick = (path, link) => {
            this.modules.navigation.handleNavigationClick(
                path,
                link,
                this.modules.content
            );
        };
        window.baseUrl = this.config.baseUrl;
    }
}

/*==============================================
            ENTRY POINT
================================================*/
window.onload = async function() {
    const app = new PortfolioApp(CONFIG);
    window.portfolioApp = app;
    app.setupGlobalHandlers();
    await app.init();
};
