/*==============================================
            INITIALIZATION
================================================*/
// These variables now reference the CONFIG object from config.js
const baseUrl = CONFIG.baseUrl;
const defaultPath = CONFIG.defaultPath;
const siteTitle = CONFIG.siteTitle;
const defaultShowUrls = CONFIG.uiSettings.showUrls;
const defaultShowTopBar = CONFIG.uiSettings.showTopBar;
const defaultShowThemeToggle = CONFIG.uiSettings.showThemeToggle;

const structure = CONFIG.structure;

/*==============================================
            NAVIGATION MANAGEMENT
================================================*/
let activeLink = null;

function setActiveLink(link) {
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    if (link) {
        link.classList.add('active');
        activeLink = link;
    }
}

function findNavigationLink(contentPath) {
    if (!contentPath) return null;

    const nav = document.getElementById('main-nav');
    const links = nav.getElementsByTagName('a');
    const folderMatch = contentPath.match(/\/([^\/]+)\/content\.md$/);

    if (!folderMatch) return null;

    const folderName = folderMatch[1];

    for (const link of links) {
        if (link.onclick && link.onclick.toString().includes(folderName)) {
            return link;
        }
    }
    return null;
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

function handleNavigationClick(path, link) {
    loadContent(path);
    setActiveLink(link);
    closeMobileSidebar();

    // Extract section and page name for URL
    const pathSegments = path.split('/');
    const section = pathSegments[pathSegments.length - 3]; // e.g., "games"
    const pageName = pathSegments[pathSegments.length - 2]; // e.g., "school-these-shits"

    // Create a clean URL that shows which page we're on
    let newUrl;
    if (section === "about") {
        newUrl = `/portfolio/about`;
    } else {
        // Use just the page name without the section
        newUrl = `/portfolio/${pageName}`;
    }

    // Update URL without triggering a page reload
    history.pushState({path: path}, '', newUrl);
}

function updateSidebarForContent(contentPath) {
    const link = findNavigationLink(contentPath);
    if (link) {
        setActiveLink(link);
    }
    closeMobileSidebar();
}

function buildNavigation() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = '';

    // Build static navigation links from config
    CONFIG.navigation.staticLinks.forEach(linkConfig => {
        const link = document.createElement('a');
        link.textContent = linkConfig.title;

        if (linkConfig.type === 'content') {
            // Content links (like About)
            link.onclick = () => handleNavigationClick(`${baseUrl}/${linkConfig.path}`, link);
        } else if (linkConfig.type === 'external') {
            // External links (like Resume, Itch.io, LinkedIn)
            if (linkConfig.url.startsWith('http')) {
                link.href = linkConfig.url;
            } else {
                link.href = `${baseUrl}/${linkConfig.url}`;
            }
            if (linkConfig.target) {
                link.target = linkConfig.target;
            }
            link.onclick = () => {
                console.log(`${linkConfig.title} viewed`);
                closeMobileSidebar();
            };
        }
        nav.appendChild(link);
    });

    // Build dynamic content sections from structure
    for (const [section, content] of Object.entries(structure)) {
        // Only create a section if it has visible pages
        const visiblePages = content.pages.filter(page => page.visible !== false);

        if (visiblePages.length > 0) {
            const header = document.createElement('h2');
            header.textContent = section;
            nav.appendChild(header);

            // Only create links for visible pages
            visiblePages.forEach(page => {
                const link = document.createElement('a');
                link.textContent = page.title;
                link.onclick = () => handleNavigationClick(
                    `${baseUrl}/${content.path}/${page.folder}/content.md`,
                    link
                );
                nav.appendChild(link);
            });
        }
    }
}

