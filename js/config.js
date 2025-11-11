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
        showThemeToggle: false,
    },

    navigation: {
        // Static links that appear at the top of navigation
        staticLinks: [
            {
                title: "About",
                type: "content",
                path: "content/about/content.md"
            },
        ],
        // Links that appear at the bottom of the navigation
        bottomLinks: [
            {
                title: "Resume",
                type: "external",
                url: "assets/Resume-General.pdf",
                target: "_blank"
            },
            {
                title: "Itch.io",
                type: "external",
                url: "https://danielnoam.itch.io/",
                target: "_blank"
            },
            {
                title: "LinkedIn",
                type: "external",
                url: "https://linkedin.com/in/daniel-noam",
                target: "_blank"
            }
        ]
    },
    
    structure: {
        "Games": {
            path: "content/games",
            pages: [
                { title: "PopACorn", folder: "popacorn", visible: false },
                { title: "Chicken Invaders Remake", folder: "chicken-invaders-remake", visible: true },
                { title: "Project UMN", folder: "project-umn", visible: true },
                { title: "Square", folder: "square", visible: true },
                { title: "School These Sh*ts", folder: "school-these-shits", visible: true },
                { title: "Pixel Knight", folder: "pixel-knight", visible: true },
            ]
        },
        "Unity Extensions": {
            path: "content/other",
            pages: [
                { title: "Controller Rumble", folder: "controller-rumble", visible: true },
                { title: "DNExtensions", folder: "dnextenstions", visible: true },
            ]
        },
        "GameJams": {
            path: "content/jams",
            pages: [
                { title: "Power Factory - KenneyJam 2025", folder: "power-factory", visible: true },
                { title: "Bubblerena - GGJ 2025", folder: "bubblerena", visible: true },
            ]
        },
        "Other": {
            path: "content/other",
            pages: [
                { title: "Shaders", folder: "shaders", visible: false },
                { title: "Models", folder: "models", visible: false },
                { title: "Procedural Animations", folder: "procedural-animations", visible: false },
            ]
        },
        
    }
};