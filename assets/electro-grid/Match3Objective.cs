using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public abstract class Match3Objective
{
    [SerializeField] protected Sprite objectiveSprite;
    
    public bool IsCompleted { get; protected set; }
    
    public event Action OnProgressChanged;
    public event Action OnCompleted;
    
    public abstract void Setup();
    public abstract void OnMatchMade(List<Match3Tile> matchedTiles);
    public abstract void OnObstacleBreak(Match3ObstacleObject obstacle);
    public abstract (int current, int target) GetProgress();
    
    protected void InvokeProgressChanged() => OnProgressChanged?.Invoke();
    protected void InvokeComplete() => OnCompleted?.Invoke();
}