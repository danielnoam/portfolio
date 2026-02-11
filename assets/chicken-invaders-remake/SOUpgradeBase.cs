using System;
using UnityEngine;

public abstract class SOUpgradeBase : ScriptableObject
{
    [SerializeField] protected string itemName;
    [SerializeField] protected bool isStackable;
    [SerializeField] protected int maxStacks = 1;
    [SerializeField] protected SOUpgradeBase[] itemNeededToUnlock;

    // The upgrade defines how it affects the player
    public abstract void ApplyUpgrade(RailPlayer player);

    // Centralized rules for shop availability
    public virtual bool CanBeOfferedToPlayer(RailPlayer player)
    {
        if (!isStackable && player.HasUpgrade(this)) return false;
        
        if (isStackable && player.GetUpgradeCount(this) >= maxStacks) return false;
        
        if (itemNeededToUnlock != null)
        {
            foreach (var requiredItem in itemNeededToUnlock)
            {
                if (requiredItem && !player.HasUpgrade(requiredItem))
                    return false;
            }
        }
        
        return true;
    }
}