using System.Collections;
using UnityEngine;

public class FullScreenCAController : MonoBehaviour
{
    [SerializeField] private Material chromaticAberrationMaterial;
    

    private static readonly int RedOffset = Shader.PropertyToID("_Red_Offset");
    private static readonly int GreenOffset = Shader.PropertyToID("_Green_Offset");
    private static readonly int BlueOffset = Shader.PropertyToID("_Blue_Offset");
    private static readonly int Intensity = Shader.PropertyToID("_Intensity");

    private Coroutine _currentTransition;
    
    private IEnumerator TransitionCoroutine(ChromaticAberrationSettings from, ChromaticAberrationSettings to, float duration)
    {
        float elapsed = 0f;
        
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = Mathf.SmoothStep(0f, 1f, elapsed / duration);
            
            ChromaticAberrationSettings current = LerpSettings(from, to, t);
            ApplySettings(current);
            
            yield return null;
        }
        
        ApplySettings(to);
        _currentTransition = null;
    }

    private void ApplySettings(ChromaticAberrationSettings settings)
    {
        if (!chromaticAberrationMaterial) return;
        
        chromaticAberrationMaterial.SetVector(RedOffset, settings.redOffset);
        chromaticAberrationMaterial.SetVector(GreenOffset, settings.greenOffset);
        chromaticAberrationMaterial.SetVector(BlueOffset, settings.blueOffset);
        chromaticAberrationMaterial.SetFloat(Intensity, settings.intensity);
    }
    

    private ChromaticAberrationSettings LerpSettings(ChromaticAberrationSettings a, ChromaticAberrationSettings b, float t)
    {
        return new ChromaticAberrationSettings
        {
            redOffset = Vector3.Lerp(a.redOffset, b.redOffset, t),
            greenOffset = Vector3.Lerp(a.greenOffset, b.greenOffset, t),
            blueOffset = Vector3.Lerp(a.blueOffset, b.blueOffset, t),
            intensity = Mathf.Lerp(a.intensity, b.intensity, t)
        };
    }
}