function buildBottomNavigation() {
    // Remove existing bottom nav if it exists
    const existingBottomNav = document.querySelector('.bottom-nav');
    if (existingBottomNav) {
        existingBottomNav.remove();
    }

    // Only create bottom nav if there are bottom links configured
    if (CONFIG.navigation.bottomLinks && CONFIG.navigation.bottomLinks.length > 0) {
        const sidebar = document.querySelector('.sidebar');
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'bottom-nav';

        CONFIG.navigation.bottomLinks.forEach(linkConfig => {
            const link = document.createElement('a');
            link.textContent = linkConfig.title;

            if (linkConfig.type === 'content') {
                // Content links
                link.onclick = () => handleNavigationClick(`${baseUrl}/${linkConfig.path}`, link);
            } else if (linkConfig.type === 'external') {
                // External links
                if (linkConfig.url.startsWith('http') || linkConfig.url.startsWith('mailto:')) {
                    link.href = linkConfig.url;
                } else {
                    link.href = `${baseUrl}/${linkConfig.url}`;
                }
                if (linkConfig.target) {
                    link.target = linkConfig.target;
                }
                link.onclick = () => {
                    console.log(`${linkConfig.title} viewed`);
                    closeMobileSidebar();
                };
            }
            bottomNav.appendChild(link);
        });

        sidebar.appendChild(bottomNav);
    }
}
/*==============================================
            CONTENT MANAGEMENT
================================================*/
async function loadContent(path) {
    try {
        const contentElement = document.getElementById('content');

        // Start transition out
        contentElement.classList.add('page-transitioning');

        // Wait for transition to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        const response = await fetch(path);
        if (!response.ok) throw new Error('Content not found');
        const content = await response.text();

        contentElement.classList.add('loading');
        contentElement.innerHTML = marked.parse(content);
        contentElement.classList.remove('loading');

        // Transition back in
        setTimeout(() => {
            contentElement.classList.remove('page-transitioning');
        }, 50);

        window.scrollTo(0, 0);

        // Push a new state only if it's different from the current
        if (!history.state || history.state.path !== path) {
            // Extract the page name from the path for use in the URL
            const pathSegments = path.split('/');
            const section = pathSegments[pathSegments.length - 3]; // e.g., "games"
            const pageName = pathSegments[pathSegments.length - 2]; // e.g., "school-these-shits"

            // Create a clean URL that shows which page we're on
            let newUrl;
            if (section === "about") {
                newUrl = `/portfolio/about`;
            } else {
                // Use just the page name without the section
                newUrl = `/portfolio/${pageName}`;
            }

            // Update browser history with a new state and URL
            history.pushState({path: path}, '', newUrl);
        }

        updateDocumentTitle(path);
        updateSidebarForContent(path);
    } catch (error) {
        console.error('Error loading content:', error);
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `
            <div class="error-message">
                <h1>Content Not Found</h1>
                <p>Sorry, the requested content could not be loaded.</p>
            </div>
        `;
        contentElement.classList.remove('page-transitioning');
    }
}
function updateDocumentTitle(path) {
    let title = siteTitle;
    const pathSegments = path.split('/');
    const pageName = pathSegments[pathSegments.length - 2].replace(/-/g, ' ');

    if (pageName) {
        title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | ${title}`;
    }
    document.title = title;
}

/*==============================================
            THEME MANAGEMENT
================================================*/
function handleThemeToggle() {
    const isLightMode = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeToggles(isLightMode);
}

function updateThemeToggles(isLight) {
    const sidebarToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');
    const toggles = [sidebarToggle, mobileToggle];

    toggles.forEach(toggle => {
        if (toggle) {
            const themeIcon = toggle.querySelector('.theme-icon');
            const themeText = toggle.querySelector('.theme-text');

            if (themeIcon) {
                themeIcon.textContent = isLight ? '🌙' : '☀️';
            }
            if (themeText && !themeText.classList.contains('sr-only')) {
                themeText.textContent = `${isLight ? 'Dark' : 'Light'} Mode`;
            }
            toggle.setAttribute('aria-label', `${isLight ? 'Dark' : 'Light'} Mode`);
        }
    });
}

function initThemeToggle() {
    const sidebarToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.querySelector('.mobile-theme-toggle');
    const toggles = [sidebarToggle, mobileToggle];

    // Get the saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Set the initial theme
    document.documentElement.classList.toggle('light-mode', defaultTheme === 'light');
    updateThemeToggles(defaultTheme === 'light');

    // Add click handlers to both toggles
    toggles.forEach(toggle => {
        if (toggle) {
            toggle.removeEventListener('click', handleThemeToggle); // Remove any existing listeners
            toggle.addEventListener('click', handleThemeToggle);
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const isLight = !e.matches;
            document.documentElement.classList.toggle('light-mode', isLight);
            updateThemeToggles(isLight);
        }
    });
}

/*==============================================
            MOBILE MENU HANDLING
================================================*/
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) &&
                !menuToggle.contains(event.target) &&
                sidebar.classList.contains('active')) {
                closeMobileSidebar();
            }
        });
    }
}

/*==============================================
            SCROLL ANIMATIONS
================================================*/
function initScrollAnimations() {
    // Elements to observe for scroll animation
    const animatedElements = [
        '.project-card',
        '.image-gallery figure',
        '.page-content h1',
        '.page-content h2',
        '.page-content p',
        '.page-content img'
    ];

    // Create a single reusable IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add the 'visible' class when an element enters the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation has played, we can stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // slightly before element enters viewport
    });

    // Apply animations to elements after content loads
    function setupAnimations() {
        // Query all elements we want to animate
        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);

            // Add a fade-in class and observe each element
            elements.forEach((el, index) => {
                // Skip elements that already have animations
                if (!el.classList.contains('fade-in')) {
                    el.classList.add('fade-in');

                    // Add staggered delay for elements of the same type
                    const delayClass = `fade-in-delay-${index % 3 + 1}`;
                    el.classList.add(delayClass);

                    // Start observing the element
                    observer.observe(el);
                }
            });
        });
    }

    // Apply animations when new content is loaded
    const contentElement = document.getElementById('content');
    if (contentElement) {
        // Use MutationObserver to detect when new content is loaded
        const contentObserver = new MutationObserver(() => {
            // Short delay to ensure DOM is fully updated
            setTimeout(setupAnimations, 100);
        });

        contentObserver.observe(contentElement, { childList: true, subtree: true });

        // Also run once on an initial page load
        setupAnimations();
    }
}

/*==============================================
            SCROLL TO TOP FUNCTIONALITY
================================================*/
function initScrollToTop() {
    let isVisible = false;

    window.onscroll = function() {
        const button = document.getElementById("back-to-top");
        if (button) {
            const shouldShow = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;

            if (shouldShow && !isVisible) {
                // Show button with animation
                button.classList.add('show');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                // Hide button with animation
                button.classList.remove('show');
                isVisible = false;
            }
        }
    };

    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        backToTopButton.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }
}

/*==============================================
            BROWSER HISTORY HANDLING
================================================*/
function initHistoryHandling() {
    window.onpopstate = (event) => {
        if (event.state && event.state.path) {
            loadContent(event.state.path);
            const link = findNavigationLink(event.state.path);
            if (link) setActiveLink(link);
        } else {
            // If no state, go to the About page
            loadContent(defaultPath);
            const aboutLink = document.querySelector('nav a');
            if (aboutLink) setActiveLink(aboutLink);
        }
    };
}

/*==============================================
            INITIALIZATION
================================================*/
async function init() {
    // Set up the navigation structure
    buildNavigation();
    buildBottomNavigation();

    // Initialize UI components
    initMobileMenu();
    initThemeToggle();
    initScrollToTop();
    initHistoryHandling();

    // Apply visibility settings
    if (defaultShowUrls) {
        document.documentElement.classList.remove('hide-urls');
    } else {
        document.documentElement.classList.add('hide-urls');
    }

    if (defaultShowTopBar) {
        document.documentElement.classList.add('show-top-bar');
    }

    if (defaultShowThemeToggle) {
        document.documentElement.classList.add('show-theme-toggle');
    } else {
        document.documentElement.classList.add('hide-theme-toggle');
    }

    // Check if we have a redirect path stored
    const redirectPath = localStorage.getItem('redirectPath');
    if (redirectPath) {
        // Clear the stored path to prevent it from affecting future navigation
        localStorage.removeItem('redirectPath');

        // Check if this is the about page
        if (redirectPath === '/portfolio/about') {
            await loadContent(defaultPath);
            history.replaceState({path: defaultPath}, '', redirectPath);

            const aboutLink = document.querySelector('nav a');
            if (aboutLink) setActiveLink(aboutLink);

            // Skip the rest of the initialization
            return;
        }

        // Handle other pages - extract just the page name
        const pageMatch = redirectPath.match(/\/portfolio\/([^\/]+)$/);
        if (pageMatch) {
            const pageName = pageMatch[1];

            // Find this page in the structure
            let foundContentPath = null;
            let foundLink = null;

            // Search through all sections to find the page
            for (const [section, content] of Object.entries(structure)) {
                const matchingPage = content.pages.find(page => page.folder === pageName);
                if (matchingPage) {
                    foundContentPath = `${baseUrl}/${content.path}/${pageName}/content.md`;

                    // Find the corresponding navigation link
                    const links = document.querySelectorAll('nav a');
                    for (const link of links) {
                        if (link.textContent === matchingPage.title) {
                            foundLink = link;
                            break;
                        }
                    }
                    break;
                }
            }

            if (foundContentPath) {
                // Load the content for the requested page
                await loadContent(foundContentPath);
                history.replaceState({path: foundContentPath}, '', redirectPath);

                if (foundLink) setActiveLink(foundLink);

                // Skip the rest of the initialization
                return;
            }
        }
    }

    // Handle content loading based on URL (only if not redirected)
    const currentPath = window.location.pathname;
    const aboutMatch = currentPath === '/portfolio/about';
    const pageMatch = currentPath.match(/\/portfolio\/([^\/]+)$/);

    try {
        // Check if we have a state (from back/forward navigation)
        if (history.state && history.state.path) {
            await loadContent(history.state.path);
            const link = findNavigationLink(history.state.path);
            if (link) setActiveLink(link);
        }
        // If we're at the About page
        else if (aboutMatch) {
            await loadContent(defaultPath);
            history.replaceState({path: defaultPath}, '', currentPath);

            const aboutLink = document.querySelector('nav a');
            if (aboutLink) setActiveLink(aboutLink);
        }
        // If we have a specific page in the URL (like /portfolio/project-umn)
        else if (pageMatch) {
            const pageName = pageMatch[1];

            // Find this page in the structure
            let foundContentPath = null;
            let foundLink = null;

            // Search through all sections to find the page
            for (const [section, content] of Object.entries(structure)) {
                const matchingPage = content.pages.find(page => page.folder === pageName);
                if (matchingPage) {
                    foundContentPath = `${baseUrl}/${content.path}/${pageName}/content.md`;

                    // Find the corresponding navigation link
                    const links = document.querySelectorAll('nav a');
                    for (const link of links) {
                        if (link.textContent === matchingPage.title) {
                            foundLink = link;
                            break;
                        }
                    }
                    break;
                }
            }

            if (foundContentPath) {
                await loadContent(foundContentPath);
                history.replaceState({path: foundContentPath}, '', currentPath);

                if (foundLink) setActiveLink(foundLink);
            } else {
                // If page not found, redirect to home
                window.location.href = '/portfolio/';
            }
        }
        // If we're at the root
        else if (currentPath === '/portfolio/' || currentPath === '/portfolio/index.html') {
            await loadContent(defaultPath);

            // For About page, use a simpler URL
            const newUrl = '/portfolio/about';
            history.replaceState({path: defaultPath}, '', newUrl);

            const aboutLink = document.querySelector('nav a');
            if (aboutLink) setActiveLink(aboutLink);
        } else {
            // Handle direct file access by redirecting to the portfolio root
            window.location.href = '/portfolio/';
        }
    } catch (error) {
        console.error('Error during initialization:', error);
        document.getElementById('content').innerHTML = `
            <div class="error-message">
                <h1>Error Loading Content</h1>
                <p>Sorry, there was an error loading the initial content.</p>
            </div>
        `;
    }
}

// Main window.onload function - entry point for the application
window.onload = async function() {
    // Initialize core functionality
    await init();

    // Initialize scroll animations after content is loaded
    initScrollAnimations();
};