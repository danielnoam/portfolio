using System.Collections.Generic;
using UnityEngine;

public class PlayerProjectile : MonoBehaviour, IPooledObject
{
    private List<ProjectileBehaviorBase> _activeBehaviors;
    private RailPlayer _owner;
    private bool _isInitialized;
    
    public void SetUpProjectile(RailPlayer owner, WeaponInstance weaponInstance)
    {
        _owner = owner;
        
        // Create deep copies of the behaviors.
        // If we used the SO list directly, runtime changes would modify the asset.
        _activeBehaviors = CreateUniqueBehaviorInstances(weaponInstance.CurrentWeaponData.ProjectileBehaviors);

        foreach (var behavior in _activeBehaviors)
        {
            behavior.OnSpawn(this, _owner);
        }
        _isInitialized = true;
    }

    private void FixedUpdate()
    {
        if (!_isInitialized) return;

        // Iterate through attached behaviors (MoveForward, Homing, etc.)
        foreach (var behavior in _activeBehaviors)
        {
            behavior.OnMovement(this, _owner);
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!_isInitialized) return;

        if (other.TryGetComponent(out IDamageable damageable))
        {
            foreach (var behavior in _activeBehaviors)
            {
                behavior.OnCollision(this, _owner, damageable);
            }
            ReturnObjectToPool();
        }
    }
    
    private void ReturnObjectToPool()
    {
        foreach (var behavior in _activeBehaviors)
        {
            behavior.OnDestroy(this, _owner);
        }
        ObjectPooler.ReturnObjectToPool(gameObject);
    }

    // Helper to deep-copy the behavior classes using Reflection
    private List<ProjectileBehaviorBase> CreateUniqueBehaviorInstances(List<ProjectileBehaviorBase> originalBehaviors)
    {
        // ... (Reflection implementation to clone properties) ...
        return new List<ProjectileBehaviorBase>();
    }
}