using System;
using System.IO;
using UnityEngine;
using UnityEngine.SceneManagement;

[DefaultExecutionOrder(-1)]
public class SaveManager : MonoBehaviour
{
    public static SaveManager Instance { get; private set; }
    
    private static PlayerProgressData _playerProgressData;
    private static string _playerProgressDataPath;
    private static bool _initialized;

    private void Awake()
    {
        if (!Instance || Instance == this)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            Initialize();
        }
        else Destroy(gameObject);
    }

    private static void Initialize()
    {
        if (_initialized) return;
        
        _playerProgressDataPath = Path.Combine(Application.persistentDataPath, "PlayerProgress.json");
        LoadPlayerProgressDataFromFile();
        
        _initialized = true;
        
        // Auto-save on scene changes
        SceneManager.activeSceneChanged += OnActiveSceneChanged;
    }

    private static void SavePlayerProgressDataToFile()
    {
        try
        {
            // Serialize Class to JSON string
            string jsonData = JsonUtility.ToJson(_playerProgressData, true);
            // Write to disk
            File.WriteAllText(_playerProgressDataPath, jsonData);
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to save game: {e.Message}");
        }
    }

    private static void LoadPlayerProgressDataFromFile()
    {
        try
        {
            if (File.Exists(_playerProgressDataPath))
            {
                string jsonData = File.ReadAllText(_playerProgressDataPath);
                _playerProgressData = JsonUtility.FromJson<PlayerProgressData>(jsonData);
            }
            else
            {
                _playerProgressData = new PlayerProgressData(); // Create default
            }
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to load game: {e.Message}");
            _playerProgressData = new PlayerProgressData();
        }
    }
    
    private void OnApplicationQuit() => SavePlayerProgressDataToFile();
    private void OnApplicationPause(bool pauseStatus) { if(pauseStatus) SavePlayerProgressDataToFile(); }
}