using UnityEngine;

namespace DNExtensions
{
    public class ControllerVibrationSource : MonoBehaviour
    {
        [SerializeField] private float maxDistance = 20f;
        [SerializeField] private AnimationCurve falloffCurve = AnimationCurve.Linear(0, 1, 1, 0);

        private ControllerVibrationListener _listener;

        public (float low, float high) GetMotorSpeeds()
        {
            if (!_listener) return (0f, 0f);
            
            // Attenuate vibration intensity based on distance to the player
            float distance = Vector3.Distance(transform.position, _listener.transform.position);
            float normalizedDistance = Mathf.Clamp01(distance / maxDistance);
            float attenuation = falloffCurve.Evaluate(normalizedDistance);

            // Return calculated motor speeds
            return (attenuation * 0.8f, attenuation * 0.5f); 
        }
    }
}