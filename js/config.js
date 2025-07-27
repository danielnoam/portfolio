/*==============================================
                CONFIGURATION
================================================*/
const CONFIG = {
    // Base URL for the site
    baseUrl: '/portfolio',

    // Default content path
    defaultPath: '/portfolio/content/about/content.md',

    // Site title
    siteTitle: 'Daniel Noam - Portfolio',

    // UI default settings
    uiSettings: {
        showUrls: true,
        showTopBar: true,
        showThemeToggle: true,
    },

    // Site structure configuration
    structure: {
        "Games": {
            path: "content/games",
            pages: [
                { title: "Chicken Invaders Remake", folder: "chicken-invaders", visible: false },
                { title: "PopACorn", folder: "popacorn", visible: false },
                { title: "Project UMN", folder: "project-umn", visible: false },
                { title: "2D Platformer", folder: "2d-platformer", visible: true },
                { title: "School These Sh*ts", folder: "school-these-shits", visible: true },
                { title: "Pixel Knight", folder: "pixel-knight", visible: true },
            ]
        },
        "GameJams": {
            path: "content/jams",
            pages: [
                { title: "Bubblerena - GGJ 2025", folder: "bubblerena", visible: false },
                { title: "Power Factory - KenneyJam 2025", folder: "power-factory", visible: true },
            ]
        },
        "Other": {
            path: "content/other",
            pages: [
                { title: "Assets", folder: "assets", visible: false },
                { title: "Shaders", folder: "shaders", visible: false },
                { title: "Models", folder: "models", visible: false },
                { title: "Procedural Animations", folder: "procedural-animations", visible: false },
            ]
        },
        
    }
};