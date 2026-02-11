using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace DNExtensions
{
    public class ControllerVibrationListener : MonoBehaviour
    {
        private readonly List<ControllerVibrationSource> _vibrationSources = new List<ControllerVibrationSource>();
        private Gamepad _gamepad;

        private void Update()
        {
            if (_gamepad == null) return;

            float combinedLow = 0f;
            float combinedHigh = 0f;
            
            // Combines all active vibration sources (e.g. Explosion + Shooting + Taking Damage)
            // taking the MAX intensity so effects don't cancel each other out.
            for (int i = _vibrationSources.Count - 1; i >= 0; i--)
            {
                var source = _vibrationSources[i];
                (float low, float high) = source.GetMotorSpeeds();
                
                combinedLow = Mathf.Max(combinedLow, low);
                combinedHigh = Mathf.Max(combinedHigh, high);
            }

            _gamepad.SetMotorSpeeds(combinedLow, combinedHigh);
        }

        public void RegisterSource(ControllerVibrationSource source)
        {
            if (!_vibrationSources.Contains(source)) _vibrationSources.Add(source);
        }
    }
}