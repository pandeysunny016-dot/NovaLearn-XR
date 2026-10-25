using UnityEngine;

/// <summary>
/// Handles physics-based player movement and rotation in Unity 3D.
/// Attach this script to a GameObject with a Rigidbody component.
/// </summary>
[RequireComponent(typeof(Rigidbody))]
public class PlayerMovement : MonoBehaviour
{
    [Header("Movement Settings")]
    [Tooltip("Movement speed in meters per second.")]
    public float moveSpeed = 6.0f;

    [Tooltip("Turning rate in degrees per second.")]
    public float turnSpeed = 120.0f;

    private Rigidbody rb;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        // Freeze X and Z rotations to prevent tipping over
        rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
    }

    private void FixedUpdate()
    {
        // Axis readings: Horizontal (A/D or Left/Right), Vertical (W/S or Up/Down)
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");

        // Forward and backward movement
        Vector3 movement = transform.forward * v * moveSpeed * Time.fixedDeltaTime;
        rb.MovePosition(rb.position + movement);

        // Yaw rotation
        float turn = h * turnSpeed * Time.fixedDeltaTime;
        Quaternion turnRotation = Quaternion.Euler(0f, turn, 0f);
        rb.MoveRotation(rb.rotation * turnRotation);
    }
}
