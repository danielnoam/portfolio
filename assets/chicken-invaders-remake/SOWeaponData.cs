using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "New Weapon", menuName = "Scriptable Objects/New Weapon")]
public class SOWeaponData : ScriptableObject
{
    [Header("Core Settings")]
    [SerializeField] private string weaponName;
    [SerializeField] private WeaponType weaponType = WeaponType.Projectile;
    [SerializeField] private float fireRate = 1f;
    
    [Header("Targeting")]
    [SerializeField, Min(0)] private int maxTargets = 1; // 0 = Infinite
    [SerializeField] private float targetCheckRadius = 3f;
    
    [Header("Projectile Config")]
    [SerializeField] private PlayerProjectile playerProjectilePrefab;
    [SerializeField] private float projectileLifetime = 5f;
    

    [SerializeReference] 
    private List<ProjectileBehaviorBase> projectileBehaviors = new List<ProjectileBehaviorBase>();
    
    [SerializeReference] 
    private List<HitscanBehaviorBase> hitscanBehaviors = new List<HitscanBehaviorBase>();
    
    public float FireRate => fireRate;
    public List<ProjectileBehaviorBase> ProjectileBehaviors => projectileBehaviors;
    public PlayerProjectile ProjectilePrefab => playerProjectilePrefab;
    public float ProjectileLifetime => projectileLifetime;
}