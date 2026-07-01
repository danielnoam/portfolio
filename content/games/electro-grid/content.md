---
thumbnail: /portfolio/assets/electro-grid/main.gif
shortDescription: Match-3 mobile puzzle game with power-ups and various objectives.
tags: [games, unity, mobile, web-gl, "2025", pc, solo, featured]
---
<div class="page-content">

# Electro Grid

<img src="https://danielnoam.github.io/portfolio/assets/electro-grid/main.gif" alt="Electro Grid Gameplay" class="page-logo">

<div class="button-group horizontal">
    <a href="https://danielnoam.itch.io/electro-grid" target="_blank" class="button">Itch.io</a>
    <a href="https://github.com/danielnoam/ElectroGrid" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview

"Electro Grid" is a match-3 puzzle game developed as my fifth-semester project. With a one-month development timeline, the project focused on creating a highly polished short experience optimized for mobile devices, with support for PC and WebGL .

The game challenges players to complete objectives by matching colored pieces on dynamic, non-standard grid layouts. Players manage different object types and must complete varied objectives while avoiding different loss conditions.



</div>

<div class="project-card">

## Core Design Elements

### Gameplay Mechanics

The core loop revolves around matching shapes and completing objectives. 

- Plus: Special item that dynamically grant resources (time or moves) when destroyed.
- Square Stars: Item that must be guided to valid exit points at the bottom of the grid.
- Double Stars: Static blockers that require adjacent matches or power-ups to clear.
- Linebreak: A specialized match mechanic that clears entire rows or columns.
- Objectives: A modular system supporting varied challenges such as collection quotas, escort missions, and score targets.
- Lose Conditions: Configurable failure states including move limit or time limits to vary the pacing of levels.

<div class="code-showcase">
  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/Match3Objective.cs" 
       data-language="csharp"
       data-title="Match3Objective.cs"
       data-description="Abstract base class establishing the event-driven contract for all gameplay objectives.">
  </div>

  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/GetSpecificItemMatches.cs" 
       data-language="csharp"
       data-title="GetSpecificItemMatches.cs"
       data-description="Modular objective logic that tracks specific item matches.">
  </div>
</div>


<div class="showcase" data-layout="grid" data-columns="4">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayMatching.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayMatching.mp4" autoplay loop muted playsinline></video>
            <figcaption>Basic matching</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplaySquareStar.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplaySquareStar.mp4" autoplay loop muted playsinline></video>
            <figcaption>Square star objective</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayLineBreak.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayLineBreak.mp4" autoplay loop muted playsinline></video>
            <figcaption>Line breaking</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayDoubleStar.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayDoubleStar.mp4" autoplay loop muted playsinline></video>
            <figcaption>Double star objective</figcaption>
        </a>
    </figure>
</div>

### Game Feel & UI

A major focus was placed on making every interaction feel satisfying and responsive, extending from the gameplay into the user interface.

- The UI features smooth transitions between menu screens, window pop-up for information, and impactful effects for starting or ending a level.
- A unified screen shake system makes interaction feel impactful throughout the entire game.
- Extensive use of particle effects transforms standard mechanics into a high-energy spectacle, providing "juicy" visual feedback for matching, destruction, and special abilities.
- A custom VFX system streamlines visual effects, dynamically changing post-processing and triggering complex effect sequences.
- Haptic feedback for Android adds tactile depth, delivering distinct vibration patterns that distinguish between light UI ticks and heavy gameplay impacts.

<div class="code-showcase">
  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/MenuManager.cs" 
       data-language="csharp"
       data-title="MenuManager.cs"
       data-description="The central controller for UI flow. It uses a Dictionary of types and a generic method to manage screen transitions.">
  </div>

  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/LevelSelectionScreen.cs" 
       data-language="csharp"
       data-title="LevelSelectionScreen.cs"
       data-description="Reads the raw Grid data from the level asset and instantiates a visual representation for the player preview.">
  </div>
</div>

<div class="showcase" data-layout="grid" data-columns="4">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelStartingLevel.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelStartingLevel.mp4" autoplay loop muted playsinline></video>
            <figcaption>Starting a level</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelEndingLevel.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelEndingLevel.mp4" autoplay loop muted playsinline></video>
            <figcaption>Ending a level</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelInfoWindow.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelInfoWindow.mp4" autoplay loop muted playsinline></video>
            <figcaption>Information window</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelMainMenu.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/FeelMainMenu.mp4" autoplay loop muted playsinline></video>
            <figcaption>Main menu</figcaption>
        </a>
    </figure>
</div>

### Grid System

To support unique level designs beyond standard rectangles, I created a custom grid system that serves as the game's foundation.

- Grid shapes and layouts are stored as data assets, allowing for rapid reuse without code changes. This single data source was then used to generate the gameplay board, background, and level previews.
- A custom Inspector tool allows designers to visually "paint" valid grid cells. It includes quality-of-life features like click-and-drag painting, symmetry tools for balanced layouts, and bulk manipulation options.
- The system uses an abstract conversion layer to handle translation between grid indices and world space, automatically handling cell spacing, centering, and different layout orientations.


<div class="code-showcase">
  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/Grid.cs" 
       data-language="csharp"
       data-title="Grid.cs"
       data-description="Serializable class using a flattened array to store 2D grid data.">
  </div>

  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/GridDrawer.cs" 
       data-language="csharp"
       data-title="GridDrawer.cs"
       data-description="CustomPropertyDrawer that allows painting grid cells with the mouse.">
  </div>

  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/CoordinateConverter.cs" 
       data-language="csharp"
       data-title="CoordinateConverter.cs"
       data-description="Strategy pattern handling World-to-Grid conversion, abstracting differences between vertical and horizontal layouts.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid1.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid1.mp4" autoplay loop muted playsinline></video>
            <figcaption>Grid editor</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid2.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid2.mp4" autoplay loop muted playsinline></video>
            <figcaption>Make the grid horizontal or vertical</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid3DifferantLevels.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid3DifferantLevels.mp4" autoplay loop muted playsinline></video>
            <figcaption>Level editor uses the grid to easily edit the layout</figcaption>
        </a>
    </figure>
</div>

### Firebase Integration

Implemented Firebase Analytics and Remote Config for live game tuning and behavior tracking on mobile platforms.

- Tracks level progression, player retention, and feature usage
- Enables real-time balance adjustments without app updates (screen shake intensity, haptic feedback, difficulty modifiers)

<div class="code-showcase">
  <div class="code-block" 
       data-file="/portfolio/assets/electro-grid/FirebaseManager.cs" 
       data-language="csharp"
       data-title="FirebaseManager.cs"
       data-description="Fetches Remote Config values with fallback defaults, and provides a clean API for logging custom analytics events.">
  </div>
</div>

<div class="showcase" data-layout="grid" data-columns="1">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/RemoteControl.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/electro-grid/RemoteControl.png" alt="Remote console">
            <figcaption>Remote console</figcaption>
        </a>
    </figure>
</div>


</div>

</div>