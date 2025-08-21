# Unity Assets

A collection of Unity tools and systems designed to accelerate development and streamline prototyping workflows. These assets provide modular, reusable solutions for common game development challenges.

Each system operates independently while providing clean integration points, and extensible architecture that allows for easy customization.

All systems include comprehensive XML documentation and follow Unity coding conventions, designed to work seamlessly together while maintaining independence for selective implementation in projects.

## Core Systems

### VFX & Transition Manager
A comprehensive visual effects system that manages post-processing effects, UI transitions, and scene loading with seamless visual continuity.

**Key Features:**
- Automatic post-processing volume setup and management
- Scriptable Object-based effect sequences for designer-friendly workflow
- Scene transition system with customizable visual effects
- Support for lens distortion, chromatic aberration, motion blur, and vignette effects
- Automatic cleanup and reset functionality
- Integration with PrimeTween for smooth animations

**Use Cases:** Scene transitions, game state changes, dramatic effects, loading screens

### Object Pooler
A high-performance object pooling system that eliminates runtime instantiation costs and reduces garbage collection overhead.

**Key Features:**
- Generic pooling system supporting any GameObject
- Automatic pool management with configurable size limits
- Pre-warming capabilities for optimal performance
- Support for IPooledObject interface for custom initialization/cleanup
- AutoReturnToPool component for automatic lifetime management
- Scene persistence options with DontDestroyOnLoad support
- Fallback mechanisms for missing pools
- Editor debugging tools and runtime statistics

**Use Cases:** Projectiles, particles, enemies, UI elements, audio sources

### Controller Rumble System
*[Details to be added when you provide the rumble system code]*

## Utility Tools

### Button Attribute
Custom inspector buttons that allow developers to execute methods directly from the Unity Inspector without entering Play mode. Features method execution with parameter support, customizable button appearance, play mode restrictions, and foldout interface for complex parameters with automatic validation and default value handling. Ideal for testing, debugging, content creation workflows, and designer tools.

### ChanceList\<T\>
A weighted random selection system with built-in normalization and designer-friendly Inspector integration. Provides generic type support, automatic chance normalization ensuring total equals 100%, locking mechanism for fixed probability items, and support for both single and multiple item selection with custom property drawer controls. Perfect for loot systems, random events, procedural content generation, and AI decision making.

### SceneField
A robust scene reference system that maintains valid scene connections and provides build setting validation. Features type-safe scene references in Inspector, automatic validation of scenes in build settings, runtime build index resolution, and support for scene loading/unloading operations with implicit conversion support. Essential for scene management, level selection, menu systems, and progression systems.