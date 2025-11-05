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

### Player Controller & Weapons

- modular player controller where components (movement, health, aiming, weapons) communicate through C# events
- Designed flexible weapon system using ScriptableObjects and composable behaviors - allows configuring weapon types, behaviors, effects, and targeting limits through data without code changes
- Real-time reticle feedback showing heat, spread, and lock state
- Implemented rail-constrained movement system with dodge mechanic
- Health system uses shield/health pools with regeneration and iframe damage prevention

### Camera

- Integrated Cinemachine for dynamic camera behavior including screen shake, smooth tracking, and combat feedback
- Implemented multiple camera setups for different gameplay sections with seamless transitions

### Object Pooling

- Implemented centralized pooling system for projectiles, audio effects, enemies, and visual effects
- Eliminates instantiation overhead and reduces garbage collection

### Level Design & Progression

- Built event-driven stage progression using ScriptableObjects
- Managed stage transitions, enemy spawning, obstacle spawning, and resource drops
- Created obstacle system with breakable and pass-through mechanics
- Designed stage task system supporting multiple objectives (eliminate enemies, break/pass obstacles)
- Implemented radio message system with priority handling and warning system for critical events

### User Interface

- Designed complete UI/UX including HUD, menus, pause system, and settings
- Created adaptive stage progression bar that adjusts icon sizes and animates transitions
- All UI systems respond to game events and pause state

### Shop & Upgrade Economy

- Built upgrade store with currency system and purchase validation using ScriptableObjects
- Tracks owned upgrades and applies stat changes dynamically

### Save System & Data Persistence

- Implemented multi-layer save system - persistent data for level completion and scores, session data for health/currency/upgrades/weapons, and user settings
- Handles serialization of ScriptableObject references and Dictionary collections

### Asset Integration

- Integrated 3D models, textures, 2D art, and sound effects from art team, creating necessary prefabs
- Implemented scripts for various shader effects and materials 

### Audio

- Built audio system using ScriptableObjects for designer-friendly implementation
- Created music manager with cross-fade transitions, dynamic volume on pause, and stage-based theme switching

### Controller Support

- Implemented full gamepad support with seamless device switching and dynamic UI updating button prompts
- Created custom vibration system with spatial 3D positioning and distance attenuation

### Custom Editor Tools

- Created editor tools and inspector buttons for rapid testing
- Built debug visualizations using Gizmos

### Game Design & Narrative

- Balanced difficulty progression and designed tutorial
- Created story, dialogue, and intro/credits sequences

### Custom Shaders

- Created dither shader for level boundaries that fade in as player approaches using distance-based transparency

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