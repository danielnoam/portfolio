<div class="page-content">

# Chicken Invaders Remake

<img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Cover.png" alt="Intro" class="page-logo">

<div class="button-group horizontal">
    <a href="https://tay-dev.itch.io/chicken-invaders-remake" target="_blank" class="button">Itch.io</a>
    <a href="https://github.com/danielnoam/ProjectChicken" target="_blank" class="button">Github</a>
    <a href="https://docs.google.com/document/d/15oJfTMVTdB9uJKfskemjhVx1XfsIAPWvOurxZK-_GJw/edit?usp=sharing" target="_blank" class="button">GDD</a>
    <a href="https://youtu.be/kjTa3ECVQwo" target="_blank" class="button">Intro</a>
</div>

<div class="project-card">

## Overview

"Chicken Invaders Remake" is a collaborative project developed during my fourth semester as a team-based learning experience.
Our team consisted of 2 programmers (including myself), 2 3D modelers, and 1 technical artist.

Our goal was to recreate the original game's idea with modern visuals and reimagined gameplay.

</div>

<div class="project-card">

## Contributions

### Player Controller & Weapons

- Constrained movement in a boundary with smooth acceleration and deceleration and dodge mechanic
- Designed flexible weapon system using ScriptableObjects and composable behaviors - allows configuring weapon types, behaviors, effects, and targeting limits through data without code changes
- Reticle feedback showing heat, spread, and lock state
- Created aim assist system that snaps to nearest enemy within a configurable angle and distance
- Health system uses shield/health pools with regeneration and iframe damage prevention
- Resource pickup system with visual/audio feedback


<div class="code-showcase">
  <div class="code-block" 
       data-file="/portfolio/assets/chicken-invaders-remake/PlayerController.cs" 
       data-language="csharp"
       data-title="Player Controller"
       data-description="State machine-based movement with smooth acceleration and boundary constraints.">
  </div>
  <div class="code-block" 
       data-file="/portfolio/assets/chicken-invaders-remake/PlayerController.cs" 
       data-language="csharp"
       data-title="Weapon System"
       data-description="ScriptableObject-based weapon configuration with composable behaviors and targeting.">
  </div>
</div>


<div class="image-gallery gallery-2-columns">
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
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/reticle.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/reticle.gif" alt="Reticle">
            <figcaption>Dynamic reticle size, spread, and heat bar</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsSO.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsSO.png" alt="Weapon scriptable object">
            <figcaption>Easily customize a weapon behaviors and stats</figcaption>
        </a>
    </figure>
</div>

### Camera

- Integrated Cinemachine for camera positioning (Dynamic rotation and position depending on player position and aim direction)
- Created a camera shake system with easily configurable intensity and duration
- Implemented multiple camera setups for different sections with seamless transitions (intro, gameplay, shop, outro, passing through obstacles)

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/introcamera.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/introcamera.gif" alt="Intro camera">
            <figcaption>Intro camera has different positions</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/passcamera.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/passcamera.gif" alt="Passthrough camera">
            <figcaption>Passing through building has different camera effects</figcaption>
        </a>
    </figure>
</div>


### Level Design & Progression

- Built event-driven stage progression using ScriptableObjects
- Managed stage transitions, enemy spawning, obstacle spawning, and resource drops
- Created obstacle system with breakable and pass-through mechanics
- Designed stage task system supporting multiple objectives (eliminate enemies, break/pass obstacles)
- Implemented radio message system with priority handling and warning system for critical events
- Balanced difficulty progression and designed tutorial

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
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenu.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenu.mp4" autoplay loop muted playsinline></video>
            <figcaption>Main menu</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/PauseMenuGif.gif" alt="Pause menu">
            <figcaption>Pause menu</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/radioandwarning.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/radioandwarning.gif" alt="Radio & warning">
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
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/levelProgressionBar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/levelProgressionBar.gif" alt="level progression bar">
            <figcaption>Dynamic level progression bar & objectives</figcaption>
        </a>
    </figure>
</div>

### Shop & Upgrades

- Built upgrade store with currency system and purchase validation using ScriptableObjects
- Tracks owned upgrades and applies stat changes dynamically

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" alt="Store interface">
            <figcaption>Buying upgrades</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boughtUpgrades.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boughtUpgrades.gif" alt="Bought upgrades">
            <figcaption>Bought upgrades window</figcaption>
        </a>
    </figure>
</div>


### Controller Support

- Implemented full gamepad support with seamless device switching and dynamic UI updating button prompts
- Created custom vibration system with spatial 3D positioning and distance attenuation

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerUI.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerUI.gif" alt="Button prompts">
            <figcaption>Button prompts change depending on active device</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" alt="Controller rumble settings">
            <figcaption>Customizable controller rumble effect</figcaption>
        </a>
    </figure>
</div>


### Object Pooling

- Implemented centralized pooling system for projectiles, audio effects, enemies, and visual effects
- Allows pre warming each pool before gameplay to minimize runtime instantiation overhead

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPooling.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPooling.mp4" autoplay loop muted playsinline></video>
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

### Custom Tools & Designer Friendly Systems

- Created editor tools and inspector buttons for rapid testing
- Developed tools that allow non-programmers to configure complex behaviors through ScriptableObjects and components
- Built debug visualizations using Gizmos for easer debugging

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/CustomEditorGif.gif" alt="Custom Editor Tools">
            <figcaption>Custom editor tools</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/stagesub.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/stagesub.png" alt="Stage Subscriber">
            <figcaption>Stage subscriber component</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/audioso.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/audioso.png" alt="Audio scriptable object">
            <figcaption>Scriptable object system for playing sfx</figcaption>
        </a>
    </figure>
</div>

### Narrative Design

- Created story, dialogue
- Made intro/credits sequences using timeline and cinemachine

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" autoplay loop muted playsinline></video>
            <figcaption>Intro sequence</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/credits.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/credits.mp4" autoplay loop muted playsinline></video>
            <figcaption>Credits sequence</figcaption>
        </a>
    </figure>
</div>



### Custom Shaders

- Created dither shader for level boundaries that fade in as player approaches using distance-based transparency

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boundaryshader.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boundaryshader.gif" alt="Boundary Shader">
            <figcaption>Player boundary shader</figcaption>
        </a>
    </figure>
</div>


### Audio

- Built audio system using ScriptableObjects for designer-friendly implementation
- Created music manager with cross-fade transitions, dynamic volume on pause, and stage-based theme switching


### Save System & Data Persistence

- Implemented saving of data for level completion and scores, user settings, and session data for health/currency/upgrades/weapons
- Handles serialization of ScriptableObject references and Dictionary collections

### Asset Integration

- Integrated 3D models, textures, and 2D art from team members
- Created prefabs and materials
- Implemented scripts for various shader effects and materials


</div>



<div class="project-card">

## Gallery
<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay1.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay1.mp4" autoplay loop muted playsinline></video>
            <figcaption>Gameplay</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay2.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay2.mp4" autoplay loop muted playsinline></video>
            <figcaption>Gameplay</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay3.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Gameplay3.mp4" autoplay loop muted playsinline></video>
            <figcaption>Gameplay</figcaption>
        </a>
    </figure>
</div>

</div>



</div>