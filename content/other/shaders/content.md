<div class="page-content">

# Shaders

<p class="text-center">
    <a href="https://github.com/danielnoam/DNExtensions/">GitHub</a>
</p>

<div class="project-card">

## Dither Distance Fade

A Shader Graph implementation that creates distance-based transparency using dithering. The shader dynamically fades objects based on their proximity to a reference transform, camera, or world position.

<div class="image-gallery gallery-3-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/Dither.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/Dither.mp4" autoplay loop muted playsinline></video>
            <figcaption>Dither effect demonstration</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/DitherChicken.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/DitherChicken.mp4" autoplay loop muted playsinline></video>
            <figcaption>Player boundary in Chicken Invaders</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/DitherUMN.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/DitherUMN.mp4" autoplay loop muted playsinline></video>
            <figcaption>Puzzle mechanic in Project UMN</figcaption>
        </a>
    </figure>
</div>

## Fullscreen CRT Effect

A fullscreen post-processing shader that replicates the visual characteristics of CRT displays. Built entirely in Shader Graph, the effect combines scanlines, chromatic aberration, noise, and screen wobble to create a retro display aesthetic.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CRT.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/CRT.mp4" autoplay loop muted playsinline></video>
            <figcaption>CRT effect demonstration</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CRTElectro.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/CRTElectro.mp4" autoplay loop muted playsinline></video>
            <figcaption>Used in Electro Grid</figcaption>
        </a>
    </figure>
</div>


## Dissolve Effect

A versatile dissolve shader featuring customizable edge effects and animated noise patterns. Supports directional control, adjustable edge width and color, and time-based noise animation for dynamic dissolve transitions.

<div class="image-gallery gallery-1-column">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/Dissolve.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/Dissolve.mp4" autoplay loop muted playsinline></video>
            <figcaption>Dissolve effect with edge glow</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/DissolveRobot.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/shaders/DissolveRobot.mp4" autoplay loop muted playsinline></video>
            <figcaption>Robot model from Project UMN</figcaption>
        </a>
    </figure>
</div>


## Canvas Effects

A multipurpose shader providing various real-time image effects through a unified interface. Useful for UI feedback, damage states, and drawing player attention to interactive elements.

Ripple Effect - Animated water-like distortions emanating from a point
Pixelation - Dynamic pixel grid scaling for retro aesthetics or censoring
Distortion - Warping effects for heat haze, portals, or magic
Contrast - Real-time contrast adjustment for emphasis or fading
Rainbow - Color cycling for power-ups or special states
Dissolve - Texture-based fade transitions
Line Sparkle - Animated highlight sweep that draws attention to UI elements like buttons

<div class="image-gallery gallery-3-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasRipple.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasRipple.png" alt="Ripple effect">
            <figcaption>Ripple effect</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasPixelation.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasPixelation.png" alt="Pixelation effect">
            <figcaption>Pixelation effect</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasDistortion.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasDistortion.png" alt="Distortion effect">
            <figcaption>Distortion effect</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasContrast.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasContrast.png" alt="Contrast adjustment">
            <figcaption>Contrast adjustment</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasRainbow.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasRainbow.png" alt="Rainbow effect">
            <figcaption>Rainbow effect</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/CanvasLineSparkle.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/CanvasLineSparkle.png" alt="Line sparkle">
            <figcaption>Line sparkle</figcaption>
        </a>
    </figure>
</div>

## Fullscreen Vignette

A post-processing vignette effect with customizable color tinting and noise texture support for environmental storytelling (fire, frost, poison, etc.).
Includes a breathing animation that pulses the effect intensity for dynamic feedback.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/VignetteBasic.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/VignetteBasic.png" alt="Vignette with color tint">
            <figcaption>Vignette with color tint</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/VignetteNoise.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/VignetteNoise.png" alt="Noise texture effects">
            <figcaption>Noise texture for fire/frost effects</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/shaders/VignetteBreathing.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/shaders/VignetteBreathing.png" alt="Breathing animation">
            <figcaption>Breathing pulse animation</figcaption>
        </a>
    </figure>
</div>


</div>

</div>