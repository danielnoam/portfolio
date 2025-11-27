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

### Conditional Attributes
Show/hide or enable/disable fields based on other field values. Includes ShowIf, HideIf, EnableIf, DisableIf with boolean, enum, and value comparison support.

### InfoBox Attribute
Displays message boxes in the Inspector with customizable styling. Supports Info, Warning, Error, and Success types with spacing control.

### Preview Attribute
Shows thumbnail previews of sprites, textures, and prefabs below object fields. Customizable size, background color, and asset details.

### ReadOnly Attribute
Makes fields non-editable in the Inspector while keeping them serialized and visible. Supports all field types including arrays and complex objects.

### Separator Attribute
Creates visual separator lines in the Inspector with optional titles. Customizable spacing and title styling for organizing sections.

### Play From Camera
Teleports player to Scene View camera position on play via Tools menu or shortcut (Ctrl+Alt+Shift+P). Configurable player selection (tag or path), rotation matching, and CharacterController/Rigidbody handling.

### Audio Event
ScriptableObject-based audio system with randomization and spatial positioning. Random clip selection, volume/pitch ranges via RangedFloat, 3D sound controls, and object pooling integration.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Button Attribute">
            <figcaption>Button Attribute</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Conditional Attributes">
            <figcaption>Conditional Attributes</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="InfoBox">
            <figcaption>InfoBox</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Preview Attribute">
            <figcaption>Preview Attribute</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="ReadOnly">
            <figcaption>ReadOnly</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Separator">
            <figcaption>Separator</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Play From Camera">
            <figcaption>Play From Camera</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Audio Event">
            <figcaption>Audio Event</figcaption>
        </a>
    </figure>
</div>

</div>


</div>

<div class="content-right">

<div class="project-card">

## Serialization Utilities

### Interface References
Type-safe interface references with automatic validation. InterfaceReference provides generic serialization with conversion operators, RequireInterface enforces interface implementation with visual feedback.

### SceneField
Serializable scene reference with build settings validation and loading methods. Automatic validation, build index resolution, and visual status indicators.

### SortingLayerField
Serializable sorting layer references with Inspector dropdown and validation. Missing layer detection and implicit conversion to layer ID.

### Ranged Values
Serializable range types (RangedFloat/RangedInt) with min-max slider interface. Visual range display, random generation, mathematical operations (Lerp, Clamp, Contains), and customizable limits via MinMaxRangeAttribute.

### ChanceList
Weighted random selection with automatic normalization and designer-friendly interface. Generic type support, probability locking, and configurable single/multiple selection with duplicates.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="InterfaceReference">
            <figcaption>InterfaceReference</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="SceneField">
            <figcaption>SceneField</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="SortingLayerField">
            <figcaption>SortingLayerField</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="RangedFloat">
            <figcaption>RangedFloat</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="ChanceList">
            <figcaption>ChanceList</figcaption>
        </a>
    </figure>
</div>


</div>


<div class="project-card">

## Cinemachine Extensions

### Impulse Source Extensions
Extension methods for CinemachineImpulseSource with ScriptableObject-style configurations. Customizable impulse shapes, duration, intensity, and spatial propagation.

### Rotation Offset Extension
Cinemachine extension for additional rotation offsets at the Aim stage. Runtime modification support with additive adjustments and pipeline integration.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Impulse Extensions">
            <figcaption>Impulse Extensions</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Rotation Offset">
            <figcaption>Rotation Offset</figcaption>
        </a>
    </figure>
</div>

</div>

</div>

</div>

</div>