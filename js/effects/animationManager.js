/*==============================================
            ANIMATION MANAGER MODULE
================================================*/
import { observeContentChanges } from '../core/domUtils.js';

export class AnimationManager {
    constructor() {
        this.observer = null;
        this.contentObserver = null;
        this.animatedElements = [
            '.project-card',
            '.page-content h1',
            '.page-content h2',
            '.page-content p',
            '.page-content img'
        ];
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px -10px 0px'
        });

        this.setupContentObserver();
        this.setupAnimations();
    }

    setupContentObserver() {
        this.contentObserver = observeContentChanges(() => this.setupAnimations());
    }

    setupAnimations() {
        this.animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);

            elements.forEach((el, index) => {
                if (!el.classList.contains('fade-in')) {
                    el.classList.add('fade-in');
                    const delayClass = `fade-in-delay-${index % 3 + 1}`;
                    el.classList.add(delayClass);
                    this.observer.observe(el);
                }
            });
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.contentObserver) {
            this.contentObserver.disconnect();
        }
    }
}