/*==============================================
            LOGO MANAGER MODULE
================================================*/
import { observeContentChanges } from '../core/domUtils.js';

export class LogoManager {
    init() {
        this.handlePageLogos();

        // Re-run when content changes
        observeContentChanges(() => this.handlePageLogos());
    }

    handlePageLogos() {
        const pageLogo = document.querySelector('.page-content .page-logo');
        const pageTitle = document.querySelector('.page-content h1');

        if (!pageLogo || !pageTitle) return;

        // If logo is already loaded
        if (pageLogo.complete && pageLogo.naturalWidth > 0) {
            pageLogo.classList.add('loaded');
            pageTitle.classList.add('logo-loaded');
        } else {
            // Wait for logo to load
            pageLogo.addEventListener('load', () => {
                pageLogo.classList.add('loaded');
                pageTitle.classList.add('logo-loaded');
            });

            // Handle error - show title if logo fails
            pageLogo.addEventListener('error', () => {
                pageTitle.classList.remove('logo-loaded');
            });
        }
    }
}