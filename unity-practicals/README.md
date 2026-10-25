# Unity Practical Engineering Lab & Project Setup Guide

This practical suite contains real, production-ready C# scripts and configuration documentation for students completing the **Mobile Virtual Reality and Artificial Intelligence** curriculum in the Unity Editor.

---

## 1. Unity Installation & Environment Setup

1. **Download Unity Hub**: Visit [unity.com/download](https://unity.com/download) and install Unity Hub.
2. **Install Unity Editor LTS**:
   - Install an official LTS release (e.g., Unity 2022.3 LTS or 2023.2 LTS).
   - In Modules, check **Android Build Support** (with Android SDK & NDK tools) for Google Cardboard VR deployments.
3. **Create New Project**:
   - Open Unity Hub → **New Project** → Select **3D (URP)** or standard **3D Core**.
   - Project Name: `NeuralVerse-UnityLab`.

---

## 2. Directory Structure & Script Overview

All scripts are located in `unity-practicals/scripts/`:

```
unity-practicals/
├── README.md
└── scripts/
    ├── PlayerMovement.cs      # Physics-based Rigidbody WASD steering
    ├── CameraFollow.cs        # Smooth interpolated third-person camera
    ├── ExplosionEffect.cs     # OverlapSphere physics force & particle instantiation
    ├── RollerAgent.cs         # Unity ML-Agents Reinforcement Learning (PPO)
    └── GazeInteraction.cs     # Google Cardboard gaze raycasting & reticle activation
```

---

## 3. Unity ML-Agents Training Configuration

For training intelligent agents using Proximal Policy Optimization (PPO), install the Python package:

```bash
pip install mlagents
```

Create a training configuration file `roller_config.yaml`:

```yaml
behaviors:
  RollerBall:
    trainer_type: ppo
    hyperparameters:
      batch_size: 64
      buffer_size: 1024
      learning_rate: 0.0003
      beta: 0.005
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
    network_settings:
      normalize: false
      hidden_units: 128
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 500000
    time_horizon: 64
    summary_freq: 10000
```

Start training via terminal:
```bash
mlagents-learn roller_config.yaml --run-id=RollerExperiment_01
```

---

## 4. Google Cardboard VR Android Deployment

1. In Unity, go to **Window → Package Manager** → Click `+` → **Add package from git URL...**
2. Enter: `https://github.com/googlevr/cardboard-xr-plugin.git`
3. Go to **Edit → Project Settings → XR Plug-in Management** → Enable **Cardboard XR Plugin** under Android.
4. Set Minimum Android API Level to `24` (Android 7.0 Nougat).
5. Switch Platform to Android and click **Build and Run**.
