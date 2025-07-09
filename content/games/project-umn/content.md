<div class="page-content">

# Project UMN


<img src="https://danielnoam.github.io/portfolio/assets/project-umn/main.gif" alt="Intro">

[GDD](https://docs.google.com/document/d/1cU73PA5Ix3AxZ0AB7ok3quzK6Il2FuIT4DuwFEk2508/edit?usp=sharing)


<div class="project-card">

## Overview

"Project UMN" is a third-person puzzle game developed for my third-semester school project.
Players control a robotic entity alongside an AI companion through minimalist simulation tests, making moral choices that explore the balance between efficiency and companionship.
The story unfolds entirely through environmental design, with no text or dialogue.

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
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/test.mp4" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/test.gif" alt="Test">
            <figcaption>Test</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/test.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/test.gif" alt="Test">
            <figcaption>Test</figcaption>
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
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/test.mp4" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/test.gif" alt="Test">
            <figcaption>Test</figcaption>
        </a>
    </figure>
</div>

### The World

- A clean, minimalist look that highlights important elements while maintaining a distinctive sci-fi aesthetic.
- Button prompts and hints that appear as part of the environment instead of UI elements, showing up only when needed.
- Game menus are built as part of the world itself with smooth animations and controls that match the game's overall feel.
- Test chambers that build themselves through animated sequences, creating dramatic scene changes and reinforcing the artificial testing environment.


<div class="image-gallery">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/project-umn/test.mp4" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/project-umn/test.gif" alt="Test">
            <figcaption>Test</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Development Insights

This project helped me develop skills with C# interfaces, abstract classes, Unity's Shader Graph, Scriptable Objects, and the use of animation tweening libraries.

- Created a detailed GDD to plan the game's scope, mechanics, and story progression.
- Used Scriptable Objects to build modular, reusable components for puzzles and character behaviors.
- Implemented Cinemachine for dynamic camera movements and cutscenes.
- Built custom shaders with Shader Graph to create the game's distinctive minimalist look.

</div>
</div>