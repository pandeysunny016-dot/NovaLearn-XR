using UnityEngine;
using Unity.MLAgents;
using Unity.MLAgents.Sensors;
using Unity.MLAgents.Actuators;

/// <summary>
/// Unity ML-Agents Reinforcement Learning Agent.
/// Trains a spherical agent to locate and roll towards a target object.
/// </summary>
public class RollerAgent : Agent
{
    public Transform target;
    public float forceMultiplier = 12.0f;
    private Rigidbody rb;

    public override void Initialize()
    {
        rb = GetComponent<Rigidbody>();
    }

    /// <summary>
    /// Resets agent and target coordinates at the start of every episode.
    /// </summary>
    public override void OnEpisodeBegin()
    {
        // Reset agent position if it fell off the platform
        if (transform.localPosition.y < 0)
        {
            rb.angularVelocity = Vector3.zero;
            rb.velocity = Vector3.zero;
            transform.localPosition = new Vector3(0, 0.5f, 0);
        }

        // Randomize target position on 5x5 platform
        target.localPosition = new Vector3(Random.Range(-4f, 4f), 0.5f, Random.Range(-4f, 4f));
    }

    /// <summary>
    /// Observes state: Target position, Agent position, and Agent velocity.
    /// Total observation dimensions = 8 floats.
    /// </summary>
    public override void CollectObservations(VectorSensor sensor)
    {
        sensor.AddObservation(target.localPosition);
        sensor.AddObservation(transform.localPosition);
        sensor.AddObservation(rb.velocity.x);
        sensor.AddObservation(rb.velocity.z);
    }

    /// <summary>
    /// Applies actions output by neural network and awards rewards/penalties.
    /// </summary>
    public override void OnActionReceived(ActionBuffers actions)
    {
        // Continuous actions: [0] = X-force, [1] = Z-force
        Vector3 controlSignal = Vector3.zero;
        controlSignal.x = actions.ContinuousActions[0];
        controlSignal.z = actions.ContinuousActions[1];
        rb.AddForce(controlSignal * forceMultiplier);

        // Distance evaluation
        float distanceToTarget = Vector3.Distance(transform.localPosition, target.localPosition);

        // Success condition: reached goal
        if (distanceToTarget < 1.4f)
        {
            SetReward(1.0f);
            EndEpisode();
        }
        // Failure condition: fell off platform
        else if (transform.localPosition.y < 0)
        {
            SetReward(-1.0f);
            EndEpisode();
        }
        else
        {
            // Tiny step penalty to incentivize time efficiency
            AddReward(-0.001f);
        }
    }

    /// <summary>
    /// Manual heuristic controls for testing without a trained model.
    /// </summary>
    public override void Heuristic(in ActionBuffers actionsOut)
    {
        var continuousActions = actionsOut.ContinuousActions;
        continuousActions[0] = Input.GetAxis("Horizontal");
        continuousActions[1] = Input.GetAxis("Vertical");
    }
}
