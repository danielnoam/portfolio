/*==============================================
                CONFIGURATION
================================================*/

// The single source of truth for the project-page prefix. The repo name
// should appear here and nowhere else — everything else derives from it.
const BASE_URL = '/portfolio';

const CONFIG = {
    // Single source of truth for the site version. Bump on every deploy
    // (semver) and keep CHANGELOG.md's top entry in sync. Rendered at the
    // bottom of the sidebar as the visible "did my deploy land?" marker.
    version: '1.0.2',

    // Base URL for the site
    baseUrl: BASE_URL,

    // Default content path (derived from baseUrl)
    defaultPath: `${BASE_URL}/content/about/content.md`,

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
            foldout: false,
            pages: [
                { title: "Electro Grid", folder: "content/games/electro-grid", visible: true },
                { title: "Chicken Invaders Remake", folder: "content/games/chicken-invaders-remake", visible: true },
                { title: "Project UMN", folder: "content/games/project-umn", visible: true },
                { title: "2DPlatformer", folder: "content/games/2dplatformer", visible: true },
                { title: "School These Sh*ts", folder: "content/games/school-these-shits", visible: true },
            ]
        },
        "Unity": {
            foldout: false,
            pages: [
                { title: "Shaders", folder: "content/other/shaders", visible: true },
                { title: "Editor Utilities", folder: "content/other/utilities", visible: true },
                { title: "Object Pooling", folder: "content/other/object-pooling", visible: true },
                { title: "Controller Rumble", folder: "content/other/controller-rumble", visible: true },
                { title: "VFX & Transitions", folder: "content/other/vfx-transitions", visible: true },
            ]
        },
        "GameJams": {
            foldout: false,
            pages: [
                { title: "Midnight Masquerade - GGJ 2026", folder: "content/games/midnight-masquerade", visible: true },
                { title: "Power Factory - KJ 2025", folder: "content/games/power-factory", visible: true },
                { title: "Bubblerena - GGJ 2025", folder: "content/games/bubblerena", visible: true },
            ]
        },
        "Archive": {
            foldout: false,
            pages: [
                { title: "Pixel Knight", folder: "content/games/pixel-knight", visible: false },
            ]
        },
    }
};