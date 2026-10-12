---
thumbnail: /portfolio/assets/chicken-invaders-remake/Cover.png
shortDescription: Remake to the old chicken invaders reimagined as third person rail shooter.
tags: [games, unity, pc, "2025", team, featured]
---
<div class="page-content">

# Chicken Invaders Remake

<img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/Cover.png" alt="Chicken Invaders Remake" class="page-logo">

<p class="featured-caption">Programmer · team of 5 · Unity C# · PC + gamepad</p>

<div class="button-group horizontal">
    <a href="https://tay-dev.itch.io/chicken-invaders-remake" target="_blank" class="button">Itch.io</a>
    <a href="https://github.com/danielnoam/ProjectChicken" target="_blank" class="button">Github</a>
    <a href="https://docs.google.com/document/d/15oJfTMVTdB9uJKfskemjhVx1XfsIAPWvOurxZK-_GJw/edit?usp=sharing" target="_blank" class="button">GDD</a>
    <a href="https://youtu.be/kjTa3ECVQwo" target="_blank" class="button">Intro</a>
</div>

<div class="project-card">

## Overview

A third-person rail shooter remake of Chicken Invaders, made in a fourth-semester team of five. I was one of two programmers and built the player, weapons, levels, UI, shop, save system, audio, controller support and the team's editor tools.

</div>

<div class="project-card">

## Data-driven weapons

Each weapon is a ScriptableObject listing its behaviors: how the projectile moves, what it does on hit, how it targets. A new weapon is a new asset, not new code.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/SOWeaponData.cs"
       data-language="csharp"
       data-title="SOWeaponData.cs"
       data-description="The weapon asset: stats plus a list of behaviors.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/ProjectileBehaviorBase.cs"
       data-language="csharp"
       data-title="ProjectileBehaviorBase.cs"
       data-description="The hooks every behavior implements: spawn, move, collision.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/PlayerProjectile.cs"
       data-language="csharp"
       data-title="PlayerProjectile.cs"
       data-description="The runtime projectile, running the behaviors its asset lists.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/WeaponsGif.gif" alt="Weapons">
            <figcaption>Different weapon behaviors</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/reticle.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/reticle.gif" alt="Reticle">
            <figcaption>Reticle size, spread and heat</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsSO.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsSO.png" alt="Weapon scriptable object">
            <figcaption>A weapon asset in the inspector</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Stage events

A level is a list of stage events: spawn a wave, drop resources, play a radio message, wait. A bridge component exposes any event as a UnityEvent, so the team wired animations and UI to level progress in the inspector.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/StageEvent.cs"
       data-language="csharp"
       data-title="StageEvent.cs"
       data-description="Base class for every level event; the level manager runs them through one interface.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/SpawnEnemyEvent.cs"
       data-language="csharp"
       data-title="SpawnEnemyEvent.cs"
       data-description="One event: wave logic, spawn intervals and pool references for a stage.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/StageSubscriber.cs"
       data-language="csharp"
       data-title="StageSubscriber.cs"
       data-description="The bridge from stage events to UnityEvents, so designers wire scene logic in the inspector.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/solevel.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/solevel.png" alt="Level asset">
            <figcaption>Level settings</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/SOStage.png" alt="Stage asset">
            <figcaption>Stage settings</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/stagesub.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/stagesub.png" alt="Stage subscriber">
            <figcaption>Stage subscriber component</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObstaclesStageGif.gif" alt="Obstacles stage">
            <figcaption>Obstacles the player has to dodge</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Reactive HUD

The HUD tilts with input, shakes on hits and changes color by damage type, so it reads as part of the cockpit. The progression bar fits any number of stages and animates between them.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/HUDManager.cs"
       data-language="csharp"
       data-title="HUDManager.cs"
       data-description="Tilts the HUD with input and runs the health and shield feedback tweens.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/StageProgressionBar.cs"
       data-language="csharp"
       data-title="StageProgressionBar.cs"
       data-description="Sizes and spaces the stage icons so any number of stages fit the bar.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/statusbar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/statusbar.gif" alt="Status bar">
            <figcaption>Status bar reacts to movement and hits</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsbar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/weaponsbar.gif" alt="Weapons bar">
            <figcaption>Weapon and dodge bar</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/levelProgressionBar.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/levelProgressionBar.gif" alt="Level progression bar">
            <figcaption>Stage progression bar and objectives</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenu.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/MainMenu.mp4" autoplay loop muted playsinline></video>
            <figcaption>Diegetic main menu</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Spatial controller rumble

Each vibration source has a position and a falloff, and a listener on the player mixes all active sources into one motor output. Button prompts follow whichever device is active.

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/ControllerVibrationListener.cs"
       data-language="csharp"
       data-title="ControllerVibrationListener.cs"
       data-description="Mixes every active vibration source into one motor output.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/chicken-invaders-remake/ControllerVibrationSource.cs"
       data-language="csharp"
       data-title="ControllerVibrationSource.cs"
       data-description="A source with a position and a falloff by distance to the player.">
  </div>
</div>

<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerrumble.png" alt="Controller rumble settings">
            <figcaption>Rumble source settings</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerUI.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/controllerUI.gif" alt="Button prompts">
            <figcaption>Button prompts follow the active device</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Also

- Cinemachine camera rigs for intro, gameplay, shop and outro, plus a configurable shake system
- Upgrade shop with currency, prerequisites and stack limits, all as ScriptableObjects
- Object pooling with pre-warming for projectiles, enemies, audio and VFX
- Save system for progress, settings and session state, including ScriptableObject references
- Audio events that randomize clip, pitch and volume; music manager with cross-fades per stage
- Dither boundary shader, intro and credits sequences in Timeline, story and dialogue

</div>

<div class="project-card">

## Gallery

<div class="showcase" data-layout="grid">
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
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/intro.mp4" autoplay loop muted playsinline></video>
            <figcaption>Intro sequence (Timeline)</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/StoreGif.gif" alt="Upgrade store">
            <figcaption>Upgrade store</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boundaryshader.gif" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/boundaryshader.gif" alt="Boundary shader">
            <figcaption>Boundary dither shader</figcaption>
        </a>
    </figure>
</div>

</div>

</div>
