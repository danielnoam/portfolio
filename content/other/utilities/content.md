---
thumbnail: /portfolio/assets/dnextensions/unitylogo.jpg
shortDescription: A collection of Unity editor tools, inspector utilities, and serialization systems built to reduce friction and improve workflow across projects.
tags: [tool, unity, pc, "2025", solo, featured]
---
<div class="page-content">

# DNExtensions

<div class="button-group horizontal">
    <a href="https://github.com/danielnoam/DNExtensions" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview
A collection of Unity editor tools, inspector utilities, and serialization systems built to reduce friction and improve workflow across projects. 

Includes an extensive collection of extension methods for Unity types (Vector2/3, Transform, GameObject, Rigidbody, Color, Camera, String, List and more),
serializable field types like SceneField and RangedFloat/RangedInt, Inspector attributes (InfoBox, ReadOnly, Separator, Preview, and conditional ShowIf/HideIf/EnableIf/DisableIf), 
and smaller utilities like Component Dragger, Audio Preview,  Better Transform Editor, Better Unity Event, and Toolbar Extensions (timescale control, reload assembly, and project shortcut buttons).

<div class="showcase" data-layout="grid" data-columns="2">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/RangedValues.mp4" autoplay loop muted playsinline></video>
            <figcaption>Ranged Values</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/CustomField.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/CustomField.png" alt="Custom fields">
            <figcaption>Custom Fields</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/TimeScaleToolbar.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/TimeScaleToolbar.png" alt="Timescale in toolbar">
            <figcaption>Timescale Toolbar</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/BetterTransform.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/BetterTransform.png" alt="Better transform">
            <figcaption>Better Transform</figcaption>
        </a>
    </figure>
</div>

</div>


<div class="content-two-column no-sticky">

<div class="content-left">

<div class="project-card">

## Editor Tools

### Save In Play Mode
Saves changes made to components during play mode so they persist after exiting. Uses ComponentHeaderButton for quick access directly from the component header.

### Play From Camera
Inspired by Unreal Engine's Play From Here feature. Teleports the player to the Scene View camera position on play. Configurable player selection by tag or path, rotation matching, and handles both CharacterController and Rigidbody. Accessible via toolbar button or shortcut (Ctrl+Alt+Shift+P).

### ScriptableObject Editor
A custom editor window for managing all ScriptableObject assets in the project by type. Supports multi-selection, inline Inspector editing, single and bulk rename with index pattern support, find references across scenes and prefabs, create/duplicate/delete with undo support, name filtering, and persists the last selected type between sessions.

### Button Attribute
Inspector buttons that execute methods with a single click. Supports play mode restrictions, custom height, spacing, and color per button. 
Project-wide defaults are configurable via Project Settings, with per-button overrides.


<div class="showcase" data-layout="grid" data-columns="2">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ScriptableEditorWindow.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/ScriptableEditorWindow.mp4" autoplay loop muted playsinline></video>
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
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/Button.mp4" autoplay loop muted playsinline></video>
            <figcaption>Button Attribute</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Object Pooling
High-performance pooling system eliminating instantiation costs and reducing garbage collection overhead. Configured via a ScriptableObject settings asset and initializes automatically before scene load with no manual setup required.

- Generic pooling system supporting any GameObject, with per-pool max size, pre-warming, and scene-specific pre-warming
- Optional hierarchy organization, hidden pool holders, DontDestroyOnLoad, and configurable fallback behavior when no pool is found
- `IPoolable` interface with `OnPoolGet`, `OnPoolReturn`, and `OnPoolRecycle` callbacks for custom initialization logic
- Built-in poolable components: `PoolableParticleSystem`, `PoolableAudioSource`, and `PoolableAutoReturn`
- Simple static API with generic versions for direct component access
- Runtime Inspector showing live active and inactive counts per pool

<div class="code-showcase">
  <div class="code-block"
       data-file="/portfolio/assets/dnextensions/PoolableParticleSystem.cs"
       data-language="csharp"
       data-title="PoolableParticleSystem.cs"
       data-description="Built-in poolable component for particle systems. Automatically calculates duration from particle settings and returns itself to the pool when done.">
  </div>
  <div class="code-block"
       data-file="/portfolio/assets/dnextensions/ObjectPooler.cs"
       data-language="csharp"
       data-title="ObjectPooler.cs"
       data-description="The main pooling manager. Initialized once via settings asset, then accessible anywhere through a simple static API.">
  </div>
