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
                url: "assets/Resume-UnityDev.pdf",
                target: "_blank"
            },
            {
                title: "Itch.io",
                type: "external",
                url: "https://danielnoam.itch.io/",
                target: "_blank"
            },
            {
                title: "Github",
                type: "external",
                url: "https://github.com/danielnoam",
                target: "_blank"
            },
        ]
    },
    
    structure: {
        "Games": {
            path: "content/games",
            foldout: false,
            pages: [
                { title: "Electro Grid", folder: "electro-grid", visible: true },
                { title: "Chicken Invaders Remake", folder: "chicken-invaders-remake", visible: true },
                { title: "Project UMN", folder: "project-umn", visible: true },
                { title: "2DPlatformer", folder: "2dplatformer", visible: true },
                { title: "School These Sh*ts", folder: "school-these-shits", visible: true },
                { title: "Pixel Knight", folder: "pixel-knight", visible: true },
            ]
        },
        "GameJams": {
            path: "content/games",
            foldout: false,
            pages: [
                { title: "Power Factory - KJ 2025", folder: "power-factory", visible: true },
                { title: "Bubblerena - GGJ 2025", folder: "bubblerena", visible: true },
            ]
        },
        "Unity": {
            path: "content/other",
            foldout: false,
            pages: [
                { title: "Shaders", folder: "shaders", visible: true },
                { title: "Controller Rumble", folder: "controller-rumble", visible: true },
                { title: "Object Pooling", folder: "object-pooling", visible: true },
                { title: "VFX & Transitions", folder: "vfx-transitions", visible: true },
                { title: "Editor Utilities", folder: "editor-utilities", visible: true },
            ]
        },
        "Misc": {
            path: "content/other",
            foldout: true,
            pages: [

            ]
        },
        
    }
};