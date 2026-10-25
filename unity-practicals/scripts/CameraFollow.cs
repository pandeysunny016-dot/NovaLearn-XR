using UnityEngine;

/// <summary>
/// Smoothly follows a target GameObject with an offset and dampening.
/// </summary>
public class CameraFollow : MonoBehaviour
{
    [Tooltip("The target GameObject to track (e.g., Player).")]
    public Transform target;

    [Tooltip("Positional offset relative to the target.")]
    public Vector3 offset = new Vector3(0f, 4f, -7f);

    [Tooltip("Speed of camera position interpolation.")]
    public float smoothSpeed = 8.0f;

    private void LateUpdate()
    {
        if (target == null) return;

        Vector3 desiredPosition = target.position + offset;
        Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed * Time.deltaTime);
        transform.position = smoothedPosition;

        transform.LookAt(target.position + Vector3.up * 1.2f);
    }
}
