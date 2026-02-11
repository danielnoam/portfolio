using UnityEngine;

[System.Serializable]
public class SpawnEnemyEvent : StageEvent
{
    [SerializeField] private ChickenStateController enemyPrefab;
    [SerializeField, Min(1)] private int maxActiveEnemies = 5;
    [SerializeField, MinMaxRange(1f, 30f)] private RangedFloat spawnIntervalRange = new RangedFloat(2, 2);
    
    private EnemySpawner _enemySpawner;
    private float _spawnTimer;
    private float _spawnInterval;
    
    public override void Initialize(LevelManager levelManager)
    {
        _enemySpawner = levelManager.EnemySpawner;
        _spawnInterval = spawnIntervalRange.RandomValue;
        StartEvent();
    }
    
    public override void Update(float deltaTime)
    {
        if (!isActive || !_enemySpawner) return;
        
        _spawnTimer += deltaTime;
        
        // Checks limits and timers before requesting a new enemy
        if (_spawnTimer >= _spawnInterval && _enemySpawner.ActiveEnemyCount < maxActiveEnemies)
        {
            _enemySpawner.SpawnEnemy(enemyPrefab);
            
            _spawnTimer = 0f;
            _spawnInterval = spawnIntervalRange.RandomValue;
        }
    }
    
    public override void Cleanup()
    {
        StopEvent();
        _enemySpawner = null;
    }
}