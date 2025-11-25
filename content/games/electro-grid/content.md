<div class="page-content">

# Electro Grid

<img src="https://danielnoam.github.io/portfolio/assets/electro-grid/main.gif" alt="Electro Grid Gameplay" class="page-logo">

<p class="text-center">
    <a href="https://danielnoam.itch.io/electro-grid">Itch.io</a> | 
    <a href="https://github.com/danielnoam/ElectroGrid">Github</a>
</p>

<div class="project-card">

## Overview

"Electro Grid" is a match-3 puzzle game developed as my fifth-semester project. With a one-month development timeline, the project focused on creating a highly polished short experience optimized for mobile devices, with full PC and WebGL support.

The game challenges players to complete objectives by matching colored pieces on dynamic, non-standard grid layouts. Players manage different object types and must complete varied objectives while avoiding different loss conditions.


</div>

<div class="project-card">

## Core Design Elements

### Grid System

To support unique level designs beyond standard rectangles, I engineered a robust custom grid system that serves as the game's foundation.

- Grid shapes and layouts are stored as data assets, allowing for rapid reuse without code changes. This single data source was then used to generate the gameplay board, background, and level previews.
- A custom Inspector tool allows designers to visually "paint" valid grid cells. It includes quality-of-life features like click-and-drag painting, symmetry tools for balanced layouts, and bulk manipulation options.
- The system uses an abstract conversion layer to handle translation between grid indices and world space, automatically handling cell spacing, centering, and different layout orientations.

### Game Feel

Given the short development time, a major focus was placed on making every interaction feel satisfying and responsive, extending from the gameplay into the User Interface.

- The UI is designed to feel fully alive, featuring smooth transitions between menu screens, dynamic pop-ups for information, and impactful sequences for starting or ending a level, while every button press has feedback.
- A unified screen shake system makes interaction feel impactful throughout the entire game.
- Extensive use of particle effects transforms standard match-3 mechanics into a high-energy spectacle, providing "juicy" visual feedback for matching, destruction, and special abilities.
- To match the game's aesthetic, I selected upbeat synthwave music that provides a flow to the gameplay, paired with distinct, retro-inspired SFX for every interaction.
- A custom VFX system streamlines visual effects, dynamically changing post-processing and triggering complex effect sequences.
- A specialized haptic feedback solution for Android adds tactile depth, delivering distinct vibration patterns that distinguish between light UI ticks and heavy gameplay impacts.


### Gameplay Mechanics

The core loop revolves around strategic matching and objective completion, powered by a modular objective system.

- Plus: Special item that dynamically grant resources (time or moves) when destroyed.
- Square Stars: Item that must be guided to valid exit points at the bottom of the grid.
- Double Stars: Static blockers that require adjacent matches or power-ups to clear.
- Linebreak: A specialized match mechanic that clears entire rows or columns.
- Objectives: A modular system supporting varied challenges such as collection quotas, escort missions, and score targets.
- Lose Conditions: Configurable failure states including move limits or time limits to vary the pacing of levels.


</div>

<div class="project-card">

## Development Insights

- Starting with custom editor tools upfront was a game-changer, allowing me to "paint" levels and iterate on designs much faster than manually configuring data.
- The short time limit made it so, I had to limit myself to get the "feel" and polish of the core mechanics instead of getting lost in feature creep.
- Decoupled the UI from game logic by building an event-driven HUD that updates automatically, which kept my code clean and easy to maintain.
- I designed the objective system to be modular, which let me mix and match different rules like time limits or collection quotas to create unique levels without writing new code for every variation.

</div>

</div>