using System;
using UnityEngine;

namespace DNExtensions.Systems.ControllerRumble
{
    /// <summary>
    /// Represents a single rumble effect.
    /// Supports timed effects (with duration and curves) and continuous effects (no duration).
    /// </summary>
    public class ControllerRumbleEffect
    {
        public readonly float LowFrequency;
        public readonly float HighFrequency;
        public readonly float Duration;
        public readonly AnimationCurve LowFrequencyCurve;
        public readonly AnimationCurve HighFrequencyCurve;
        public readonly ControllerRumbleSource SourceReference;
        public readonly bool IsContinuous;

        public float ElapsedTime { get; private set; }
        public bool IsExpired => !IsContinuous && ElapsedTime >= Duration;

        /// <summary>
        /// Timed effect — plays for a set duration, modulated by animation curves
        /// </summary>
        public ControllerRumbleEffect(float lowFrequency, float highFrequency, float duration,
            AnimationCurve lowFrequencyCurve = null, AnimationCurve highFrequencyCurve = null,
            ControllerRumbleSource sourceReference = null)
        {
            LowFrequency = Mathf.Clamp01(lowFrequency);
            HighFrequency = Mathf.Clamp01(highFrequency);
            Duration = Mathf.Max(0f, duration);
            LowFrequencyCurve = lowFrequencyCurve ?? AnimationCurve.Linear(0, 1, 1, 1);
            HighFrequencyCurve = highFrequencyCurve ?? AnimationCurve.Linear(0, 1, 1, 1);
            SourceReference = sourceReference;
            IsContinuous = false;
        }

        /// <summary>
        /// Continuous effect — runs indefinitely until manually stopped via StopContinuousRumble
        /// </summary>
        public ControllerRumbleEffect(float lowFrequency, float highFrequency,
            ControllerRumbleSource sourceReference = null)
        {
            LowFrequency = Mathf.Clamp01(lowFrequency);
            HighFrequency = Mathf.Clamp01(highFrequency);
            Duration = 0f;
            LowFrequencyCurve = null;
            HighFrequencyCurve = null;
            SourceReference = sourceReference;
            IsContinuous = true;
        }

        public void Update(float deltaTime)
        {
            ElapsedTime += deltaTime;
        }
    }

    /// <summary>
    /// Serializable preset for creating and reusing rumble effects in the Inspector
    /// </summary>
    [Serializable]
    public class ControllerRumbleEffectSettings
    {
        [Range(0f, 1f)] public float lowFrequency = 0.3f;
        [Range(0f, 1f)] public float highFrequency = 0.3f;
        [Min(0)] public float duration = 0.3f;
        public AnimationCurve lowFrequencyCurve = AnimationCurve.Linear(0, 1, 1, 1);
        public AnimationCurve highFrequencyCurve = AnimationCurve.Linear(0, 1, 1, 1);
    }
}