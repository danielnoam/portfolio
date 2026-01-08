<div class="page-content">

# Editor Utilities

<p class="text-center">
    <a href="https://github.com/danielnoam/DNExtensions/">GitHub</a>
</p>

<div class="project-card">

## Overview
A collection of Unity editor tools and runtime utilities developed to streamline workflow and solve recurring development challenges. Each utility addresses specific pain points discovered across multiple projects, then refined into reusable, production-ready tools.

</div>


<div class="content-two-column no-sticky">

<div class="content-left">

<div class="project-card">

## Editor Tools

### Button Attribute
Inspector buttons that execute methods directly in the editor. Supports custom styling, play mode restrictions, parameter input, and grouping.

### InfoBox Attribute
Displays message boxes in the Inspector with customizable styling. Supports Info, Warning, Error, and Success types with spacing control.

### Preview Attribute
Shows thumbnail previews of sprites, textures, and prefabs below object fields. Customizable size, background color, and asset details.

### Separator Attribute
Creates visual separator lines in the Inspector with optional titles. Customizable spacing and title styling for organizing sections.

### Play From Camera
Teleports player to Scene View camera position on play via Tools menu or shortcut (Ctrl+Alt+Shift+P). Configurable player selection (tag or path), rotation matching, and CharacterController/Rigidbody handling.

### Audio Event
ScriptableObject-based audio system with randomization and spatial positioning. Random clip selection, volume/pitch ranges via RangedFloat, 3D sound controls, and object pooling integration.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/AudioEvent.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/AudioEvent.mp4" autoplay loop muted playsinline></video>
            <figcaption>Audio event</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" autoplay loop muted playsinline></video>
            <figcaption>Button Attribute</figcaption>
        </a>
    </figure>
</div>

</div>


</div>

<div class="content-right">

<div class="project-card">

## Serialization Utilities

### SceneField
Serializable scene reference with build settings validation and loading methods. Automatic validation, build index resolution, and visual status indicators.

### SortingLayerField
Serializable sorting layer references with Inspector dropdown and validation. Missing layer detection and implicit conversion to layer ID.

### Ranged Values
Serializable range types (RangedFloat/RangedInt) with min-max slider interface. Visual range display, random generation, mathematical operations (Lerp, Clamp, Contains), and customizable limits via MinMaxRangeAttribute.

### ChanceList
Weighted random selection with automatic normalization and designer-friendly interface. Generic type support, probability locking, and configurable single/multiple selection with duplicates.

<div class="image-gallery gallery-3-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" autoplay loop muted playsinline></video>
            <figcaption>Chance list</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Fields.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/Fields.mp4" autoplay loop muted playsinline></video>
            <figcaption>Custom fields</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" autoplay loop muted playsinline></video>
            <figcaption>Ranged values</figcaption>
        </a>
    </figure>
</div>


</div>


</div>

</div>

</div>