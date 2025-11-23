<div class="page-content">

# Electro Grid

<img src="https://danielnoam.github.io/portfolio/assets/electro-grid/main.gif" alt="Electro Grid Gameplay" class="page-logo">

<p class="text-center">
    <a href="https://danielnoam.itch.io/electro-grid">Itch.io</a>
</p>

<div class="project-card">

## Overview

"Electro Grid" is a match-3 puzzle game developed as my fifth-semester project. With a concise one-month development timeline, the project focused on creating a highly polished, smaller-scoped experience.

The game challenges players to clear circuits and objectives on dynamic, non-standard grid layouts, featuring a custom-built grid system and a "juicy" game feel optimized for mobile devices.

</div>

<div class="project-card">

## Grid System

To support unique level designs beyond standard rectangles, I developed a robust custom grid system that serves as the game's foundation.

- Scriptable Object Architecture: Grid shapes are stored as data assets, allowing for easy reuse and modification across different levels without touching code.
- Custom Inspector Tools: A dedicated editor tool allows designers to visually "paint" valid grid cells directly in the Inspector. It includes quality-of-life features like:
    - Click-and-drag painting to toggle active cells.
    - Quick manipulation tools to invert, clear, or fill the grid.
    - Symmetry tools to flip the grid horizontally or vertically for balanced layouts.
- Flexible Coordinate Conversion: The system uses an abstract conversion class to handle translation between grid indices and world space. This supports different layouts (Vertical vs. Horizontal) and handles cell spacing and centering automatically.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="#" target="_blank">
            <img src="assets/electro-grid/grid_editor.gif" alt="Custom Grid Editor">
            <figcaption>Custom Grid Editor</figcaption>
        </a>
    </figure>
    <figure>
        <a href="#" target="_blank">
            <img src="assets/electro-grid/grid_shapes.png" alt="Various Grid Shapes">
            <figcaption>Various Grid Shapes</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Game Feel

Given the short development time, a major focus was placed on making every interaction feel satisfying and responsive, extending from the gameplay into the User Interface.

- Reactive UI Elements: The UI is fully animated using tweening libraries. Objective counters punch (scale up and down) whenever progress is made, providing immediate visual feedback for every match.
- Unified Feedback: Interaction is consistent across the entire game; clicking UI buttons (like Retry or Next Level) triggers a subtle camera shake, maintaining immersion even in menus.
- Visual Feedback: Comprehensive use of particle effects and screen shake for matching, destroying obstacles, and spawning items.
- Custom Haptics: A specialized haptic feedback solution designed for Android delivers distinct vibration patterns for different actions (light ticks vs. heavy impacts).

</div>

<div class="project-card">

## Gameplay Mechanics

The core loop revolves around strategic matching and objective completion, powered by a modular objective system.

- Plus: Special item that dynamically grant resources (time or moves) when destroyed.
- Square Stars: Item that must be guided to valid exit points at the bottom of the grid.
- Double Stars: Static blockers that require adjacent matches or power-ups to clear.
- Linebreak: A specialized match mechanic that clears entire rows or columns.

</div>

<div class="project-card">

## Development Insights

- Event-Driven UI: The HUD is fully decoupled from the game loop. It dynamically instantiates UI elements based on the level's specific objectives and subscribes to events to update in real-time without polling.
- Scoped for Polish: By limiting the scope to one month, I focused on depth rather than breadth, ensuring the core mechanics were rock solid.
- Tool-Driven Design: Building the custom grid tools first allowed for rapid level iteration.
- Modular Logic: The abstract objective and lose condition classes allowed me to mix and match rules (Time Limits, Move Limits, Collection Quotas) to create varied level types without writing new code for each variation.

</div>

</div>