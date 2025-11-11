<div class="page-content">

# Controller Rumble


<img src="https://danielnoam.github.io/portfolio/assets/controllerlogo.jpg" alt="logo" class="page-logo">

<p class="text-center">
    <a href="https://github.com/danielnoam/DNExtensions/">GitHub</a>
</p>


<div class="project-card">

## Overview
Initially developed for my Chicken Invaders Remake project, this system was expanded and designed to work easily with any other project. 

It features 3D spatial positioning and advanced effect management for precise controller vibration control.

- Features a source-listener architecture with automatic connection and discovery.
- Manages and aggregates multiple simultaneous effects, applying only the strongest vibration value for each motor.
- Supports dynamic intensity modulation over time using custom curves for independent low and high-frequency motor control.
- Enables 3D spatial positioning for rumble sources, with customizable distance-based falloff and attenuation curves.
- Includes convenient built-in methods for common effects like fade-ins, fade-outs, and procedural pulses.
- Provides a serializable settings class for creating, customizing, and reusing rumble effect presets in the Inspector.
- Integrates with Unity's Input System to safely handle gamepad connections and control scheme changes.
- Offers master frequency range clamping on the listener, allowing for global rumble intensity control or accessibility options.
- Includes specific support for DualShock controller features, such as controlling the light bar color.
- Allows for easy in-editor testing of rumble effects directly from the source component's Inspector.



</div>
</div>