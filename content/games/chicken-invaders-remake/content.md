<div class="page-content">

# Chicken Invaders Remake

<img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Cover.png" alt="Intro">

[Itch.io](https://tay-dev.itch.io/chicken-invaders-remake) | [GDD](https://docs.google.com/document/d/15oJfTMVTdB9uJKfskemjhXx1XfsIAPWvOurxZK-_GJw/edit?usp=sharing) | [Intro](https://youtu.be/kjTa3ECVQwo)



<div class="project-card">

## Overview

"Chicken Invaders Remake" is a collaborative project developed during my fourth semester as a team-based learning experience.
Our team consisted of 2 programmers (including myself), 2 3D modelers, and 1 technical artist.

Our goal was to recreate the original game's idea with modern visuals and reimagined gameplay,
while practicing teamwork, version control, and coordinated game development.

</div>

<div class="project-card">

## Main Contributions

### Player Controller & Weapon System

Built a modular component-based architecture where systems communicate through C# events. Implemented rail-constrained movement with dodge accumulation mechanics and multi-control scheme support.
Designed a flexible weapon system using ScriptableObjects and the behavior pattern. Weapons dynamically upgrade at runtime - creating new data instances and swapping visual elements based on upgrade level without duplicate prefabs.
Implemented projectile and hitscan types with composable behaviors allowing complex functionality through combination. Created aim-lock targeting with multi-target support and real-time reticle feedback (heat visualization, spread indication, size changes).
Health system features shield/health pools with regeneration, iframe damage prevention, and feedback through screen shake and fullscreen effects. Applied object pooling for projectiles to eliminate instantiation overhead.

### Camera System

Integrated Cinemachine for dynamic camera behavior including screen shake on damage, smooth tracking, and combat feedback synchronization. Implemented multiple camera configurations for different gameplay sections with seamless transitions.

### Level Design & Progression System

Built event-driven stage progression using ScriptableObjects for data-driven level creation. Orchestrated stage transitions, enemy spawning, obstacle management, and resource drops with automatic state tracking.
Created procedural obstacle system with dynamic pathfinding - obstacles support breakable and pass-through mechanics with visual feedback integration.
Designed stage task system supporting multiple objective types (eliminate enemies, break/pass-through obstacles) with real-time progress tracking. Implemented radio message system queuing character dialogue with priority handling and warning system for critical events.

### User Interface System

Designed complete UI/UX including in-game HUD, main menu navigation, pause system, options/settings interface, and outro screens. Created adaptive stage progression visualization that calculates icon sizes based on stage count and animates transitions. All UI systems integrate with pause state and respond to game events.
### Shop & Upgrade Economy

Developed upgrade store with currency system, purchase validation, and ScriptableObject-based upgrade definitions. System tracks owned upgrades and applies stat modifications dynamically.

### Save System & Data Persistence

Implemented multi-layer save architecture - cross-run persistence for level completion and high scores, session state for health/currency/upgrades/weapons, and user preferences. System handles complex serialization including ScriptableObject references and Dictionary collections.

### Asset Integration

Integrated 3D models, textures, and shader effects from art team into gameplay systems.

### Audio Systems

Built centralized audio management system using ScriptableObjects for designer-friendly sound implementation. Created music manager with cross-fade transitions between tracks, dynamic volume adjustment on pause, and stage-based theme switching.

### Controller Support

Implemented full gamepad support throughout the entire game with seamless device switching and dynamic UI that updates button prompts based on active input device. Created custom vibration system featuring spatial 3D positioning and distance attenuation for directional haptic feedback.

### Custom Editor Tools

Created custom editor tools and inspector buttons for rapid testing and designer workflow improvements. Built debug visualization systems using Gizmos for spatial debugging.

### Game Design & Narrative

Balanced difficulty progression and designed tutorial systems to teach core mechanics. Fine-tuned gameplay elements for player experience. Crafted game story, dialogue, and developed intro/outro sequences and credits scenes.

### Custom Shaders

Created custom shaders for visual effects using Shader Graph.

</div>

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PlayerAndCameraGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PlayerAndCameraGif.gif" alt="Player and Camera">
            <figcaption>Ship controls and camera movement</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" alt="Store Interface">
            <figcaption>Shop and upgrade system</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" alt="Weapon Upgrades">
            <figcaption>Weapon system</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" alt="Custom Editor Tools">
            <figcaption>Custom editor tools</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenuGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenuGif.gif" alt="Main Menu">
            <figcaption>Main menu interface</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" alt="Pause Menu">
            <figcaption>Pause menu interface</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" alt="Obstacles stage">
            <figcaption>Obstacles the player has to dodge</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPoolingGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPoolingGif.gif" alt="Object pooling">
            <figcaption>Object pooling system</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" alt="Scriptable object Stage">
            <figcaption>Scriptable Object stage system</figcaption>
        </a>
    </figure>
</div>


<div class="project-card">

## Development Insights

This project served as an invaluable learning experience in collaborative game development, teaching essential skills in:

- Working effectively with programmers, artists, and technical artists to ensure smooth project workflow and consistent communication.
- Using Git and collaborative development tools to manage code changes across multiple team members without conflicts.
- Understanding how different disciplines contribute to game development and learning to integrate programming work with 3D models and technical art.
- Coordinating tasks, deadlines, and deliverables across team members with different specializations and schedules.
- Learning to work with externally created 3D models, textures, and technical art implementations within the game engine.
- Writing clean, documented, and modular code that other team members can understand, modify, and build upon.


</div>

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gamepay1Gif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gamepay1Gif.gif" alt="Gameplay">
            <figcaption>Gameplay</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gamepay2Gif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gamepay2Gif.gif" alt="Gameplay">
            <figcaption>Gameplay</figcaption>
        </a>
    </figure>
</div>

</div>