</div>

<div class="showcase" data-layout="grid" data-columns="2">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPooling.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPooling.mp4" autoplay loop muted playsinline></video>
            <figcaption>Object pooling</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPooling.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/chicken-invaders-remake/ObjectPooling.mp4" autoplay loop muted playsinline></video>
            <figcaption>Used in Chicken Invaders</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPoolerSettings.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPoolerSettings.png" alt="Object pooler settings">
            <figcaption>Object pooler settings</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPoolerRuntime.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/ObjectPoolerRuntime.png" alt="Object pooler runtime">
            <figcaption>Object pooler runtime</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## VFX &amp; Transitions
Visual effects system managing post-processing, UI transitions, and scene loading with seamless continuity.

- Scriptable Object-based effect sequences for designers (Add/Remove effects, Set durations, etc.)
- Scene transition system with customizable visual effects (TransitionManager.TranisitionToScene("SceneName", OutEffect, InEffect))
- Playing effects using a centralized manager (VFXManager.Instance.PlayEffect(SOEffect))
- Support for post-processing and UI effects
- Automatic post-processing volume setup and management
- Automatic cleanup and reset functionality


<div class="showcase" data-layout="grid">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleEffects.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/MultipleEffects.mp4" autoplay loop muted playsinline></video>
            <figcaption>Pre-built effect sequences</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/TransitioningAndUsingEffect.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/TransitioningAndUsingEffect.mp4" autoplay loop muted playsinline></video>
            <figcaption>Transition between scenes using sequences</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/PostProccesEffects.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/PostProccesEffects.mp4" autoplay loop muted playsinline></video>
            <figcaption>Used in Electro Grid</figcaption>
        </a>
    </figure>
</div>

</div>

</div>

<div class="content-right">

<div class="project-card">

## Inspector & Serialization

### AutoGet
Automatically populates serialized component references using attributes (AutoGetSelf, AutoGetChildren, AutoGetParent, AutoGetScene, AutoGetAsset), eliminating manual drag-and-drop.
Configurable via Project Settings with trigger options (on selection, on scene save), prefab support, reflection caching, and bulk populate actions for selected objects or entire scenes.
Each field shows a refresh button in the Inspector for manual repopulation.

### Serialized Interface
Serialize interface references in the Inspector without losing type safety. Supports both a generic InterfaceReference wrapper and a RequireInterface attribute for MonoBehaviour fields.

### Serializable Selector
Polymorphic serialization with a dropdown selector for choosing between derived types directly in the Inspector. Supports custom display names, tooltips, categories, and restricting a type to a single instance per list.

### PrefabSelector / SOSelector
Asset reference fields that filter the selection picker to a specific project folder. Reduces human error by limiting what designers can assign, and supports locking to the specified folder only.

### Inline Attribute
Renders a referenced ScriptableObject's properties directly inline in the Inspector without opening a separate editor window. Includes a bordered box for visual clarity and caches SerializedObject instances per property path for performance.

### ChanceList
Weighted random selection list with automatic probability normalization. Supports generic types, probability locking, and configurable single or multiple selection with duplicates.



<div class="showcase" data-layout="grid" data-columns="2">
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" target="_blank">
            <video src="https://danielnoam.github.io/portfolio/assets/dnextensions/ChanceList.mp4" autoplay loop muted playsinline></video>
            <figcaption>Chance List</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/Inline.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/Inline.png" alt="Inline">
            <figcaption>Inline Attribute</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/AutoGetSettings.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/AutoGetSettings.png" alt="Auto get settings window">
            <figcaption>Auto Get settings window</figcaption>
        </a>
    </figure>
    <figure>
        <a href="https://danielnoam.github.io/portfolio/assets/dnextensions/PrefabSelector.png" target="_blank">
            <img src="https://danielnoam.github.io/portfolio/assets/dnextensions/PrefabSelector.png" alt="Prefab selector">
            <figcaption>Prefab Selector</figcaption>
        </a>
    </figure>
</div>

</div>

<div class="project-card">

## Controller Rumble
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

<div class="showcase" data-layout="grid" data-columns="2">
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

</div>

</div>
