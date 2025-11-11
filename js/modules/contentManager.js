/*==============================================
            CONTENT MANAGER MODULE
================================================*/


export class ContentManager {
    constructor(config) {
        this.config = config;
        this.contentElement = document.getElementById('content');
    }

    async loadContent(path) {
        try {
            this.contentElement.classList.add('page-transitioning');
            await new Promise(resolve => setTimeout(resolve, 200));

            const response = await fetch(path);
            if (!response.ok) throw new Error('Content not found');
            const content = await response.text();

            this.contentElement.classList.add('loading');
            this.contentElement.innerHTML = marked.parse(content);
            this.contentElement.classList.remove('loading');

            setTimeout(() => {
                this.contentElement.classList.remove('page-transitioning');
            }, 50);

            window.scrollTo(0, 0);
            this.updateDocumentTitle(path);
            
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