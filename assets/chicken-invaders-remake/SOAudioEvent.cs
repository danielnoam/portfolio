using UnityEngine;
using UnityEngine.Audio;
using VInspector;
#if UNITY_EDITOR
using UnityEditor;
#endif

namespace DNExtensions
{
    [CreateAssetMenu(fileName = "New AudioEvent", menuName = "Scriptable Objects/New Audio Event")]
    public class SOAudioEvent : ScriptableObject
    {
        [Header("Settings")] 
        public AudioClip[] clips;
        public AudioMixerGroup mixerGroup;
        [MinMaxRange(0f, 1f)] public RangedFloat volume = 1f;
        [MinMaxRange(-3f, 3f)] public RangedFloat pitch = 1f;

        [Header("3D Settings")]
        [Range(0f, 1f)] public float spatialBlend = 0f;
        public bool useObjectPooler = true;
        public GameObject oneShotPrefab;

        public void Play(AudioSource source)
        {
            if (!source || clips.Length == 0) return;
            
            source.clip = clips[Random.Range(0, clips.Length)];
            source.outputAudioMixerGroup = mixerGroup;
            source.volume = Random.Range(volume.minValue, volume.maxValue);
            source.pitch = Random.Range(pitch.minValue, pitch.maxValue);
            source.spatialBlend = spatialBlend;
            
            source.Play();
        }

        public void PlayAtPoint(Vector3 position)
        {
            if (clips.Length == 0) return;

            // Logic to grab an AudioSource from the pool, configure it, and auto-return it
            GameObject oneShotObject = ObjectPooler.GetObjectFromPool(oneShotPrefab, position, Quaternion.identity);
            
            if (oneShotObject.TryGetComponent(out AudioSource source))
            {
                Play(source); // Reuse Play() logic for consistency

                if (source.TryGetComponent(out AutoReturnToPool returnToPool))
                {
                    returnToPool.Initialize(source.clip.length);
                }
            }
        }
    }

    #if UNITY_EDITOR
    // Custom Editor to allow designers to preview sounds without running the game
    [CustomEditor(typeof(SOAudioEvent), true)]
    public class AudioEventEditor : Editor
    {
        [SerializeField] private AudioSource previewer;

        public void OnEnable()
        {
            previewer = EditorUtility
                .CreateGameObjectWithHideFlags("Audio preview", HideFlags.HideAndDontSave, typeof(AudioSource))
                .GetComponent<AudioSource>();
        }

        public override void OnInspectorGUI()
        {
            DrawDefaultInspector();

            if (GUILayout.Button("Preview Sound"))
            {
                ((SOAudioEvent)target).Play(previewer);
            }
        }
    }
    #endif
}