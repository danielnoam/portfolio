<div class="page-content">

# 2D Platformer


<img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/main.gif" alt="Intro">

[Itch.io](https://danielnoam.itch.io/2d-platformer)


<div class="project-card">

## Overview

"2D Platformer" started as a small project to learn and expand skills but ballooned into its own game. It features fluid movement mechanics including wall-jumping and dashing, complemented by forgiving systems like coyote time and jump buffering. Players navigate through meticulously crafted levels filled with interactive elements such as soft platforms, crumbling surfaces, and portals, all supported by fine-tuned physics and camera systems.


</div>

<div class="project-card">
    
## Core Design Elements

### Player Abilities

- Double jump, wall sliding, wall jump, and dashing mechanics provide a versatile and engaging platforming experience.
- Coyote jump and jump buffering techniques create a more forgiving and responsive control scheme.
- Variable jump height allows players to control their jump trajectory and navigate the environment with precision.
- Unique gravity and friction that provide a satisfying and responsive platforming experience.
- Fine-tuned physics parameters that allow for precise player control and predictable movement.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/doublejump.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/doublejump.gif" alt="Double jump">
            <figcaption>Double jump</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/wallslide.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/wallslide.gif" alt="Wall slide">
            <figcaption>Wall slide</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/walljump.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/walljump.gif" alt="Wall jump">
            <figcaption>Wall jump</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/variableJump.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/variableJump.gif" alt="Variable jump height">
            <figcaption>Variable jump height</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/player1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/player1.gif" alt="Coyote jump">
            <figcaption>Coyote jump</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/Physics1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/Physics1.gif" alt="Predictable movement">
            <figcaption>Predictable movement</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/Physics2.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/Physics2.gif" alt="Player acceleration">
            <figcaption>Player acceleration</figcaption>
        </a>
    </figure>
</div>

### Environmental Elements

- Hazardous obstacles like lava and spikes that make traversal dangerous.
- Soft objects that players can jump through from below but land on from above.
- Crumbling objects that add a sense of urgency and require quick decision-making.
- Moving platforms that require timing and coordination to navigate.
- Portals that transport players to different parts of the level or to entirely new areas.
- Checkpoints that allow players to save their progress and provide a sense of accomplishment.

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/movingplatform.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/movingplatform.gif" alt="Moving platform">
            <figcaption>Moving platform</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/softPlatform.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/softPlatform.gif" alt="Soft platform">
            <figcaption>Soft platform</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/crumblingobject.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/crumblingobject.gif" alt="Crumbling platform">
            <figcaption>Crumbling platform</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/spikes.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/spikes.gif" alt="Spikes">
            <figcaption>Spikes</figcaption>
        </a>
    </figure>
</div>

### Level Design and Progression

- Carefully crafted levels that gradually introduce new mechanics and challenges.
- Fake walls and hidden areas that reward exploration and encourage players to search for secrets.
- Balanced difficulty curve that keeps players engaged and motivated to improve their skills.

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/Hazard3.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/Hazard3.gif" alt="Unique level mechanics">
            <figcaption>Unique level mechanics</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/hiddenarea.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/hiddenarea.gif" alt="Hidden collectible">
            <figcaption>Hidden collectible</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/hazard1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/hazard1.gif" alt="Platforming puzzle">
            <figcaption>Platforming puzzle</figcaption>
        </a>
    </figure>
</div>


### Camera

- Camera smoothly follows the player's movement and adjusts based on their position and velocity.
- Intelligent camera positioning ensures optimal visibility of the player's surroundings.
- Smooth camera transitions between different areas of the level create a seamless gameplay experience.

<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera1.gif" alt="Different camera states">
            <figcaption>Different camera states</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera2.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera2.gif" alt="Smooth zooming">
            <figcaption>Smooth zooming</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera4.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/camera4.gif" alt="Different camera states">
            <figcaption>Different camera states</figcaption>
        </a>
    </figure>
</div>

### Flexibility

- Highly customizable player attributes and abilities allow for rapid prototyping and fine-tuning.
- Custom editor tools and visual debugging systems to help with development and level design.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlayerStats.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlayerStats.gif" alt="Player stats customization">
            <figcaption>Adjustable player stats editor</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlayerAbilitys.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlayerAbilitys.gif" alt="Player abilities editor">
            <figcaption>Player ability customization</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/Length.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/Length.gif" alt="Jump measurement tool">
            <figcaption>Jump measurement tool</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/CameraTrigger.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/CameraTrigger.gif" alt="Camera trigger system">
            <figcaption>Camera trigger editor</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlatformMovement.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/2d-platformer/PlatformMovement.gif" alt="Platform movement editor">
            <figcaption>Platform path visualizer</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">
    
## Development Insights

- Studied popular platformers to understand what makes jumping and movement feel great to players
- Added "juice" through subtle animations and visual feedback to make the player, world, and UI elements feel alive and responsive
- Figured out how to connect different game scenes smoothly while maintaining player progress
- Built helpful tools that saved me hours of development time
- Created a flexible player controller where I could quickly tweak values and see results immediately
- Balanced making levels challenging enough to be fun but not frustratingly difficult


</div>
</div>

