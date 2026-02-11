using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class StageProgressionBar : MonoBehaviour
{
    [Header("Settings")]
    [SerializeField] private RangedFloat iconSizeRange = new RangedFloat(8f, 40f);
    [SerializeField] private StageIcon stageIconPrefab;
    [SerializeField] private Transform iconContainer;
    
    public void Initialize(SOLevel level)
    {
        // Clear old icons
        foreach (Transform child in iconContainer) Destroy(child.gameObject);
        
        // Filter out invisible stages (like delays)
        List<SOLevelStage> visualStages = new List<SOLevelStage>();
        foreach(var stage in level.LevelStages)
        {
            if (stage.StageType != StageType.Delay) visualStages.Add(stage);
        }

        // Calculate best icon width to fit container
        Vector2 iconSize = CalculateAdaptiveIconSize(visualStages.Count);
        
        foreach (var stage in visualStages)
        {
            StageIcon newIcon = Instantiate(stageIconPrefab, iconContainer);
            newIcon.Initialize(GetStageSprite(stage.StageType), iconSize);
        }
    }

    private Vector2 CalculateAdaptiveIconSize(int count)
    {
        RectTransform containerRect = iconContainer.GetComponent<RectTransform>();
        float availableWidth = containerRect.rect.width;
        
        // Calculate max width per icon assuming standard spacing
        float totalSpacing = (count - 1) * 10f;
        float maxIconWidth = (availableWidth - totalSpacing) / count;
        
        // Clamp to designer-defined min/max limits
        float finalWidth = Mathf.Clamp(maxIconWidth, iconSizeRange.minValue, iconSizeRange.maxValue);
        
        return new Vector2(finalWidth, finalWidth);
    }
}