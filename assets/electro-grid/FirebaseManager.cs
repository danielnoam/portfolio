using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Analytics;
using Firebase.RemoteConfig;

public class FirebaseManager : MonoBehaviour
{
    public static FirebaseManager Instance { get; private set; }

    [Header("Config")]
    [SerializeField] private bool hapticsEnabled = true;
    [SerializeField] private float screenShakeMultiplier = 1.0f;

    public event Action OnFirebaseInitialized;
    private bool _firebaseInitialized;

    private void Start()
    {
        InitializeFirebase();
    }
    
    // Handles dependency checks (Google Play Services) before starting the app
    private async void InitializeFirebase()
    {
        var dependencyStatus = await FirebaseApp.CheckAndFixDependenciesAsync();

        if (dependencyStatus == DependencyStatus.Available)
        {
            StartCoroutine(SetupFirebaseSequence());
        }
        else
        {
            Debug.LogError($"Could not resolve all Firebase dependencies: {dependencyStatus}");
        }
    }

    private IEnumerator SetupFirebaseSequence()
    {
        FirebaseAnalytics.SetAnalyticsCollectionEnabled(true);
        
        // Chain the Remote Config fetch
        yield return StartCoroutine(InitializeRemoteConfig());

        _firebaseInitialized = true;
        OnFirebaseInitialized?.Invoke();
    }
    
    // Allows changing game values from the cloud without an app update
    private IEnumerator InitializeRemoteConfig()
    {
        // Set Defaults
        var defaults = new Dictionary<string, object>
        {
            { "screen_shake_intensity", 1.0 },
            { "enable_haptics", true }
        };
        
        yield return FirebaseRemoteConfig.DefaultInstance.SetDefaultsAsync(defaults);
        
        // Fetch new values
        var fetchTask = FirebaseRemoteConfig.DefaultInstance.FetchAsync(TimeSpan.Zero);
        yield return new WaitUntil(() => fetchTask.IsCompleted);
        
        if (fetchTask.IsCompletedSuccessfully)
        {
            FirebaseRemoteConfig.DefaultInstance.ActivateAsync();
            ApplyRemoteValues();
        }
    }

    private void ApplyRemoteValues()
    {
        screenShakeMultiplier = (float)FirebaseRemoteConfig.DefaultInstance.GetValue("screen_shake_intensity").DoubleValue;
        hapticsEnabled = FirebaseRemoteConfig.DefaultInstance.GetValue("enable_haptics").BooleanValue;
    }
    
    // Public methods for gameplay scripts to call
    public void LogLevelCompleted(string levelName, int movesLeft, float timeSpent)
    {
        if (!_firebaseInitialized) return;

        FirebaseAnalytics.LogEvent(
            FirebaseAnalytics.EventLevelEnd,
            new Parameter[] {
                new(FirebaseAnalytics.ParameterLevelName, levelName),
                new(FirebaseAnalytics.ParameterSuccess, 1),
                new("moves_remaining", movesLeft),
                new("time_spent_seconds", timeSpent)
            }
        );
    }
}