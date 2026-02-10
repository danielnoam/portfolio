/*==============================================
            CODE SHOWCASE MANAGER
================================================*/
export class CodeShowcaseManager {
    constructor() {
        this.codeCache = new Map();
        this.showcases = [];
    }

    init() {
        this.setupCodeShowcases();

        const contentElement = document.getElementById('content');
        if (contentElement) {
            const observer = new MutationObserver(() => {
                setTimeout(() => this.setupCodeShowcases(), 100);
            });
            observer.observe(contentElement, { childList: true, subtree: true });
        }
    }

    setupCodeShowcases() {
        const showcaseElements = document.querySelectorAll('.code-showcase:not(.initialized)');

        showcaseElements.forEach(showcase => {
            showcase.classList.add('initialized');
            this.initializeShowcase(showcase);
        });
    }

    initializeShowcase(showcase) {
        const blocks = showcase.querySelectorAll('.code-block');
        if (blocks.length === 0) return;

        // Create header container
        const headersContainer = document.createElement('div');
        headersContainer.className = 'code-showcase-headers';

        // Create shared content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'code-showcase-content';

        const contentInner = document.createElement('div');
        contentInner.className = 'code-showcase-content-inner';
        contentContainer.appendChild(contentInner);

        // Process each code block
        blocks.forEach((block, index) => {
            const filepath = block.dataset.file;
            const language = block.dataset.language || 'csharp';
            const title = block.dataset.title || `Code ${index + 1}`;
            const description = block.dataset.description || '';

            // Create header button
            const header = document.createElement('button');
            header.className = 'code-block-header';
            header.innerHTML = `
                <span class="code-block-title">${title}</span>
                <span class="code-block-toggle">▶</span>
            `;

            header.addEventListener('click', () => {
                this.toggleCode(showcase, header, filepath, language, title, description, contentInner);
            });

            headersContainer.appendChild(header);
        });

        // Replace original blocks with new structure
        showcase.innerHTML = '';
        showcase.appendChild(headersContainer);
        showcase.appendChild(contentContainer);
    }

    async toggleCode(showcase, header, filepath, language, title, description, contentInner) {
        const contentContainer = showcase.querySelector('.code-showcase-content');
        const allHeaders = showcase.querySelectorAll('.code-block-header');

        const isActive = header.classList.contains('active');

        // Deactivate all headers
        allHeaders.forEach(h => h.classList.remove('active'));

        if (isActive) {
            // Collapse if clicking active header
            contentContainer.classList.remove('active');
            contentInner.innerHTML = '';
            return;
        }

        // Activate clicked header
        header.classList.add('active');
        contentContainer.classList.add('active');

        // Load code
        await this.loadCode(contentInner, filepath, language, description);
    }

    async loadCode(contentInner, filepath, language, description) {
        // Show loading state
        contentInner.innerHTML = `
            ${description ? `<div class="code-block-description">${description}</div>` : ''}
            <div class="code-block-code loading">Loading code...</div>
        `;

        const codeContainer = contentInner.querySelector('.code-block-code');

        try {
            let code;

            // Check cache first
            if (this.codeCache.has(filepath)) {
                code = this.codeCache.get(filepath);
            } else {
                // Fetch from server
                const response = await fetch(filepath);
                if (!response.ok) throw new Error('Failed to load code');
                code = await response.text();
                this.codeCache.set(filepath, code);
            }

            // Create pre/code structure for Prism
            const pre = document.createElement('pre');
            pre.className = 'line-numbers';

            const codeElement = document.createElement('code');
            codeElement.className = `language-${language}`;
            codeElement.textContent = code;

            pre.appendChild(codeElement);
            codeContainer.innerHTML = '';
            codeContainer.appendChild(pre);

            // Highlight with Prism
            if (window.Prism) {
                Prism.highlightElement(codeElement);
            }

        } catch (error) {
            console.error('Error loading code:', error);
            codeContainer.innerHTML = '<div class="loading">Failed to load code</div>';
        }
    }
}