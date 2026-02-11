using System.Collections.Generic;
using UnityEngine;

public class RailPlayer : MonoBehaviour
{
    // Inventory State
    public Dictionary<SOUpgradeBase, int> Upgrades { get; private set; } = new Dictionary<SOUpgradeBase, int>();

    // Helper methods for State Checks
    public bool HasUpgrade(SOUpgradeBase upgrade)
    {
        return Upgrades.ContainsKey(upgrade);
    }
    public int GetUpgradeCount(SOUpgradeBase upgrade)
    {
        return Upgrades.GetValueOrDefault(upgrade, 0);
    }
    
    // These methods are called by the specific SOUpgrade implementations
    public void AddMaxHeatUpgrade(SOUpgradeBase upgrade, float amount)
    {
        TrackUpgrade(upgrade);
        weaponSystem.AddMaxHeatUpgrade(amount);
    }

    public void AddHealthUpgrade(SOUpgradeBase upgrade, int amount)
    {
        TrackUpgrade(upgrade);
        health.UpgradeHealthBy(amount);
    }

    public void AddWeaponUpgrade(SOUpgradeBase upgrade, SOWeaponUpgrade weaponUpgrade)
    {
        TrackUpgrade(upgrade);
        weaponSystem.AddWeaponUpgrade(weaponUpgrade);
    }

    private void TrackUpgrade(SOUpgradeBase upgrade)
    {
        Upgrades[upgrade] = GetUpgradeCount(upgrade) + 1;
    }
}