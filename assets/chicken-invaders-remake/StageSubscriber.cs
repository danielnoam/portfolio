using System;
using UnityEngine;
using UnityEngine.Events;

[Serializable]
public class StageSubscription
{
    public SOLevelStage stageToSubscribe;
    public UnityEvent onStageStart;
    public UnityEvent onStageEnd;
}

public class StageSubscriber : MonoBehaviour
{
    [SerializeField] private StageSubscription[] subscriptions; 

    private void OnEnable()
    {
        foreach (var sub in subscriptions)
        {
            if (!sub.stageToSubscribe) continue;
            
            // Bridge C# Events to UnityEvents 
            sub.stageToSubscribe.OnStageStarted += sub.onStageStart.Invoke;
            sub.stageToSubscribe.OnStageEnded += sub.onStageEnd.Invoke;
        }
    }
    
    private void OnDisable()
    {
        foreach (var sub in subscriptions)
        {
            if (!sub.stageToSubscribe) continue;

            sub.stageToSubscribe.OnStageStarted -= sub.onStageStart.Invoke;
            sub.stageToSubscribe.OnStageEnded -= sub.onStageEnd.Invoke;
        }
    }
}