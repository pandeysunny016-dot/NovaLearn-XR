using UnityEngine;
using UnityEngine.Events;

/// <summary>
/// Implements Google Cardboard gaze-based reticle raycasting and dwell time selection.
/// </summary>
public class GazeInteraction : MonoBehaviour
{
    [Header("Gaze Settings")]
    [Tooltip("Maximum raycast distance for targeting interactive objects.")]
    public float rayDistance = 25.0f;

    [Tooltip("Time in seconds the user must dwell their gaze on an object to trigger selection.")]
    public float dwellTimeThreshold = 1.5f;

    [Header("Reticle Visuals")]
    public Transform reticleTransform;

    private float currentGazeTimer = 0f;
    private GameObject currentTarget = null;

    private void Update()
    {
        // Cast ray directly forward from the camera's center
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hit;

        if (Physics.Raycast(ray, out hit, rayDistance))
        {
            // Position reticle at hit point
            if (reticleTransform != null)
            {
                reticleTransform.position = hit.point - ray.direction * 0.05f;
                reticleTransform.rotation = Quaternion.LookRotation(hit.normal);
            }

            // Verify if object is interactive
            if (hit.collider.CompareTag("Interactive"))
            {
                if (currentTarget == hit.collider.gameObject)
                {
                    currentGazeTimer += Time.deltaTime;
                    if (currentGazeTimer >= dwellTimeThreshold)
                    {
                        TriggerSelection(currentTarget);
                        currentGazeTimer = 0f;
                    }
                }
                else
                {
                    currentTarget = hit.collider.gameObject;
                    currentGazeTimer = 0f;
                }
                return;
            }
        }
        else if (reticleTransform != null)
        {
            // Default reticle resting distance
            reticleTransform.position = transform.position + transform.forward * 5f;
            reticleTransform.rotation = Quaternion.LookRotation(transform.forward);
        }

        // Reset gaze state if nothing is focused
        currentTarget = null;
        currentGazeTimer = 0f;
    }

    private void TriggerSelection(GameObject target)
    {
        Debug.Log($"Gaze activated on: {target.name}");
        // Execute OnGazeClick or message target
        target.SendMessage("OnGazeClick", SendMessageOptions.DontRequireReceiver);
    }
}
