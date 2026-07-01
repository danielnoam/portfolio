/*==============================================
            DOM / PATH UTILITIES

    Small shared helpers used across the feature
    modules, so the same boilerplate isn't copied
    into each manager.
================================================*/

// The element the router re-renders page content into.
const CONTENT_SELECTOR = '#content';

/**
 * Run `callback` (debounced by `delay` ms) whenever the #content subtree
 * changes. Feature modules use this to re-initialise after the router swaps
 * in a new page. Returns the MutationObserver, or null if #content is absent.
 */
export function observeContentChanges(callback, delay = 100) {
    const contentElement = document.querySelector(CONTENT_SELECTOR);
    if (!contentElement) return null;

    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    });
    observer.observe(contentElement, { childList: true, subtree: true });
    return observer;
}

/**
 * The page slug — the folder that directly contains content.md.
 * e.g. `content/games/electro-grid/content.md` -> `electro-grid`.
 */
export function getPageName(path) {
    const segments = path.split('/');
    return segments[segments.length - 2];
}

/**
 * The section slug — the folder one level above the page.
 * e.g. `content/games/electro-grid/content.md` -> `games`.
 */
export function getSectionName(path) {
    const segments = path.split('/');
    return segments[segments.length - 3];
}

/**
 * The content id from a `.../<id>/content.md` path, or null if it doesn't
 * match. Used to map a content path back to a page/background key.
 */
export function getContentId(path) {
    const match = path.match(/\/([^/]+)\/content\.md$/);
    return match ? match[1] : null;
}

/**
 * The public route URL for a content path: `<base>/about` for the about
 * page, otherwise `<base>/<page-slug>`.
 */
export function pageRouteUrl(baseUrl, path) {
    return getSectionName(path) === 'about'
        ? `${baseUrl}/about`
        : `${baseUrl}/${getPageName(path)}`;
}
