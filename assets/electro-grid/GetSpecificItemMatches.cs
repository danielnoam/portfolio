using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class GetSpecificItemMatches : Match3Objective
{
    [SerializeField] private SOItemData targetItem;
    [SerializeField] private int requiredAmount = 10;
    
    private int _currentAmount;

    public override void Setup()
    {
        _currentAmount = 0;
        IsCompleted = false;
    }

    public override void OnMatchMade(List<Match3Tile> matchedTiles)
    {
        if (IsCompleted) return;

        foreach (var tile in matchedTiles)
        {
            if (tile.HasObject && tile.CurrentMatch3Object.ItemData == targetItem)
            {
                _currentAmount++;
                InvokeProgressChanged();
            }
        }

        if (_currentAmount >= requiredAmount)
        {
            IsCompleted = true;
            InvokeComplete();
        }
    }
    
    public override void OnObstacleBreak(Match3ObstacleObject obstacle) { }
    
    public override (int, int) GetProgress() => (_currentAmount, requiredAmount);
}