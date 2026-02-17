---
thumbnail: /portfolio/assets/dnextensions/unitylogo.jpg
shortDescription: Rumble system featuring 3D spatial positioning and advanced effect management for precise controller vibration control.
tags: [tool, unity, pc, "2025", solo]
---
<div class="page-content">

# Controller Rumble

<div class="button-group horizontal">
    <a href="https://github.com/danielnoam/DNExtensions" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview
Initially developed for my Chicken Invaders Remake project, this system was expanded and designed to work easily with any other project.

- Source-listener architecture with automatic discovery and connection
- Manages multiple simultaneous effects, combining intensities per motor each frame
- Dynamic intensity modulation over time using independent animation curves for low and high frequency motors
- 3D spatial positioning with customizable distance-based falloff curves and scene view gizmos
- Built-in effect presets: fade in, fade out, pulse, and continuous — all triggerable from the Inspector via Button attributes
- Serializable `ControllerRumbleEffectSettings` for creating and reusing rumble presets in the Inspector
- Master frequency range clamping on the listener for global intensity control or accessibility options

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/dnextensions/ControllerRumbleEffect.cs"
       data-language="csharp"
       data-title="ControllerRumbleEffect.cs"
       data-description="Represents a single rumble effect. Supports both timed effects with animation curves and continuous effects that persist until stopped manually.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/dnextensions/ControllerRumbleSource.cs"
       data-language="csharp"
       data-title="ControllerRumbleSource.cs"
       data-description="Triggers rumble effects on connected listeners. Includes built-in presets for common patterns like fade in, fade out, and pulse.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/dnextensions/ControllerRumbleListener.cs"
       data-language="csharp"
       data-title="ControllerRumbleListener.cs"
       data-description="Receives and processes effects from connected sources, combining intensities and driving the gamepad motors each frame.">
  </div>
</div>

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleSources.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleSources.mp4" autoplay loop muted playsinline></video>
            <figcaption>Multiple sources</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ListenerAndSource.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/ListenerAndSource.png" alt="Listener and source">
            <figcaption>Listener and source</figcaption>
        </a>
    </figure>
</div>

</div>

</div>