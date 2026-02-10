using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    
    private void Update()
    {
        HandleMovement();
    }
    
    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime); transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime);
    }
    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime);
    }
    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime);
    }
    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime);
    }
    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * horizontal * moveSpeed * Time.deltaTime);
    }
    
}