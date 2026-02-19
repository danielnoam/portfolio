---
thumbnail: /portfolio/assets/dnextensions/unitylogo.jpg
shortDescription: A collection of Unity editor tools, inspector utilities, and serialization systems built to reduce friction and improve workflow across projects.
tags: [tool, unity, pc, "2025", solo, featured]
---
<div class="page-content">

# Editor Utilities

<div class="button-group horizontal">
    <a href="https://github.com/danielnoam/DNExtensions" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview
A collection of Unity editor tools, inspector utilities, and serialization systems built to reduce friction and improve workflow across projects. 

Includes an extensive collection of extension methods for Unity types (Vector2/3, Transform, GameObject, Rigidbody, Color, Camera, String, List and more), serializable field types like SceneField and RangedFloat/RangedInt, Inspector attributes (InfoBox, ReadOnly, Separator, Preview, Foldout, and conditional ShowIf/HideIf/EnableIf/DisableIf), and smaller utilities like Component Dragger, Audio Preview, Better Unity Event, Note Component, and Toolbar Extensions (timescale control, reload assembly, and project shortcut buttons).

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" autoplay loop muted playsinline></video>
            <figcaption>Ranged values</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/CustomField.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/CustomField.png" alt="Custom fields">
            <figcaption>Custom fields</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/TimeScaleToolbar.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/TimeScaleToolbar.png" alt="Timescale in toolbar">
            <figcaption>Timescale in toolbar</figcaption>
        </a>
    </figure>
</div>

</div>


<div class="content-two-column no-sticky">

<div class="content-left">

<div class="project-card">

## Editor Tools

### Button Attribute & ComponentHeaderButton
Inspector buttons that execute methods with a single click. Supports play mode restrictions, custom height, spacing, and color per button. Project-wide defaults are configurable via Project Settings, with per-button overrides. ComponentHeaderButton adds the same functionality at the component header level.

### Play From Camera
Inspired by Unreal Engine's Play From Here feature. Teleports the player to the Scene View camera position on play. Configurable player selection by tag or path, rotation matching, and handles both CharacterController and Rigidbody. Accessible via toolbar button or shortcut (Ctrl+Alt+Shift+P).

### Save In Play Mode
Saves changes made to components during play mode so they persist after exiting. Uses ComponentHeaderButton for quick access directly from the component header.

### Better Transform Editor
Enhanced transform component with reset buttons for individual position, rotation, and scale axes, copy/paste transform values, and snap to grid functionality.

### ScriptableObject Editor
A custom editor window for managing all ScriptableObject assets in the project by type. Supports multi-selection, inline Inspector editing, single and bulk rename with index pattern support, find references across scenes and prefabs, create/duplicate/delete with undo support, name filtering, and persists the last selected type between sessions.

<div class="image-gallery gallery-2-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" autoplay loop muted playsinline></video>
            <figcaption>Button Attribute</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/SOEditor.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/SOEditor.mp4" autoplay loop muted playsinline></video>
            <figcaption>ScriptableObject Editor</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/PlayFromCamera.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/PlayFromCamera.mp4" autoplay loop muted playsinline></video>
            <figcaption>Play From Camera</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/SaveInPlayMode.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/SaveInPlayMode.mp4" autoplay loop muted playsinline></video>
            <figcaption>Save In Play Mode</figcaption>
        </a>
    </figure>
</div>

</div>

</div>

<div class="content-right">

<div class="project-card">

## Serialization & Inspector Fields

### ChanceList
Weighted random selection list with automatic probability normalization. Supports generic types, probability locking, and configurable single or multiple selection with duplicates.

### OptionalField&lt;T&gt;
A serializable wrapper for optional values, similar to C# Nullable. Lets designers toggle fields on or off without requiring code changes, making components more flexible and team-friendly.

### Inline Attribute
Renders a referenced ScriptableObject's properties directly inline in the Inspector without opening a separate editor window. Includes a bordered box for visual clarity and caches SerializedObject instances per property path for performance.

### PrefabSelector / SOSelector
Asset reference fields that filter the selection picker to a specific project folder. Reduces human error by limiting what designers can assign, and supports locking to the specified folder only.

### Serializable Selector
Polymorphic serialization with a dropdown selector for choosing between derived types directly in the Inspector. Supports custom display names, tooltips, categories, and restricting a type to a single instance per list.

### Serialized Interface
Serialize interface references in the Inspector without losing type safety. Supports both a generic InterfaceReference wrapper and a RequireInterface attribute for MonoBehaviour fields.

### AutoGet
Automatically populates serialized component references using attributes (AutoGetSelf, AutoGetChildren, AutoGetParent, AutoGetScene, AutoGetAsset), eliminating manual drag-and-drop. Configurable via Project Settings with trigger options (on selection, on scene save), prefab support, reflection caching, and bulk populate actions for selected objects or entire scenes. Each field shows a refresh button in the Inspector for manual repopulation.

<div class="image-gallery gallery-3-columns">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" autoplay loop muted playsinline></video>
            <figcaption>Chance list</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Inline.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/Inline.mp4" autoplay loop muted playsinline></video>
            <figcaption>Inline Attribute</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/AutoGet.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/AutoGet.mp4" autoplay loop muted playsinline></video>
            <figcaption>AutoGet</figcaption>
        </a>
    </figure>
</div>

</div>

</div>

</div>

</div>