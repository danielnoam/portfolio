using UnityEngine;

[System.Serializable]
public abstract class StageEvent
{
    [SerializeField] protected bool isActive;
    
    public bool IsActive => isActive;
    
    // All level events (Dialog, Spawning, Cinematics) must implement this
    public abstract void Initialize(LevelManager levelManager);
    public abstract void Update(float deltaTime);
    public abstract void Cleanup();
    
    protected virtual void StartEvent()
    {
        isActive = true;
    }
    
    protected virtual void StopEvent()
    {
        isActive = false;
    }
}