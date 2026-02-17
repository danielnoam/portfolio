using System.Collections.Generic;
using UnityEngine;

namespace DNExtensions.Systems.ObjectPooling
{
    /// <summary>
    /// Singleton manager for multiple object pools with automatic scene management.
    /// Auto-initialized via ObjectPoolingRuntime before scene load — no manual setup needed.
    /// </summary>
    public class ObjectPooler : MonoBehaviour
    {
        public static ObjectPooler Instance { get; private set; }

        private bool _instantiateAsFallBack;
        private bool _destroyAsFallBack;
        private bool _showDebugMessages;
        private bool _hidePoolHolders;
        private List<Pool> _pools = new List<Pool>();

        public IReadOnlyList<Pool> Pools => _pools;

        /// <summary>
        /// Initializes all pools from the settings asset.
        /// Called automatically by ObjectPoolingRuntime.
        /// </summary>
        public void Initialize(ObjectPoolingSettings settings)
        {
            if (!settings) return;

            _instantiateAsFallBack = settings.instantiateAsFallback;
            _destroyAsFallBack = settings.destroyAsFallback;
            _showDebugMessages = settings.showDebugMessages;
            _hidePoolHolders = settings.hidePoolHolders;
            _pools = settings.GetPoolsCopy();

            if (Instance && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);
            SetUpPools();
        }

        /// <summary>
        /// Gets an object from the matching pool, or instantiates as fallback if configured.
        /// </summary>
        public static GameObject GetObjectFromPool(GameObject obj, Vector3 position = default, Quaternion rotation = default)
        {
            if (Instance)
            {
                foreach (var pool in Instance._pools)
                {
                    if (pool.prefab == obj)
                        return pool.GetObjectFromPool(position, rotation);
                }

                if (Instance._instantiateAsFallBack)
                    return Instantiate(obj, position, rotation);
            }

            return Instantiate(obj, position, rotation);
        }

        /// <summary>
        /// Returns an object to its pool, or destroys it as fallback if configured.
        /// Automatically finds the correct pool.
        /// </summary>
        public static void ReturnObjectToPool(GameObject obj)
        {
            if (!obj) return;

            if (Instance)
            {
                foreach (var pool in Instance._pools)
                {
                    if (pool.IsObjectPartOfPool(obj))
                    {
                        pool.ReturnObjectToPool(obj);
                        return;
                    }
                }

                if (Instance._destroyAsFallBack)
                {
                    Destroy(obj);
                    return;
                }
            }

            Destroy(obj);
        }

        /// <summary>
        /// Generic version — get a pooled object and return it as the desired component directly.
        /// </summary>
        public static T GetObjectFromPool<T>(T prefab, Vector3 position = default, Quaternion rotation = default) where T : Component
        {
            GameObject obj = GetObjectFromPool(prefab.gameObject, position, rotation);
            if (obj && obj.TryGetComponent(out T component))
                return component;
            return null;
        }

        /// <summary>
        /// Generic version — return a pooled component's GameObject to the pool.
        /// </summary>
        public static void ReturnObjectToPool<T>(T obj) where T : Component
        {
            if (obj) ReturnObjectToPool(obj.gameObject);
        }
    }
}