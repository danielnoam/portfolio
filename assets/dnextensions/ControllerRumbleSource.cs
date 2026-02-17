using System.Collections.Generic;
using DNExtensions.Utilities;
using DNExtensions.Utilities.Button;
using UnityEngine;

namespace DNExtensions.Systems.ControllerRumble
{
    /// <summary>
    /// Connects to ControllerRumbleListeners in the scene to trigger rumble effects.
    /// Supports 3D spatial falloff when is3DSource is enabled.
    /// </summary>
    public class ControllerRumbleSource : MonoBehaviour
    {
        [Header("Settings")]
        [SerializeField] private bool is3DSource;
        [SerializeField, EnableIf("is3DSource"), Min(0f)] private float maxRumbleDistance = 1f;
        [SerializeField, EnableIf("is3DSource"), Min(0f)] private float minRumbleDistance = 10f;
        [SerializeField, EnableIf("is3DSource")] private AnimationCurve distanceFalloffCurve = AnimationCurve.EaseInOut(0, 1, 1, 0);

        private readonly List<ControllerRumbleListener> _rumbleListeners = new List<ControllerRumbleListener>();
        

        /// <summary>
        /// Trigger a rumble with custom parameters
        /// </summary>
        [Button]
        public void Rumble(float lowFrequency = 0.2f, float highFrequency = 0.2f, float duration = 0.2f,
            AnimationCurve lowFreqCurve = null, AnimationCurve highFreqCurve = null)
        {
            var effect = new ControllerRumbleEffect(lowFrequency, highFrequency, duration,
                lowFreqCurve, highFreqCurve, is3DSource ? this : null);
            SendEffect(effect);
        }

        /// <summary>
        /// Trigger a rumble using a serializable preset
        /// </summary>
        public void Rumble(ControllerRumbleEffectSettings settings)
        {
            var effect = new ControllerRumbleEffect(settings.lowFrequency, settings.highFrequency,
                settings.duration, settings.lowFrequencyCurve, settings.highFrequencyCurve,
                is3DSource ? this : null);
            SendEffect(effect);
        }

        [Button]
        public void RumbleFadeOut(float lowFreq = 0.2f, float highFreq = 0.2f, float duration = 0.2f)
        {
            var curve = AnimationCurve.Linear(0, 1, 1, 0);
            SendEffect(new ControllerRumbleEffect(lowFreq, highFreq, duration, curve, curve, is3DSource ? this : null));
        }

        [Button]
        public void RumbleFadeIn(float lowFreq = 0.2f, float highFreq = 0.2f, float duration = 0.2f)
        {
            var curve = AnimationCurve.Linear(0, 0, 1, 1);
            SendEffect(new ControllerRumbleEffect(lowFreq, highFreq, duration, curve, curve, is3DSource ? this : null));
        }

        [Button]
        public void RumblePulse(float lowFreq = 0.2f, float highFreq = 0.2f, float duration = 0.2f, int pulses = 3)
        {
            var curve = new AnimationCurve();
            for (var i = 0; i < pulses; i++)
            {
                var time = (float)i / pulses;
                curve.AddKey(time, 0f);
                curve.AddKey(time + 0.1f / pulses, 1f);
            }
            SendEffect(new ControllerRumbleEffect(lowFreq, highFreq, duration, curve, curve, is3DSource ? this : null));
        }

        /// <summary>
        /// Start a continuous rumble — persists until StopContinuousRumble is called
        /// </summary>
        [Button]
        public void StartContinuousRumble(float lowFreq = 0.2f, float highFreq = 0.2f)
        {
            SendEffect(new ControllerRumbleEffect(lowFreq, highFreq, this));
        }

        [Button]
        public void StopContinuousRumble()
        {
            foreach (var listener in _rumbleListeners)
                listener?.RemoveContinuousEffectsFromSource(this);
        }

        private void SendEffect(ControllerRumbleEffect effect)
        {
            foreach (var listener in _rumbleListeners)
                listener?.AddRumbleEffect(effect);
        }
    }
}