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
        "GAMES": {
            path: "content/games",
            pages: [
                { title: "Project UMN", folder: "project-umn", visible: true },
                { title: "2D Platformer", folder: "2d-platformer", visible: true },
                { title: "School These Sh*ts", folder: "school-these-shits", visible: true },
                { title: "Pixel Knight", folder: "pixel-knight", visible: true },
            ]
        },
        "Prototypes": {
            path: "content/prototypes",
            pages: [
                { title: "Bubblerena - GGJ 2025", folder: "bubblerena", visible: false },
                { title: "PopACorn", folder: "popacorn", visible: false },
            ]
        },
        "Art": {
            path: "content/art",
            pages: [
                { title: "Shaders", folder: "shaders", visible: false },
                { title: "Blender", folder: "blender", visible: false },
                { title: "Procedural Animations", folder: "procedural-animations", visible: false },
            ]
        },
    }
};