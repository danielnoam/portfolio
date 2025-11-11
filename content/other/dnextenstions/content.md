<div class="page-content">

# DNExtensions


<img src="https://danielnoam.github.io/portfolio/assets/unitylogo.jpg" alt="Intro">

<p class="text-center">
    <a href="https://github.com/danielnoam/DNExtensions/">GitHub</a>
</p>

<div class="project-card">

## Overview

A collection of Unity tools developed organically while working on various projects. 
Each tool was created to solve specific problems, then refined and expanded as new needs emerged across different games and prototypes.



</div>


<div class="project-card">

## Controller Rumble System
A comprehensive haptic feedback system with 3D spatial positioning and advanced effect management for precise controller vibration control.

- Source-listener architecture for multiple simultaneous effects
- AnimationCurve-based intensity modulation for complex patterns
- 3D spatial positioning with distance attenuation
- Built-in presets: fade in/out, pulse patterns, custom curves
- Configurable frequency range clamping for accessibility


## VFX & Transition System
Visual effects system managing post-processing, UI transitions, and scene loading with seamless continuity.

- Automatic post-processing volume setup and management
- Scriptable Object-based effect sequences for designers
- Scene transition system with customizable visual effects
- Support for post-processing and UI effects
- Automatic cleanup and reset functionality
- PrimeTween integration for smooth animations


## Object Pooling System
High-performance pooling system eliminating instantiation costs and reducing garbage collection overhead.

- Generic pooling system supporting any GameObject
- Automatic pool management with configurable size limits
- Pre-warming capabilities for optimal performance
- Support for IPooledObject interface for custom initialization
- Scene persistence options with DontDestroyOnLoad support
- Fallback mechanisms for missing pools

</div>



<div class="project-card">

## Utility Tools

### ChanceList
Weighted random selection tool with built-in normalization and designer-friendly Inspector integration. Features generic type support, automatic chance normalization, locking mechanism for fixed probabilities, and support for single/multiple item selection.

### Audio Event
Scriptable Object-based audio solution simplifying audio playback with randomization and 3D positioning. Features random clip selection, configurable audio parameters, spatial audio settings, and automatic lifetime management through pooling integration.

### SceneField
Scene reference tool maintaining valid scene connections with build setting validation. Features type-safe scene references, automatic build settings validation, runtime build index resolution, and scene loading/unloading operations. Essential for scene management and level progression.

### Sorting Layer Field
Serializable sorting layer references with Inspector dropdown and validation. Features automatic layer ID synchronization, missing layer detection, and direct integration with Unity's rendering system. Simplifies sorting layer management across components.

### Ranged Values
Serializable range types (RangedFloat/RangedInt) with custom Inspector min-max sliders and utility methods. Features visual range display, constraint validation, random value generation, and mathematical operations. Perfect for damage ranges, spawn intervals, and configurable parameters.

### Interface References
Type-safe interface references in Unity Inspector with automatic validation and component detection. Features generic interface constraints, GameObject component scanning, and seamless conversion operators. Essential for decoupled architecture and dependency injection.

### Button Attribute
Custom inspector buttons executing methods directly from Unity Inspector. Features method execution with parameters, customizable appearance, play mode restrictions, and foldout interface for complex parameters. Ideal for testing, debugging, and designer tools.

### ReadOnly Attribute
Property drawer attribute making Inspector fields non-editable while preserving visibility. Supports all field types including arrays and complex objects, maintaining full Inspector functionality without modifications. Perfect for debugging and runtime value display.

### Conditional Attributes
Inspector field visibility and interaction controls based on other field values. Features ShowIf/HideIf for dynamic layouts, EnableIf/DisableIf for conditional interaction, and support for boolean, enum, and custom value comparisons.

</div>

</div>