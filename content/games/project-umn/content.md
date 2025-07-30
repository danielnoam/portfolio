<div class="page-content">

# Project UMN


<img src="https://danielnoam.github.io/portfolio/assets/project-umn/introon.gif" alt="Intro">

[itch.io](https://danielnoam.itch.io/project-umd) | [GDD](https://docs.google.com/document/d/1cU73PA5Ix3AxZ0AB7ok3quzK6Il2FuIT4DuwFEk2508/edit?usp=sharing)


<div class="project-card">

## Overview

"Project UMN" is a third-person puzzle game developed for my third-semester school project. 
Players control a robotic entity alongside a robot companion through a series of minimalist simulation tests, each featuring unique mechanics.
The story unfolds through environmental design with minimal text, culminating in a single moral choice that explores the balance between efficiency and companionship.

</div>

<div class="project-card">

## Core Design Elements

### The Player

- A state machine controller with fine-tuned movement parameters for smooth acceleration, precise control, and responsive movement.
- Head tracking through IK that follows the camera during gameplay and tracks the mouse cursor in menus for more natural character animation.
- Fluid animation transitions using blend trees that create seamless movement between walking, running, and interacting with objects.
- Versatile camera system that switches between exploration mode with a free-orbiting view and a focused over-the-shoulder perspective for precise interactions.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/player.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/player.gif" alt="Player Animation Tree">
            <figcaption>Player Animation Tree</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/player2.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/player2.gif" alt="Player Interaction">
            <figcaption>Player interaction</figcaption>
        </a>
    </figure>
</div>


### The Robot

- A physics-based hover movement that dynamically adjusts to terrain, maintaining optimal height while following the player or reaching designated positions.
- Reactive ear animations that respond to movement and rotation, creating visual feedback as the robot changes direction or speed.
- Dynamic lighting and emission that adapts to environmental conditions, with special aiming mode enhancements when the player needs precision.
- Environmental reveal mechanics that allow the robot to uncover hidden pathways.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/robot1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/robot1.gif" alt="Robot Movement">
            <figcaption>Robot movement</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/world3.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/world3.gif" alt="Robot Light">
            <figcaption>The robot follows the player's aim</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/robot3.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/robot3.gif" alt="Robot command">
            <figcaption>Commanding the robot</figcaption>
        </a>
    </figure>
</div>

### The Simulation

- A clean, minimalist look that highlights important elements while maintaining a distinctive sci-fi aesthetic.
- Button prompts and hints that appear as part of the environment instead of UI elements, showing up only when needed.
- Game menus are built as part of the world itself with smooth animations and controls that match the game's overall feel.
- Test chambers that build themselves through animated sequences, creating dramatic scene changes and reinforcing the artificial testing environment.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/world1.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/world1.gif" alt="Dynamic Stairs">
            <figcaption>Dynamic stairs</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/world2.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/world2.gif" alt="Dynamic Bridge">
            <figcaption>Dynamic bridge</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/world4.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/world4.gif" alt="Easter egg">
            <figcaption>?</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/loadanimation.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/loadanimation.gif" alt="Loading Animation">
            <figcaption>Test loading animation</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/menu.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/menu.gif" alt="Menu">
            <figcaption>In world menu</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/mainmenu.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/mainmenu.gif" alt="Main Menu">
            <figcaption>Main menu</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Development Insights

This project helped me develop skills with C# interfaces, abstract classes,
and Unity's Shader Graph, Scriptable Objects, Animator, and the use of animation tweening libraries.

- Using a GDD to plan the game's scope, mechanics, and story progression.
- Used Scriptable Objects to build modular, reusable components for puzzles.
- Implemented Cinemachine for dynamic camera movements and cutscenes.
- Built custom shaders with Shader Graph to create the game's distinctive minimalist look.
- Designed a robust player controller using a state machine architecture to manage different movement states and behaviors with clean code organization.
- Learned to use Unity's Animator to create a comprehensive state machine for character animations, ensuring smooth and natural transitions between walking, running, idle, and interaction states.
- Implemented Inverse Kinematics (IK) to create a responsive player character with natural head tracking that adapts to player actions.
- Integrated Unity's new Input System to provide full controller support alongside keyboard and mouse controls.


</div>
</div>

