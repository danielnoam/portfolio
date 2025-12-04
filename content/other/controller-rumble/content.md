<div class="page-content">

# Controller Rumble

<p class="text-center">
    <a href="https://github.com/danielnoam/DNExtensions/">GitHub</a>
</p>

<div class="project-card">


## Overview
Initially developed for my Chicken Invaders Remake project, this system was expanded and designed to work easily with any other project.

It features 3D spatial positioning and advanced effect management for precise controller vibration control.

- Features a source-listener architecture with automatic connection and discovery.
- Manages and aggregates multiple simultaneous effects, applying only the one atop the other for each motor.
- Supports dynamic intensity modulation over time using custom curves for independent low and high-frequency motor control.
- Enables 3D spatial positioning for rumble sources, with customizable distance-based falloff and attenuation curves.
- Includes convenient built-in methods for common effects like fade-ins, fade-outs, and procedural pulses.
- Provides a serializable settings class for creating, customizing, and reusing rumble effect presets in the Inspector.
- Offers master frequency range clamping on the listener, allowing for global rumble intensity control or accessibility options.


<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleSources.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleSources.mp4" autoplay loop muted playsinline></video>
            <figcaption>Multiple sources</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ListenerAndSource.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/ListenerAndSource.jpg" alt="Listener and source">
            <figcaption>Listener and source</figcaption>
        </a>
    </figure>
</div>
</div>

</div>
