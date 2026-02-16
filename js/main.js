/*==============================================
            MAIN APPLICATION
================================================*/
import { NavigationManager } from './ui/navigation.js';
import { ContentManager } from './content/contentManager.js';
import { ThemeManager } from './ui/themeManager.js';
import { UIManager } from './ui/uiManager.js';
import { AnimationManager } from './effects/animationManager.js';
import { Router } from './core/router.js';
import { AutoCarousel } from './ui/autoCarousel.js';
import { LightboxManager } from './ui/lightboxManager.js';
import { BackgroundManager } from './effects/backgroundManager.js';
import { LogoManager } from './effects/logoManager.js';
import { TypewriterManager } from './effects/typewriterManager.js';
import { CodeShowcaseManager } from './effects/codeShowcaseManager.js';

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
        await this.modules.content.loadProjects();
        this.modules.navigation = new NavigationManager(this.config);
        this.modules.theme = new ThemeManager();
        this.modules.ui = new UIManager(this.config);
        this.modules.animation = new AnimationManager();
        this.modules.autoCarousel = new AutoCarousel(this.config, this.modules.content);
        this.modules.lightbox = new LightboxManager();
        this.modules.logo = new LogoManager();
        this.modules.typewriter = new TypewriterManager();
        this.modules.codeShowcase = new CodeShowcaseManager();
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
        this.modules.logo.init();
        this.modules.typewriter.init();
        this.modules.codeShowcase.init();

        // Handle gallery navigation links with data-navigate attribute
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-navigate]');
            if (link) {
                e.preventDefault();
                const path = this.config.baseUrl + link.dataset.navigate;
                window.handleGalleryNavigationClick(path);
            }
        });


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

        // Simple gallery navigation - just load content, navigation will sync automatically
        window.handleGalleryNavigationClick = (path) => {
            this.modules.content.loadContent(path);
            this.modules.navigation.closeMobileSidebar();

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
