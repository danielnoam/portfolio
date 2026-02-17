using System.Collections;
using UnityEngine;

namespace DNExtensions.Systems.ObjectPooling
{
    [DisallowMultipleComponent]
    [RequireComponent(typeof(ParticleSystem))]
    [AddComponentMenu("DNExtensions/Poolable/Particle System")]
    public class PoolableParticleSystem : MonoBehaviour, IPoolable
    {
        public ParticleSystem particle;

        private void Awake()
        {
            if (!particle) particle = GetComponent<ParticleSystem>();
        }

        public void Play()
        {
            if (!particle) return;

            particle.Play();

            // Automatically calculate total duration so the object returns itself at the right time
            float duration = particle.main.duration + particle.main.startLifetime.constantMax;
            StartCoroutine(ReturnAfter(duration));
        }

        public void Play(Vector3 position)
        {
            if (!particle) return;

            transform.position = position;
            particle.Play();

            float duration = particle.main.duration + particle.main.startLifetime.constantMax;
            StartCoroutine(ReturnAfter(duration));
        }

        private IEnumerator ReturnAfter(float delay)
        {
            yield return new WaitForSeconds(delay);
            ObjectPooler.ReturnObjectToPool(gameObject);
        }

        // IPoolable callbacks — called automatically by the pool
        public void OnPoolGet() { }

        public void OnPoolReturn()
        {
            // Stop and clear particles when returned to pool
            if (particle)
            {
                particle.Stop(true);
                particle.Clear(true);
            }
        }

        public void OnPoolRecycle()
        {
            // Also stop if recycled while still active
            if (particle)
            {
                particle.Stop(true);
                particle.Clear(true);
            }
        }
    }
}