---
thumbnail: /portfolio/assets/dnextensions/objectpooling.jpg
shortDescription: High-performance pooling system eliminating instantiation costs and reducing garbage collection overhead.
tags: [tool, unity, pc, "2025", solo, featured]
---
<div class="page-content">

# Object Pooling

<div class="button-group horizontal">
    <a href="https://github.com/danielnoam/DNExtensions" target="_blank" class="button">Github</a>
</div>

<div class="project-card">

## Overview
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

<div class="image-gallery gallery-2-columns">
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

</div>