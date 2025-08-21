# Unity Assets

A collection of Unity tools and systems designed to accelerate development and streamline prototyping workflows. These assets provide modular, reusable solutions for common game development challenges, built with performance optimization in mind and featuring designer-friendly interfaces. Each system operates independently while providing clean integration points, comprehensive error handling, and extensible architecture that allows for easy customization. All systems include comprehensive XML documentation and follow Unity coding conventions, designed to work seamlessly together while maintaining independence for selective implementation in projects.

## Core Systems

### Controller Rumble System
A comprehensive haptic feedback system that provides precise controller vibration control with support for multiple simultaneous effects and custom intensity curves.

**Key Features:**
- Source-listener architecture allowing multiple objects to trigger rumble effects
- AnimationCurve-based intensity modulation for complex vibration patterns
- Built-in effect presets (fade in/out, pulse patterns)
- Automatic effect queuing and blending using maximum intensity algorithm
- Configurable frequency range clamping for accessibility
- Integration with Unity's Input System for seamless controller detection


### VFX & Transition Manager
A comprehensive visual effects system that manages post-processing effects, UI transitions, and scene loading with seamless visual continuity.

**Key Features:**
- Automatic post-processing volume setup and management
- Scriptable Object-based effect sequences for designer-friendly workflow
- Scene transition system with customizable visual effects
- Support for lens distortion, chromatic aberration, motion blur, and vignette effects
- Automatic cleanup and reset functionality
- Integration with PrimeTween for smooth animations


### Object Pooler
A high-performance object pooling system that eliminates runtime instantiation costs and reduces garbage collection overhead.

**Key Features:**
- Generic pooling system supporting any GameObject
- Automatic pool management with configurable size limits
- Pre-warming capabilities for optimal performance
- Support for IPooledObject interface for custom initialization/cleanup
- Scene persistence options with DontDestroyOnLoad support
- Fallback mechanisms for missing pools
- Editor debugging tools and runtime statistics


## Utility Tools

### Button Attribute
Custom inspector buttons that allow developers to execute methods directly from the Unity Inspector without entering Play mode. Features method execution with parameter support, customizable button appearance, play mode restrictions, and foldout interface for complex parameters with automatic validation and default value handling. Ideal for testing, debugging, content creation workflows, and designer tools.

### ChanceList\<T\>
A weighted random selection tool with built-in normalization and designer-friendly Inspector integration. Provides generic type support, automatic chance normalization ensuring total equals 100%, locking mechanism for fixed probability items, and support for both single and multiple item selection with custom property drawer controls. Perfect for loot tables, random events, procedural content generation, and AI decision-making.

### SceneField
A Scene reference tool that maintains valid scene connections and provides build setting validation. Features type-safe scene references in Inspector, automatic validation of scenes in build settings, runtime build index resolution, and support for scene loading/unloading operations with implicit conversion support. Essential for scene management, level selection, menu navigation, and progression flow.

### Audio Event Tool
A Scriptable Object-based audio solution that simplifies audio playback with randomization, 3D positioning, and object pooling integration. Features random clip selection from arrays, configurable audio source parameters, spatial audio settings, and automatic lifetime management through pooling. Includes custom Inspector with preview functionality for sound design workflows.

### ReadOnly Attribute
A simple property drawer attribute that makes Inspector fields non-editable while preserving their visibility. Supports all field types including arrays and complex objects, maintaining full Inspector functionality without allowing modifications. Perfect for debugging, runtime value display, and preventing accidental field changes.