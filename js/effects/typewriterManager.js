/*==============================================
            TYPEWRITER MANAGER MODULE
================================================*/
import { observeContentChanges } from '../core/domUtils.js';

export class TypewriterManager {
    constructor() {
        this.typewriters = [];
    }

    init() {
        this.setupTypewriters();

        // Re-run when content changes
        observeContentChanges(() => this.setupTypewriters());
    }

    setupTypewriters() {
        const typewriterElements = document.querySelectorAll('.typewriter:not(.initialized)');

        typewriterElements.forEach((element) => {
            const text = element.getAttribute('data-text');
            if (!text) return;

            // Mark as initialized to prevent re-running
            element.classList.add('initialized');

            // Set the text content
            element.textContent = text;

            // Set CSS variable for character count
            element.style.setProperty('--char-count', text.length);

            // Optional: custom speed per element
            const customSpeed = element.getAttribute('data-speed');
            if (customSpeed) {
                element.style.setProperty('--typewriter-speed', `${customSpeed}s`);
            }

            // Optional: custom delay per element
            const customDelay = element.getAttribute('data-delay');
            if (customDelay) {
                element.style.setProperty('--typewriter-delay', `${customDelay}s`);
            }

            // Optional: hide cursor
            const noCursor = element.getAttribute('data-cursor') === 'false';
            if (noCursor) {
                element.classList.add('no-cursor');
            }

            // Start typing animation
            requestAnimationFrame(() => {
                element.classList.add('typing');

                // Calculate total animation time
                const speed = parseFloat(customSpeed || getComputedStyle(document.documentElement)
                    .getPropertyValue('--typewriter-speed'));
                const delay = parseFloat(customDelay || getComputedStyle(document.documentElement)
                    .getPropertyValue('--typewriter-delay'));
                const totalTime = (speed * text.length + delay) * 1000;

                // After animation completes, switch to just cursor blinking
                setTimeout(() => {
                    element.classList.remove('typing');
                    element.classList.add('typing-complete');
                }, totalTime);
            });
        });
    }
}