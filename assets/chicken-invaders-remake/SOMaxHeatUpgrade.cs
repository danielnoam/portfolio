using UnityEngine;

[CreateAssetMenu(fileName = "Max Heat Upgrade", menuName = "Scriptable Objects/New Max Heat Upgrade")]
public class SOMaxHeatUpgrade : SOUpgradeBase
{
    [SerializeField, Min(1)] private float maxHeatUpgradeAmount = 25;

    public override void ApplyUpgrade(RailPlayer player)
    {
        // Executes the specific logic on the player
        player?.AddMaxHeatUpgrade(this, maxHeatUpgradeAmount);
    }
}