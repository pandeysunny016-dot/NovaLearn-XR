using UnityEngine;

/// <summary>
/// Spawns particle explosion prefabs and applies radial physics force.
/// </summary>
public class ExplosionEffect : MonoBehaviour
{
    [Header("Explosion Properties")]
    public GameObject explosionParticlePrefab;
    public float explosionForce = 800.0f;
    public float explosionRadius = 6.0f;
    public float upwardsModifier = 1.0f;

    /// <summary>
    /// Executes detonation at the GameObject's current position.
    /// </summary>
    public void Explode()
    {
        // 1. Instantiate Particle FX
        if (explosionParticlePrefab != null)
        {
            GameObject fx = Instantiate(explosionParticlePrefab, transform.position, Quaternion.identity);
            Destroy(fx, 3.0f);
        }

        // 2. Query colliders within radial threshold
        Collider[] colliders = Physics.OverlapSphere(transform.position, explosionRadius);
        foreach (Collider hit in colliders)
        {
            Rigidbody rb = hit.GetComponent<Rigidbody>();
            if (rb != null)
            {
                rb.AddExplosionForce(explosionForce, transform.position, explosionRadius, upwardsModifier, ForceMode.Impulse);
            }
        }

        // 3. Destroy explosive container object
        Destroy(gameObject);
    }
}
