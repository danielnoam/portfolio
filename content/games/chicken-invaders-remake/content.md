<div class="page-content">

# Chicken Invaders Remake

<img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Cover.png" alt="Intro" class="page-logo">

<p class="text-center">
    <a href="https://tay-dev.itch.io/chicken-invaders-remake">Itch.io</a> | 
    <a href="https://docs.google.com/document/d/15oJfTMVTdB9uJKfskemjhVx1XfsIAPWvOurxZK-_GJw/edit?usp=sharing">GDD</a> | 
    <a href="https://youtu.be/kjTa3ECVQwo">Intro</a>
</p>

<div class="project-card">

## Overview

"Chicken Invaders Remake" is a collaborative project developed during my fourth semester as a team-based learning experience.
Our team consisted of 2 programmers (including myself), 2 3D modelers, and 1 technical artist.

Our goal was to recreate the original game's idea with modern visuals and reimagined gameplay.

</div>

<div class="project-card">

## Contributions

### Player Controller & Weapons

- modular player controller where components (movement, health, aiming, weapons) communicate through C# events
- Designed flexible weapon system using ScriptableObjects and composable behaviors - allows configuring weapon types, behaviors, effects, and targeting limits through data without code changes
- Reticle feedback showing heat, spread, and lock state
- Implemented rail-constrained movement system with dodge mechanic
- Health system uses shield/health pools with regeneration and iframe damage prevention

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PlayerAndCameraGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PlayerAndCameraGif.gif" alt="Player Movement">
            <figcaption>Player movement</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" alt="Weapons">
            <figcaption>Different weapons behaviors</figcaption>
        </a>
    </figure>
</div>

### Camera

- Integrated Cinemachine for dynamic camera behavior including screen shake, and combat feedback (Dynamic rotation and position depending on player position and aim direction)
- Implemented multiple camera setups for different sections with seamless transitions (intro, gameplay, shop, outro, passing through obstacles)

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/introcamera.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/introcamera.gif" alt="Intro cmera">
            <figcaption>Intro camera has different positions</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/passcamera.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/passcamera.gif" alt="Passthrough Ccamera">
            <figcaption>Passing through building has different camera effects</figcaption>
        </a>
    </figure>
</div>

### Object Pooling

- Implemented centralized pooling system for projectiles, audio effects, enemies, and visual effects
- Allows pre warming each pool before gameplay to minimize runtime instantiation overhead

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPoolingGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPoolingGif.gif" alt="Object pooling">
            <figcaption>Object pooling</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/objectpooler.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/objectpooler.png" alt="Object pooler">
            <figcaption>Object pooler</figcaption>
        </a>
    </figure>
</div>

### Level Design & Progression

- Built event-driven stage progression using ScriptableObjects
- Managed stage transitions, enemy spawning, obstacle spawning, and resource drops
- Created obstacle system with breakable and pass-through mechanics
- Designed stage task system supporting multiple objectives (eliminate enemies, break/pass obstacles)
- Implemented radio message system with priority handling and warning system for critical events

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" alt="Obstacles stage">
            <figcaption>Obstacles the player has to dodge</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/solevel.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/solevel.png" alt="Scriptable object level">
            <figcaption>Level settings</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" alt="Scriptable object stage">
            <figcaption>Stage settings</figcaption>
        </a>
    </figure>
</div>

### User Interface

- Designed complete UI/UX including HUD, shop, main menu, pause system, and settings
- Built dynamic HUD system that responds to player movement with position offset and shake effects, and changes color based on damage type (health/shield)
- Created diegetic main menu integrated into the game world
- Implemented adaptive stage progression bar that adjusts icon sizes and animates transitions

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenuGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenuGif.gif" alt="Main Menu">
            <figcaption>Main menu</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" alt="Pause Menu">
            <figcaption>Pause menu</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/radiowarning.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" alt="Radio&Warning">
            <figcaption>Radio & warning</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/statusbar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/statusbar.gif" alt="Status bar">
            <figcaption>Status bar react to movement and events</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsbar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsbar.gif" alt="Weapons bar">
            <figcaption>Weapons & dodge bar reacts to actions</figcaption>
        </a>
    </figure>
</div>

### Shop & Upgrade

- Built upgrade store with currency system and purchase validation using ScriptableObjects
- Tracks owned upgrades and applies stat changes dynamically

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" alt="Store Interface">
            <figcaption>Shop & Buying upgrades</figcaption>
        </a>
    </figure>
</div>


### Save System & Data Persistence

- Implemented multi-layer save system - persistent data for level completion and scores, session data for health/currency/upgrades/weapons, and user settings
- Handles serialization of ScriptableObject references and Dictionary collections

### Asset Integration

- Integrated 3D models, textures, 2D art, and sound effects from art team
- Created prefabs and materials for easy reuse
- Implemented scripts for various shader effects and materials 

### Audio

- Built audio system using ScriptableObjects for designer-friendly implementation
- Created music manager with cross-fade transitions, dynamic volume on pause, and stage-based theme switching

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/audioso.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/audioso.png" alt="Audio scriptable object">
            <figcaption>Scriptable object system for playing sfx</figcaption>
        </a>
    </figure>
</div>


### Controller Support

- Implemented full gamepad support with seamless device switching and dynamic UI updating button prompts
- Created custom vibration system with spatial 3D positioning and distance attenuation

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" alt="Controller rumble settings">
            <figcaption>Customizable controller rumble effect</figcaption>
        </a>
    </figure>
</div>

### Custom Editor Tools

- Created editor tools and inspector buttons for rapid testing
- Built debug visualizations using Gizmos

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" alt="Custom Editor Tools">
            <figcaption>Custom editor tools</figcaption>
        </a>
    </figure>
</div>

### Game Design & Narrative

- Balanced difficulty progression and designed tutorial
- Created story, dialogue, and intro/credits sequences

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" alt="Intro sequence">
            <figcaption>Intro sequence</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/credits.mp4" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/credits.mp4" alt="Credits sequence">
            <figcaption>Intro sequence</figcaption>
        </a>
    </figure>
</div>


### Custom Shaders

- Created dither shader for level boundaries that fade in as player approaches using distance-based transparency

</div>





<div class="project-card">

## Development Insights

This project served as an invaluable learning experience in collaborative game development, teaching essential skills in:

- Working effectively with programmers, artists, and technical artists to ensure smooth project workflow and consistent communication.
- Using Git to manage code changes across multiple team members without conflicts.
- Coordinating tasks, deadlines, and deliverables across team members with different specializations and schedules.
- Writing clean, documented, and modular code that other team members can understand, modify, and build upon.


</div>


<div class="project-card">

## Gallery
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



</div>