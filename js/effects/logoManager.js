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

        const isVideo = pageLogo.tagName === 'VIDEO';
        const isLoaded = isVideo
            ? pageLogo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
            : pageLogo.complete && pageLogo.naturalWidth > 0;

        // If logo is already loaded
        if (isLoaded) {
            pageLogo.classList.add('loaded');
            pageTitle.classList.add('logo-loaded');
        } else {
            // Wait for logo to load
            pageLogo.addEventListener(isVideo ? 'loadeddata' : 'load', () => {
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