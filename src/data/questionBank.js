// src/data/questionBank.js — NeuralVerse Quiz Questions
// Organized by module with explanations for correct answers

const questionBank = {
  'mod1': [
    {
      id: 'q1-1',
      question: 'What does HMD stand for in Virtual Reality?',
      options: ['High-Memory Device', 'Head-Mounted Display', 'Hybrid Motion Detector', 'Holographic Media Display'],
      correct: 1,
      explanation: 'HMD stands for Head-Mounted Display, the primary output device in VR that presents stereoscopic images to each eye.'
    },
    {
      id: 'q1-2',
      question: 'Who coined the term "Virtual Reality"?',
      options: ['Ivan Sutherland', 'Palmer Luckey', 'Jaron Lanier', 'Mark Zuckerberg'],
      correct: 2,
      explanation: 'Jaron Lanier coined the term "Virtual Reality" in the 1980s and founded VPL Research, one of the first VR companies.'
    },
    {
      id: 'q1-3',
      question: 'What is the minimum recommended frame rate for VR to avoid motion sickness?',
      options: ['30 FPS', '45 FPS', '60 FPS', '72-90 FPS'],
      correct: 3,
      explanation: 'VR requires at least 72-90 FPS to prevent motion sickness. Lower frame rates cause noticeable lag between head movement and visual response.'
    },
    {
      id: 'q1-4',
      question: 'In Unity, what is a GameObject?',
      options: [
        'A type of C# script',
        'A container for Components that represents entities in a scene',
        'A rendering pipeline',
        'A physics simulation tool'
      ],
      correct: 1,
      explanation: 'A GameObject is the fundamental entity in Unity. It is a container that holds Components (Transform, MeshRenderer, scripts, etc.) which define its behavior and appearance.'
    },
    {
      id: 'q1-5',
      question: 'Which Unity panel shows the properties and components of a selected object?',
      options: ['Hierarchy', 'Scene View', 'Inspector', 'Console'],
      correct: 2,
      explanation: 'The Inspector panel displays all components and their editable properties for the currently selected GameObject.'
    },
    {
      id: 'q1-6',
      question: 'What does the Transform component in Unity control?',
      options: [
        'Audio settings',
        'Position, Rotation, and Scale',
        'Material color',
        'Physics behavior'
      ],
      correct: 1,
      explanation: 'The Transform component stores and controls the Position, Rotation, and Scale of every GameObject in the scene.'
    },
    {
      id: 'q1-7',
      question: 'What is "Presence" in VR terminology?',
      options: [
        'The number of users in a VR session',
        'The psychological feeling of being inside the virtual world',
        'The physical presence of VR hardware',
        'The rendering resolution'
      ],
      correct: 1,
      explanation: 'Presence is the psychological sense of "being there" in the virtual environment, a key goal of effective VR design.'
    },
    {
      id: 'q1-8',
      question: 'Which light type in Unity simulates sunlight?',
      options: ['Point Light', 'Spot Light', 'Area Light', 'Directional Light'],
      correct: 3,
      explanation: 'Directional Light simulates sunlight by casting parallel light rays that affect the entire scene uniformly, regardless of position.'
    },
    {
      id: 'q1-9',
      question: 'What does PBR stand for in rendering?',
      options: [
        'Pixel-Based Rendering',
        'Physically Based Rendering',
        'Progressive Buffer Rendering',
        'Parallel Batch Rendering'
      ],
      correct: 1,
      explanation: 'PBR (Physically Based Rendering) simulates how light interacts with surfaces in a physically accurate way, producing realistic materials.'
    },
    {
      id: 'q1-10',
      question: 'Which Rigidbody property controls whether an object is affected by gravity?',
      options: ['Mass', 'Drag', 'Use Gravity', 'Is Kinematic'],
      correct: 2,
      explanation: 'The Use Gravity checkbox on the Rigidbody component determines whether the object is pulled downward by gravity in the physics simulation.'
    },
    {
      id: 'q1-11',
      question: 'What is stereoscopy in VR?',
      options: [
        'Playing audio in surround sound',
        'Using two slightly different images to create depth perception',
        'Recording video from multiple angles',
        'Projecting images on curved screens'
      ],
      correct: 1,
      explanation: 'Stereoscopy presents slightly different images to each eye, mimicking how human binocular vision perceives depth.'
    },
    {
      id: 'q1-12',
      question: 'What is a Collider component used for in Unity?',
      options: [
        'Displaying textures on objects',
        'Playing animations',
        'Defining the physical shape for collision detection',
        'Managing scene loading'
      ],
      correct: 2,
      explanation: 'Colliders define the physical boundary of a GameObject for collision detection. They can be Box, Sphere, Capsule, or Mesh colliders.'
    }
  ],
  'mod2': [
    {
      id: 'q2-1',
      question: 'What is the correct C# syntax to declare a float variable?',
      options: [
        'float speed = 5.5;',
        'float speed = 5.5f;',
        'var speed = float(5.5);',
        'Float speed = 5.5;'
      ],
      correct: 1,
      explanation: 'In C#, float literals require the "f" suffix (5.5f). Without it, the number is treated as a double, causing a compilation error.'
    },
    {
      id: 'q2-2',
      question: 'Which Unity method is called every frame?',
      options: ['Start()', 'Awake()', 'Update()', 'FixedUpdate()'],
      correct: 2,
      explanation: 'Update() is called once per frame and is the primary method for handling input, animations, and game logic that runs continuously.'
    },
    {
      id: 'q2-3',
      question: 'What does Time.deltaTime represent?',
      options: [
        'Total time since the game started',
        'Time between the current and previous frame',
        'Fixed physics timestep',
        'Time until next frame'
      ],
      correct: 1,
      explanation: 'Time.deltaTime is the time elapsed since the last frame. Multiplying movement by it makes the movement frame-rate independent.'
    },
    {
      id: 'q2-4',
      question: 'What does Input.GetKeyDown(KeyCode.Space) return?',
      options: [
        'True every frame Space is held',
        'True only on the frame Space is first pressed',
        'True when Space is released',
        'The duration Space has been held'
      ],
      correct: 1,
      explanation: 'GetKeyDown returns true only on the single frame when the key is first pressed. Use GetKey for continuous held detection.'
    },
    {
      id: 'q2-5',
      question: 'What access modifier makes a variable visible in the Unity Inspector?',
      options: ['private', 'protected', 'public', 'static'],
      correct: 2,
      explanation: 'Public fields are automatically shown in the Unity Inspector. Use [SerializeField] to show private fields in the Inspector while keeping them inaccessible from other scripts.'
    },
    {
      id: 'q2-6',
      question: 'Which method should be used for physics-based movement?',
      options: ['Update()', 'Start()', 'LateUpdate()', 'FixedUpdate()'],
      correct: 3,
      explanation: 'FixedUpdate() runs at fixed time intervals aligned with the physics simulation. Physics operations (AddForce, MovePosition) should be called here for consistent behavior.'
    },
    {
      id: 'q2-7',
      question: 'What is a Prefab in Unity?',
      options: [
        'A type of shader',
        'A reusable GameObject template stored as an asset',
        'A physics component',
        'A scene management tool'
      ],
      correct: 1,
      explanation: 'A Prefab is a reusable template of a configured GameObject. Changes to the Prefab asset update all its instances across scenes.'
    },
    {
      id: 'q2-8',
      question: 'What does Instantiate() do in Unity?',
      options: [
        'Deletes a GameObject',
        'Pauses the game',
        'Creates a copy of a GameObject or Prefab at runtime',
        'Saves the scene'
      ],
      correct: 2,
      explanation: 'Instantiate creates a runtime clone of a GameObject or Prefab, allowing dynamic spawning of objects during gameplay.'
    },
    {
      id: 'q2-9',
      question: 'Which Canvas render mode is most common for HUD elements?',
      options: [
        'World Space',
        'Screen Space - Camera',
        'Screen Space - Overlay',
        'Camera Space'
      ],
      correct: 2,
      explanation: 'Screen Space - Overlay renders UI on top of all 3D content, making it the standard choice for heads-up displays.'
    },
    {
      id: 'q2-10',
      question: 'What does the [SerializeField] attribute do in C#/Unity?',
      options: [
        'Makes a variable static',
        'Exposes a private field in the Unity Inspector',
        'Converts a variable to JSON',
        'Encrypts the variable value'
      ],
      correct: 1,
      explanation: '[SerializeField] allows a private field to appear in the Unity Inspector for editor configuration while maintaining encapsulation in code.'
    },
    {
      id: 'q2-11',
      question: 'What does Vector3.forward represent in Unity?',
      options: [
        'The direction (1, 0, 0)',
        'The direction (0, 1, 0)',
        'The direction (0, 0, 1)',
        'The direction (0, 0, -1)'
      ],
      correct: 2,
      explanation: 'Vector3.forward is shorthand for new Vector3(0, 0, 1), representing the positive Z-axis direction in Unity\'s coordinate system.'
    },
    {
      id: 'q2-12',
      question: 'What is method overloading in C#?',
      options: [
        'Calling a method too many times',
        'Creating multiple methods with the same name but different parameters',
        'A method that runs in a separate thread',
        'A method that overrides a parent class method'
      ],
      correct: 1,
      explanation: 'Method overloading lets you define multiple methods with the same name but different parameter lists, providing flexible ways to call the same functionality.'
    }
  ],
  'mod3': [
    {
      id: 'q3-1',
      question: 'In Reinforcement Learning, what is the "agent"?',
      options: [
        'The training algorithm',
        'The reward function',
        'The learner and decision-maker that interacts with the environment',
        'The dataset of examples'
      ],
      correct: 2,
      explanation: 'The agent is the entity that observes states, takes actions, and receives rewards. It learns a policy to maximize cumulative reward through interaction with the environment.'
    },
    {
      id: 'q3-2',
      question: 'What does the discount factor (γ) control in Q-Learning?',
      options: [
        'The learning speed',
        'How much the agent values future rewards vs immediate rewards',
        'The exploration probability',
        'The number of episodes'
      ],
      correct: 1,
      explanation: 'The discount factor γ (gamma, 0-1) determines how much future rewards are valued. γ=0 means only immediate rewards matter; γ close to 1 means future rewards are nearly as valuable as immediate ones.'
    },
    {
      id: 'q3-3',
      question: 'What is the Q-Learning update rule?',
      options: [
        'Q(s,a) = R',
        'Q(s,a) ← Q(s,a) + α[R + γ·max Q(s\',a\') − Q(s,a)]',
        'Q(s,a) = Q(s,a) × α',
        'Q(s,a) ← max(R, Q(s,a))'
      ],
      correct: 1,
      explanation: 'The Q-Learning update adjusts the Q-value toward the observed reward plus the discounted best future Q-value, weighted by the learning rate α.'
    },
    {
      id: 'q3-4',
      question: 'In epsilon-greedy exploration, what happens when ε = 1.0?',
      options: [
        'The agent always exploits (chooses best known action)',
        'The agent always explores (chooses random actions)',
        'The agent alternates between exploration and exploitation',
        'The agent stops learning'
      ],
      correct: 1,
      explanation: 'When ε=1.0, the agent chooses random actions 100% of the time (pure exploration). When ε=0.0, it always chooses the best known action (pure exploitation).'
    },
    {
      id: 'q3-5',
      question: 'How many states does the classic Taxi problem have?',
      options: ['25', '100', '500', '1000'],
      correct: 2,
      explanation: 'The Taxi problem has 500 states: 5 (rows) × 5 (columns) × 5 (passenger locations: 4 spots + in taxi) × 4 (destinations) = 500.'
    },
    {
      id: 'q3-6',
      question: 'What does PPO stand for?',
      options: [
        'Parallel Processing Optimization',
        'Proximal Policy Optimization',
        'Predictive Pattern Operation',
        'Progressive Policy Ordering'
      ],
      correct: 1,
      explanation: 'Proximal Policy Optimization is a policy gradient method that updates the policy in small, stable steps using clipped objective functions.'
    },
    {
      id: 'q3-7',
      question: 'What is a Q-table?',
      options: [
        'A table of questions for the quiz',
        'A data structure storing estimated values for every state-action pair',
        'A queue of actions to take',
        'A quality metric for the environment'
      ],
      correct: 1,
      explanation: 'A Q-table is a lookup table where each entry Q(s,a) stores the estimated cumulative future reward for taking action a in state s.'
    },
    {
      id: 'q3-8',
      question: 'What is the main limitation of tabular Q-Learning?',
      options: [
        'It can only work with continuous actions',
        'It requires a neural network',
        'The Q-table size grows exponentially with state/action dimensions',
        'It cannot learn optimal policies'
      ],
      correct: 2,
      explanation: 'Tabular Q-Learning stores values for every state-action pair. As the state space grows, the table becomes impractically large, requiring function approximation (Deep Q-Networks).'
    },
    {
      id: 'q3-9',
      question: 'In Unity ML-Agents, which method sends observations to the neural network?',
      options: [
        'OnEpisodeBegin()',
        'OnActionReceived()',
        'CollectObservations()',
        'SetReward()'
      ],
      correct: 2,
      explanation: 'CollectObservations() is called before each decision. The agent adds relevant state information using sensor.AddObservation() for the neural network to process.'
    },
    {
      id: 'q3-10',
      question: 'What is "epsilon decay" in RL?',
      options: [
        'Decreasing the learning rate over time',
        'Gradually reducing the exploration probability as training progresses',
        'Reducing the discount factor',
        'Decreasing the reward signal'
      ],
      correct: 1,
      explanation: 'Epsilon decay gradually reduces ε from a high value (lots of exploration) to a low value (mostly exploitation), allowing the agent to explore early and refine its policy later.'
    },
    {
      id: 'q3-11',
      question: 'What distinguishes reinforcement learning from supervised learning?',
      options: [
        'RL uses labeled data, supervised learning uses rewards',
        'RL learns from delayed reward signals, supervised learning from labeled examples',
        'RL can only solve game problems',
        'There is no difference, they are the same'
      ],
      correct: 1,
      explanation: 'In supervised learning, the model learns from labeled input-output pairs with immediate feedback. In RL, the agent learns from scalar reward signals that may be delayed, requiring it to figure out which actions led to rewards.'
    },
    {
      id: 'q3-12',
      question: 'What is the purpose of the reward signal in RL?',
      options: [
        'To punish the agent',
        'To tell the agent exactly what actions to take',
        'To provide feedback on how good or bad an action was',
        'To reset the environment'
      ],
      correct: 2,
      explanation: 'The reward signal provides scalar feedback indicating how desirable the outcome of an action was. The agent\'s goal is to learn a policy that maximizes cumulative reward.'
    }
  ],
  'mod4': [
    {
      id: 'q4-1',
      question: 'What does 3DOF tracking measure in mobile VR?',
      options: [
        'Position in X, Y, Z',
        'Rotation only (yaw, pitch, roll)',
        'Both position and rotation',
        'Eye movement'
      ],
      correct: 1,
      explanation: '3DOF (3 Degrees of Freedom) tracks only rotational movement — yaw (left-right), pitch (up-down), and roll (tilt). It cannot track positional movement.'
    },
    {
      id: 'q4-2',
      question: 'What is the main advantage of mobile VR over PC VR?',
      options: [
        'Better graphics quality',
        'Lower cost and easier setup',
        '6DOF tracking',
        'Larger field of view'
      ],
      correct: 1,
      explanation: 'Mobile VR is much cheaper (a basic Cardboard viewer costs ~$15) and requires no external hardware beyond a compatible smartphone, making it very accessible.'
    },
    {
      id: 'q4-3',
      question: 'What is Behavioral Cloning in imitation learning?',
      options: [
        'Copying game assets from one project to another',
        'Training a model to replicate expert actions using supervised learning',
        'Creating clone instances of a Prefab',
        'Duplicating agent behavior parameters'
      ],
      correct: 1,
      explanation: 'Behavioral Cloning treats imitation learning as supervised learning: it collects (state, action) pairs from expert demonstrations and trains a model to predict the expert\'s action given a state.'
    },
    {
      id: 'q4-4',
      question: 'What sensor does Google Cardboard primarily use for head tracking?',
      options: [
        'Camera (visual tracking)',
        'LiDAR',
        'Gyroscope and accelerometer',
        'GPS'
      ],
      correct: 2,
      explanation: 'Google Cardboard uses the phone\'s built-in gyroscope and accelerometer to detect head rotation. It does not have external tracking sensors for positional tracking.'
    },
    {
      id: 'q4-5',
      question: 'What is "gaze interaction" in mobile VR?',
      options: [
        'Using hand gestures to interact',
        'Using voice commands',
        'Looking at objects to select or activate them',
        'Touching the phone screen while in the headset'
      ],
      correct: 2,
      explanation: 'Gaze interaction uses the direction the user is looking (center of the screen) to target objects. A reticle shows the gaze point, and dwelling or pressing a button activates the target.'
    },
    {
      id: 'q4-6',
      question: 'What is the main problem with Behavioral Cloning?',
      options: [
        'It requires too much computing power',
        'Distribution shift — the model encounters unfamiliar states and errors compound',
        'It cannot learn from demonstrations',
        'It only works with discrete actions'
      ],
      correct: 1,
      explanation: 'Behavioral Cloning suffers from distribution shift: small prediction errors lead to states not seen in training data, causing compounding errors and eventual failure.'
    },
    {
      id: 'q4-7',
      question: 'What file format is commonly used to export Blender models to Unity?',
      options: ['.blend', '.psd', '.fbx', '.mp4'],
      correct: 2,
      explanation: 'FBX (.fbx) is the standard interchange format for 3D models between Blender and Unity. It supports geometry, materials, animations, and armatures.'
    },
    {
      id: 'q4-8',
      question: 'What is UV mapping in 3D modeling?',
      options: [
        'Setting up ultraviolet lighting',
        'Projecting a 2D texture onto a 3D surface',
        'Creating UV light effects',
        'Mapping user viewport coordinates'
      ],
      correct: 1,
      explanation: 'UV mapping defines how a 2D texture image wraps around a 3D model surface. U and V are the axes of the 2D texture coordinate space.'
    },
    {
      id: 'q4-9',
      question: 'What is the recommended maximum polygon count for a mobile VR scene?',
      options: ['1 million', '500,000', '100,000', '10 million'],
      correct: 2,
      explanation: 'Mobile VR scenes should stay under ~100,000 polygons total due to the limited GPU processing power of smartphones. This ensures consistent frame rates.'
    },
    {
      id: 'q4-10',
      question: 'What does DAgger stand for in imitation learning?',
      options: [
        'Data Aggregation',
        'Deep Agent Generator',
        'Dataset Aggregation',
        'Distributed Agent'
      ],
      correct: 2,
      explanation: 'DAgger (Dataset Aggregation) improves on Behavioral Cloning by iteratively collecting expert corrections on states the learned policy encounters, expanding the training dataset.'
    },
    {
      id: 'q4-11',
      question: 'Why is maintaining a high frame rate critical in VR?',
      options: [
        'To save battery life',
        'To reduce file size',
        'To prevent motion sickness caused by visual-vestibular mismatch',
        'To improve audio quality'
      ],
      correct: 2,
      explanation: 'Low frame rates in VR create a mismatch between what the inner ear senses (head movement) and what the eyes see (delayed visual response), causing motion sickness.'
    },
    {
      id: 'q4-12',
      question: 'Which approach does Unity ML-Agents support for imitation learning?',
      options: [
        'GAIL only',
        'DAgger only',
        'Behavioral Cloning with demonstration recording',
        'Supervised learning with labeled images'
      ],
      correct: 2,
      explanation: 'Unity ML-Agents supports Behavioral Cloning through its DemonstrationRecorder component and behavioral_cloning configuration, allowing agents to learn from recorded expert gameplay.'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questionBank };
}
