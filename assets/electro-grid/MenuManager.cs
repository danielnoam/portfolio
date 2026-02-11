using System;
using System.Collections.Generic;
using UnityEngine;

public class MenuManager : MonoBehaviour
{
    [SerializeField] private MainMenuScreen mainMenuScreen;
    [SerializeField] private LevelSelectionScreen levelSelectionScreen;
    [SerializeField] private CreditsScreen creditsScreen;
    
    private MenuScreen _currentScreen;
    private readonly Dictionary<Type, MenuScreen> _screens = new Dictionary<Type, MenuScreen>();

    private void Awake()
    {
        // Register screens for easy access
        _screens[typeof(MainMenuScreen)] = mainMenuScreen;
        _screens[typeof(LevelSelectionScreen)] = levelSelectionScreen;
        _screens[typeof(CreditsScreen)] = creditsScreen;
    }
    
    private void Start()
    {
        HideAllScreensImmediate();
        ShowScreen<MainMenuScreen>(true);
    }
    

    // ShowScreen<LevelSelectionScreen>();
    private void ShowScreen<T>(bool animated = true, Action onComplete = null) where T : MenuScreen
    {
        if (!_screens.TryGetValue(typeof(T), out MenuScreen screen)) return;
        
        if (_currentScreen != null)
        {
            // Chain the Hide animation of the current screen to the Show animation of the next
            _currentScreen.Hide(animated, () =>
            {
                screen.Show(animated, onComplete);
                _currentScreen = screen;
            });
        }
        else
        {
            screen.ShowInitial(animated, onComplete);
            _currentScreen = screen;
        }
    }

    private void HideAllScreensImmediate()
    {
        foreach (var screen in _screens.Values) screen.Hide(false);
    }
}