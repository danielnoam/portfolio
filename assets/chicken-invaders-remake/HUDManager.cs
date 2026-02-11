using UnityEngine;
using PrimeTween;

public class HUDManager : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private CanvasGroup hudGroup;
    [SerializeField] private Image healthIcon;
    [SerializeField] private RailPlayer player;
    [SerializeField] private LevelManager levelManager;

    private Sequence _playerHealthSequence;
    private int _playerHealth;

    // 1. THE WIRING: Observer Pattern implementation
    // The HUD listens to everything, but nothing knows about the HUD.
    private void OnEnable()
    {
        if (player)
        {
            player.Health.OnDeath += OnPlayerDeath;
            player.Health.OnDamaged += OnPlayerDamaged;
            player.Health.OnHealthChanged += OnPlayerHealthChanged;
            player.Health.OnShieldChanged += OnPlayerShieldChanged;
            player.ResourceCollector.OnCurrencyChanged += OnPlayerCurrencyChanged;
            
            // Weapon Events
            player.WeaponSystem.OnWeaponOverheatedEvent += OnPlayerWeaponOverheated;
            player.WeaponSystem.OnActiveWeaponSwitchedEvent += OnPlayerActiveWeaponSwitched;
            player.WeaponSystem.OnActiveWeaponCooldownUpdatedEvent += OnPlayerActiveWeaponCooldownUpdated;
            
            // Movement Events
            player.Movement.OnDodge += OnPlayerDodge;
            player.Movement.OnDodgeCooldownUpdated += OnDodgeCooldownUpdated;
        }

        if (levelManager)
        {
            levelManager.OnScoreChanged += OnScoreChanged;
            levelManager.OnStageChanged += OnStageChanged;
        }
    }

    private void OnDisable()
    {
        // Clean cleanup to prevent memory leaks
        if (player)
        {
            player.Health.OnDeath -= OnPlayerDeath;
            player.Health.OnDamaged -= OnPlayerDamaged;
            player.Health.OnHealthChanged -= OnPlayerHealthChanged;
            // ... Unsubscribe remaining events ...
        }
    }
    
    // Using Sequences to chain visual effects (Punch -> Color Flash -> Numeric Ticker)
    private void OnPlayerHealthChanged(int currentHealth)
    {
        if (_playerHealthSequence.isAlive) _playerHealthSequence.Stop();
        
        _playerHealthSequence = Sequence.Create()
            .Group(Tween.PunchScale(healthIcon.transform, Vector3.one * 0.4f, 0.2f));
        
        // If taking damage, flash red
        if (_playerHealth < currentHealth)
        {
            _playerHealthSequence.Group(Tween.Color(healthIcon, Color.red, 0.2f))
                                 .Chain(Tween.Color(healthIcon, Color.white, 0.2f));
        }
        
        _playerHealth = currentHealth;
    }
    
    // Makes the UI feel like it exists in the physical cockpit
    private void LateUpdate()
    {
        if (!player) return;
        
        Vector3 targetPosition = new Vector3(
            player.Movement.InputDirection.x * 7f,
            player.Movement.InputDirection.y * 7f, 0
        );
        
        Vector3 finalPosition = targetPosition + CalculateShakeOffset();
        
        hudGroup.transform.localPosition = Vector3.Lerp(
            hudGroup.transform.localPosition, 
            finalPosition, 
            Time.deltaTime * 2f
        );
    }

    private Vector3 CalculateShakeOffset()
    {
        // ... Perlin noise implementation ...
        return Vector3.zero; // Simplified for portfolio display
    }
}