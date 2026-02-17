using System.Collections.Generic;
using DNExtensions.Utilities;
using DNExtensions.Utilities.AutoGet;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.DualShock;

namespace DNExtensions.Systems.ControllerRumble
{
    /// <summary>
    /// Receives rumble effects from connected sources, combines their intensities,
    /// and drives the gamepad motors each frame.
    /// </summary>
    public class ControllerRumbleListener : MonoBehaviour, IDualShockHaptics
    {
        [Header("Settings")]
        [SerializeField, AutoGetScene] private PlayerInput playerInput;
        [SerializeField, MinMaxRange(0f, 1f)] private RangedFloat lowFrequencyRange = new RangedFloat(0, 1f);
        [SerializeField, MinMaxRange(0f, 1f)] private RangedFloat highFrequencyRange = new RangedFloat(0, 1f);

        private readonly HashSet<ControllerRumbleEffect> _activeRumbleEffects = new HashSet<ControllerRumbleEffect>();
        private readonly List<ControllerRumbleSource> _rumbleSources = new List<ControllerRumbleSource>();
        private Gamepad _gamepad;
        private DualShockGamepad _dualShockGamepad;

        public float CurrentCombinedLow { get; private set; }
        public float CurrentCombinedHigh { get; private set; }
        public int ActiveEffects => _activeRumbleEffects.Count;

        // --- Effects ---

        /// <summary>
        /// Add an effect to the active queue — called automatically by connected sources
        /// </summary>
        public void AddRumbleEffect(ControllerRumbleEffect effect)
        {
            _activeRumbleEffects.Add(effect);
        }

        /// <summary>
        /// Clear all active effects and stop haptics immediately
        /// </summary>
        public void DisableAllRumbleEffects()
        {
            _activeRumbleEffects.Clear();
            ResetHaptics();
        }

        /// <summary>
        /// Remove only the continuous effects from a specific source
        /// </summary>
        public void RemoveContinuousEffectsFromSource(ControllerRumbleSource source)
        {
            if (!source) return;
            _activeRumbleEffects.RemoveWhere(effect => effect.IsContinuous && effect.SourceReference == source);
        }

        // --- Sources ---

        public void ConnectRumbleSource(ControllerRumbleSource source)
        {
            if (!source || _rumbleSources.Contains(source)) return;
            _rumbleSources.Add(source);
        }

        public void DisconnectRumbleSource(ControllerRumbleSource source)
        {
            if (!source) return;
            _rumbleSources.Remove(source);
        }

        // --- Motor Control (IDualShockHaptics) ---

        public void SetMotorSpeeds(float lowFrequency, float highFrequency)
        {
            _gamepad?.SetMotorSpeeds(lowFrequency, highFrequency);
        }

        public void PauseHaptics() => _gamepad?.PauseHaptics();
        public void ResumeHaptics() => _gamepad?.ResumeHaptics();
        public void ResetHaptics() => _gamepad?.ResetHaptics();
    }
}