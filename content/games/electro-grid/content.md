---
thumbnail: /portfolio/assets/electro-grid/main.mp4
shortDescription: Match-3 mobile puzzle game with power-ups and various objectives.
tags: [games, unity, mobile, web-gl, "2025", pc, solo, featured]
---
<div class="page-content">

# Electro Grid

<video src="https://danielnoam.github.io/portfolio/assets/electro-grid/main.mp4" class="page-logo" autoplay loop muted playsinline aria-label="Electro Grid">
</video>

<p class="featured-caption">Solo · Unity C# · Android, PC, WebGL · one month</p>

<div class="button-group horizontal">
    <a href="https://danielnoam.itch.io/electro-grid" target="_blank" class="button">Itch.io</a>
    <a href="https://github.com/danielnoam/ElectroGrid" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview

A match-3 puzzle game made solo in one month as my fifth-semester project, built for mobile first and shipped on Android, PC and WebGL. Levels run on non-rectangular grids with objectives, blockers and loss conditions that change the pacing.



</div>

<div class="project-card">

## Grid editor

Grid shapes are data assets painted in a custom inspector, with click-and-drag, symmetry and bulk edits. The same asset drives the board, the background and the level preview, and a converter maps grid cells to world space for vertical or horizontal layouts.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/Grid.cs"
       data-language="csharp"
       data-title="Grid.cs"
       data-description="The grid asset: a flattened array of cells.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/GridDrawer.cs"
       data-language="csharp"
       data-title="GridDrawer.cs"
       data-description="The inspector that paints cells with the mouse.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/CoordinateConverter.cs"
       data-language="csharp"
       data-title="CoordinateConverter.cs"
       data-description="Grid cells to world space, for vertical and horizontal layouts.">
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
            <figcaption>Horizontal or vertical layout</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid3DifferantLevels.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/Grid3DifferantLevels.mp4" autoplay loop muted playsinline></video>
            <figcaption>Level editor on top of the grid</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Objectives and pieces

Objectives are small classes on one event-driven base, so a level can ask for a collection quota, an escort to the bottom row, or a score target without special cases. Square stars, double stars, plus pieces and line breaks each add one rule to the board.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/Match3Objective.cs"
       data-language="csharp"
       data-title="Match3Objective.cs"
       data-description="The base every objective builds on.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/GetSpecificItemMatches.cs"
       data-language="csharp"
       data-title="GetSpecificItemMatches.cs"
       data-description="One objective: count matches of a given piece.">
  </div>
</div>

<div class="showcase portrait-grid" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayMatching.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayMatching.mp4" autoplay loop muted playsinline></video>
            <figcaption>Matching</figcaption>
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
            <figcaption>Line break</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayDoubleStar.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/electro-grid/GameplayDoubleStar.mp4" autoplay loop muted playsinline></video>
            <figcaption>Double star blocker</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Game feel

One screen-shake system, a VFX system that sequences particles and post-processing, and Android haptics with distinct patterns for UI ticks and gameplay hits. Menus transition through a single manager keyed by screen type.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/MenuManager.cs"
       data-language="csharp"
       data-title="MenuManager.cs"
       data-description="Screen transitions keyed by screen type.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/LevelSelectionScreen.cs"
       data-language="csharp"
       data-title="LevelSelectionScreen.cs"
       data-description="Builds the level preview from the grid asset.">
  </div>
</div>

<div class="showcase portrait-grid" data-layout="grid">
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

</div>

<div class="project-card">

## Live tuning

Firebase Analytics tracks level progression and retention; Remote Config changes difficulty, shake intensity and haptics without an app update.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/electro-grid/FirebaseManager.cs"
       data-language="csharp"
       data-title="FirebaseManager.cs"
       data-description="Remote Config with fallback defaults, and custom analytics events.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/electro-grid/RemoteControl.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/electro-grid/RemoteControl.png" alt="Remote console">
            <figcaption>Remote console</figcaption>
        </a>
    </figure>
</div>

</div>

</div>
