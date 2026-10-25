// src/data/courseData.js — NeuralVerse Course Content
// Complete course structure for Mobile Virtual Reality and Artificial Intelligence

const courseData = {
  title: 'Mobile Virtual Reality and Artificial Intelligence',
  subtitle: 'NPTEL/SWAYAM Course Companion',
  description: 'An interactive learning companion covering Virtual Reality fundamentals, Unity 3D development, C# programming, Deep Reinforcement Learning, and Mobile VR applications.',
  disclaimer: 'This application is an independent learning companion and is not affiliated with or endorsed by NPTEL, SWAYAM, IIT, or any official course provider. All content is original educational material inspired by the course syllabus.',
  modules: [
    {
      id: 'mod1',
      title: 'Virtual Reality & Unity 3D',
      icon: '🥽',
      color: '#00d4ff',
      description: 'Explore the fundamentals of Virtual Reality and learn Unity 3D game engine basics.',
      lessons: [
        {
          id: 'mod1-les1',
          title: 'History & Fundamentals of Virtual Reality',
          objectives: [
            'Understand the evolution of VR technology',
            'Define key VR terminology',
            'Identify the components of a VR system'
          ],
          content: `Virtual Reality (VR) is a computer-generated simulation that creates an immersive, three-dimensional environment users can interact with using specialized hardware.

**Timeline of VR Development:**
- **1960s** — Ivan Sutherland created the first head-mounted display (HMD) called "The Sword of Damocles"
- **1980s** — Jaron Lanier coined the term "Virtual Reality" and founded VPL Research
- **1990s** — Early consumer VR attempts (SEGA VR, Virtual Boy) with limited success
- **2010s** — Palmer Luckey's Oculus Rift Kickstarter reignited consumer VR
- **2020s** — Standalone headsets (Meta Quest), mixed reality, and enterprise VR applications

**Key Components of a VR System:**
1. **Head-Mounted Display (HMD)** — Shows stereoscopic 3D imagery to each eye
2. **Tracking System** — Monitors head position and orientation (6 Degrees of Freedom)
3. **Input Devices** — Controllers, hand tracking, or gesture recognition
4. **Computing Hardware** — GPU and CPU for real-time rendering
5. **Software Platform** — Game engine or VR framework (Unity, Unreal Engine)

**Types of VR:**
- **Non-Immersive VR** — Desktop-based 3D environments (e.g., video games)
- **Semi-Immersive VR** — Large projection systems or CAVE environments
- **Fully Immersive VR** — Complete sensory immersion using HMDs and haptics

**Key Terminology:**
- **Presence** — The psychological feeling of "being there" in the virtual world
- **Latency** — Delay between user action and visual response (should be <20ms)
- **Field of View (FOV)** — The angular extent of the visible environment
- **Frame Rate** — Minimum 72-90 FPS needed to avoid motion sickness
- **Stereoscopy** — Using two slightly different images to create depth perception`,
          terms: ['HMD', 'Presence', 'Latency', 'FOV', 'Stereoscopy', '6DOF', 'Frame Rate'],
          activity: 'Research and list three current VR headsets. Compare their FOV, resolution, and tracking type.',
          relatedTopics: ['mod1-les2', 'mod4-les1']
        },
        {
          id: 'mod1-les2',
          title: 'Applications of Virtual Reality',
          objectives: [
            'Identify major VR application domains',
            'Understand how VR solves real-world problems',
            'Evaluate VR suitability for different use cases'
          ],
          content: `Virtual Reality has expanded far beyond entertainment into numerous professional and educational domains.

**Major Application Areas:**

**1. Gaming & Entertainment**
The largest consumer VR market. Games like Beat Saber, Half-Life: Alyx, and VRChat demonstrate different interaction paradigms. VR cinema and live events are growing sectors.

**2. Education & Training**
- Medical training: Surgical simulations without risk to patients
- Military: Combat and vehicle training simulations
- Industrial: Equipment operation and safety training
- Language learning: Immersive conversation practice

**3. Healthcare**
- Exposure therapy for phobias and PTSD
- Pain management during medical procedures
- Physical rehabilitation with gamified exercises
- Surgical planning using 3D patient models

**4. Architecture & Design**
- Walk through buildings before construction
- Interior design visualization
- Urban planning and city modeling
- Client presentations with immersive walkthroughs

**5. Science & Research**
- Molecular visualization for chemistry and biology
- Astronomical data exploration
- Climate and geological modeling
- Particle physics data visualization

**6. Social & Communication**
- Virtual meetings and collaboration spaces
- Remote presence and telepresence
- Social VR platforms (VRChat, Rec Room)
- Virtual conferences and events

**Evaluating VR Suitability:**
VR is most valuable when:
- Physical risk in real training is high
- Equipment or scenarios are expensive to reproduce
- Spatial understanding is critical
- Emotional engagement enhances learning
- Repetitive practice is needed without real-world consequences`,
          terms: ['Simulation', 'Telepresence', 'Haptic Feedback', 'Immersive Learning'],
          activity: 'Choose one VR application domain and write a proposal for how VR could improve an existing training process.',
          relatedTopics: ['mod1-les1', 'mod4-les1']
        },
        {
          id: 'mod1-les3',
          title: 'Introduction to Unity 3D',
          objectives: [
            'Understand what Unity is and its role in VR development',
            'Learn about Unity editions and licensing',
            'Identify Unity\'s core capabilities'
          ],
          content: `Unity is a cross-platform game engine developed by Unity Technologies. It is one of the most popular engines for VR, AR, mobile, and desktop application development.

**Why Unity for VR?**
- Cross-platform deployment (PC VR, standalone, mobile)
- Built-in VR SDK support (OpenXR, Oculus, SteamVR)
- Large asset store and community
- C# programming language (beginner-friendly)
- Real-time 3D rendering pipeline
- Physics simulation built-in

**Unity Editions:**
- **Unity Personal** — Free for individuals and small studios (revenue < $100K)
- **Unity Plus/Pro** — Paid licenses with additional features and support
- **Unity Student** — Free for verified students

**Core Features:**
1. **Scene System** — Organize game content into scenes (levels, menus)
2. **GameObject Architecture** — Everything in Unity is a GameObject with Components
3. **Component Pattern** — Attach behaviors, physics, rendering to objects
4. **Asset Pipeline** — Import 3D models, textures, audio, animations
5. **Scripting** — C# scripts for game logic and interactivity
6. **Physics Engine** — Rigidbody dynamics, colliders, raycasting
7. **Rendering Pipeline** — Built-in, URP, or HDRP for different quality targets
8. **Animation System** — Animator, Animation Clips, Blend Trees

**Unity vs Other Engines:**
| Feature | Unity | Unreal Engine |
|---------|-------|---------------|
| Language | C# | C++ / Blueprints |
| Learning Curve | Moderate | Steeper |
| VR Support | Excellent | Excellent |
| Mobile | Strong | Good |
| Visual Quality | Good (URP/HDRP) | Industry-leading |
| Asset Store | Very large | Growing |`,
          terms: ['Game Engine', 'Scene', 'GameObject', 'Component', 'C#', 'Asset Pipeline', 'Rendering Pipeline'],
          activity: 'Download Unity Hub and install Unity Editor (LTS version). Create a new 3D project and explore the default scene.',
          relatedTopics: ['mod1-les4', 'mod1-les5']
        },
        {
          id: 'mod1-les4',
          title: 'Unity Editor & Scene Management',
          objectives: [
            'Navigate the Unity Editor interface',
            'Understand the key panels and their functions',
            'Create and manage scenes'
          ],
          content: `The Unity Editor is the main development environment. Understanding its layout is essential for productive development.

**Main Editor Panels:**

**1. Scene View**
- 3D/2D viewport for visual scene editing
- Navigate with right-click + WASD, scroll to zoom, middle-click to pan
- Gizmos show object orientation and selection

**2. Game View**
- Preview of what the player will see through the active camera
- Shows the game running during Play mode
- Aspect ratio and resolution settings available

**3. Hierarchy Panel**
- Tree view of all GameObjects in the current scene
- Parent-child relationships shown through nesting
- Right-click to create new objects

**4. Inspector Panel**
- Shows components and properties of the selected GameObject
- Edit transform (position, rotation, scale)
- Add/remove components
- Modify material, physics, and script properties

**5. Project Panel**
- File browser for all project assets
- Organize assets into folders
- Drag assets into the scene or onto objects

**6. Console Panel**
- Shows debug messages, warnings, and errors
- Use Debug.Log() in scripts to print messages
- Essential for debugging

**Scene Management:**
- Each scene is a .unity file in the project
- Scenes can represent levels, menus, or separate areas
- Use File > New Scene to create scenes
- Build Settings defines which scenes are included in the build
- Scene loading: SceneManager.LoadScene("SceneName")

**Transform Tool Shortcuts:**
- W — Move tool
- E — Rotate tool
- R — Scale tool
- T — Rect tool (for UI elements)
- Y — Transform tool (combined)`,
          terms: ['Scene View', 'Game View', 'Hierarchy', 'Inspector', 'Project Panel', 'Console', 'Transform'],
          activity: 'Create a new Unity scene. Add a Cube, Sphere, and Plane. Position them using the Transform tools. Save the scene.',
          relatedTopics: ['mod1-les3', 'mod1-les5']
        },
        {
          id: 'mod1-les5',
          title: 'GameObjects & 3D Primitives',
          objectives: [
            'Create and manipulate GameObjects',
            'Use primitive 3D shapes',
            'Understand the Transform component'
          ],
          content: `In Unity, everything in a scene is a **GameObject**. A GameObject is a container that holds **Components** which define its behavior and appearance.

**Creating GameObjects:**
- Menu: GameObject > 3D Object > [Cube/Sphere/Cylinder/Plane/Capsule]
- Or right-click in Hierarchy > 3D Object

**Built-in 3D Primitives:**
1. **Cube** — 1x1x1 unit box. Useful for walls, platforms, boxes
2. **Sphere** — 1-unit diameter sphere. Useful for balls, planets, particles
3. **Cylinder** — 1-unit diameter, 2-unit height. Useful for pillars, tree trunks
4. **Capsule** — Rounded cylinder. Often used for character colliders
5. **Plane** — Flat 10x10 unit surface. Ground, floors, walls
6. **Quad** — Single-sided flat surface. UI elements, billboards

**The Transform Component:**
Every GameObject has a Transform with three properties:
- **Position** (x, y, z) — Location in world or local space
- **Rotation** (x, y, z) — Euler angles in degrees
- **Scale** (x, y, z) — Size multiplier (1 = default)

**Parent-Child Relationships:**
- Drag one object onto another in the Hierarchy to parent it
- Child objects inherit parent transforms
- Child position/rotation/scale are relative to parent
- Moving parent moves all children
- Useful for grouping and complex objects

**C# Transform Access:**
\`\`\`csharp
// Move object to position (3, 1, 0)
transform.position = new Vector3(3f, 1f, 0f);

// Rotate 45 degrees around Y axis
transform.Rotate(0f, 45f, 0f);

// Double the size
transform.localScale = new Vector3(2f, 2f, 2f);

// Move forward over time
transform.Translate(Vector3.forward * speed * Time.deltaTime);
\`\`\``,
          terms: ['GameObject', 'Component', 'Transform', 'Position', 'Rotation', 'Scale', 'Primitive', 'Hierarchy'],
          activity: 'Use the interactive 3D Cube Demo in NeuralVerse to experiment with position, rotation, scale, and color changes.',
          relatedTopics: ['mod1-les4', 'mod1-les6'],
          hasSimulation: 'cubeDemo'
        },
        {
          id: 'mod1-les6',
          title: 'Materials & Lighting',
          objectives: [
            'Apply materials and colors to objects',
            'Configure lighting in a Unity scene',
            'Understand rendering basics'
          ],
          content: `Materials define how surfaces look. Lighting determines how those surfaces are illuminated.

**Materials:**
A Material in Unity combines a Shader with texture/color properties.

Creating a Material:
1. Right-click in Project > Create > Material
2. Select the material in Inspector
3. Change Albedo (base color), Metallic, Smoothness
4. Drag material onto a GameObject

**Key Material Properties:**
- **Albedo** — Base color or texture
- **Metallic** — How metal-like the surface appears (0 = non-metal, 1 = full metal)
- **Smoothness** — Surface roughness (0 = rough/matte, 1 = mirror-smooth)
- **Normal Map** — Adds surface detail without extra geometry
- **Emission** — Makes the surface glow / emit light

**Shaders:**
Shaders are programs that run on the GPU to calculate pixel colors.
- Standard Shader — PBR (Physically Based Rendering) for realistic materials
- Unlit Shader — No lighting calculations, flat color
- Custom Shaders — Written in HLSL or using Shader Graph

**Lighting Types:**
1. **Directional Light** — Simulates sunlight. Affects entire scene uniformly
2. **Point Light** — Emits light in all directions from a point (like a light bulb)
3. **Spot Light** — Cone-shaped light (like a flashlight)
4. **Area Light** — Rectangle-shaped light (baked only)

**Lighting Modes:**
- **Realtime** — Calculated every frame. Dynamic but expensive
- **Baked** — Pre-calculated and stored in lightmaps. Static but efficient
- **Mixed** — Combination of both

**Shadows:**
- Each light can cast shadows (Hard or Soft)
- Shadow Distance affects performance
- Shadow Resolution: Low/Medium/High/Very High`,
          terms: ['Material', 'Shader', 'Albedo', 'PBR', 'Directional Light', 'Point Light', 'Spot Light', 'Baked Lighting'],
          activity: 'In Unity, create three cubes with different materials: one metallic, one matte, one emissive. Add a Point Light and observe the differences.',
          relatedTopics: ['mod1-les5', 'mod1-les7']
        },
        {
          id: 'mod1-les7',
          title: 'Particle Systems & Physics',
          objectives: [
            'Create particle effects in Unity',
            'Configure Rigidbody physics',
            'Set up colliders and triggers'
          ],
          content: `Particle systems create visual effects like fire, smoke, sparks, and explosions. Physics simulation handles gravity, collisions, and forces.

**Particle System:**
Create: GameObject > Effects > Particle System

**Key Particle Properties:**
- **Duration** — How long the system runs
- **Start Lifetime** — How long each particle lives
- **Start Speed** — Initial velocity
- **Start Size** — Initial particle size
- **Start Color** — Particle color (can be gradient)
- **Emission Rate** — Particles per second
- **Shape** — Emission shape (cone, sphere, box, edge)
- **Gravity Modifier** — How much gravity affects particles

**Common Particle Modules:**
- Color over Lifetime — Fade in/out
- Size over Lifetime — Grow or shrink
- Velocity over Lifetime — Wind or drift
- Noise — Random movement for natural look
- Renderer — Billboard, mesh, or trail rendering

**Physics — Rigidbody Component:**
A Rigidbody makes a GameObject subject to physics simulation.

Properties:
- **Mass** — Weight of the object (kilograms)
- **Drag** — Air resistance (slows movement)
- **Angular Drag** — Rotational resistance
- **Use Gravity** — Enable/disable gravity
- **Is Kinematic** — If true, not affected by physics forces (moved by script only)

**Colliders:**
Colliders define the physical shape for collision detection.
- **Box Collider** — Rectangular collision bounds
- **Sphere Collider** — Spherical bounds
- **Capsule Collider** — Rounded cylinder
- **Mesh Collider** — Matches exact mesh shape (expensive)

**Collision Detection:**
\`\`\`csharp
void OnCollisionEnter(Collision collision) {
    Debug.Log("Hit: " + collision.gameObject.name);
}

void OnTriggerEnter(Collider other) {
    Debug.Log("Entered trigger: " + other.gameObject.name);
}
\`\`\`

**Physics Forces:**
\`\`\`csharp
Rigidbody rb = GetComponent<Rigidbody>();
rb.AddForce(Vector3.up * 10f, ForceMode.Impulse);
rb.AddTorque(Vector3.right * 5f);
\`\`\``,
          terms: ['Particle System', 'Rigidbody', 'Collider', 'Trigger', 'Mass', 'Gravity', 'ForceMode'],
          activity: 'Create a scene with a Sphere (Rigidbody) falling onto a Plane (Collider). Add a Particle System to the sphere. Observe the physics simulation.',
          relatedTopics: ['mod1-les6', 'mod1-les8']
        },
        {
          id: 'mod1-les8',
          title: 'Unity Asset Store & Project Organization',
          objectives: [
            'Navigate and use the Unity Asset Store',
            'Organize a Unity project properly',
            'Import and manage external assets'
          ],
          content: `The Unity Asset Store provides free and paid assets: 3D models, textures, scripts, audio, animations, and complete project templates.

**Accessing the Asset Store:**
- Window > Asset Store (opens in browser)
- Or visit: assetstore.unity.com
- Free assets available for learning

**Types of Assets:**
- **3D Models** — Characters, environments, props
- **2D Assets** — Sprites, UI elements, icons
- **Audio** — Sound effects, music
- **Scripts/Tools** — Editor extensions, gameplay scripts
- **Shaders** — Custom visual effects
- **Templates** — Complete starter projects

**Importing Assets:**
1. Purchase/download from Asset Store
2. Open Package Manager (Window > Package Manager)
3. Select "My Assets" tab
4. Click Import
5. Select which files to import

**Project Organization Best Practices:**
\`\`\`
Assets/
├── _Scenes/          # All scene files
├── Scripts/          # C# scripts
│   ├── Player/
│   ├── UI/
│   └── Managers/
├── Materials/        # Material assets
├── Textures/         # Texture files
├── Models/           # 3D model files
├── Prefabs/          # Prefab assets
├── Audio/            # Sound files
│   ├── Music/
│   └── SFX/
├── Animations/       # Animation clips
├── UI/               # UI sprites and assets
└── Plugins/          # Third-party plugins
\`\`\`

**Naming Conventions:**
- Use PascalCase for scripts: PlayerController.cs
- Use descriptive names: WoodFloor_Diffuse.png
- Prefix materials: MAT_WoodFloor
- Prefix prefabs: PFB_Enemy

**Version Control:**
- Use Git with Unity-specific .gitignore
- Use Visible Meta Files (Edit > Project Settings > Editor)
- Avoid committing Library/ and Temp/ folders`,
          terms: ['Asset Store', 'Package Manager', 'Import', 'Prefab', 'Version Control'],
          activity: 'Browse the Unity Asset Store and find a free 3D environment pack. Import it into your project and explore the included assets.',
          relatedTopics: ['mod1-les3', 'mod2-les9']
        }
      ]
    },
    {
      id: 'mod2',
      title: 'C# Programming & Interaction',
      icon: '💻',
      color: '#a855f7',
      description: 'Learn C# programming fundamentals and build interactive Unity gameplay mechanics.',
      lessons: [
        {
          id: 'mod2-les1',
          title: 'C# Variables & Data Types',
          objectives: [
            'Declare and use variables in C#',
            'Understand common data types',
            'Use type conversion and string formatting'
          ],
          content: `C# (C-Sharp) is a strongly-typed, object-oriented programming language used for Unity scripting. Every Unity behavior is written as a C# class attached to a GameObject.

**Variable Declaration:**
\`\`\`csharp
// Syntax: type variableName = value;
int score = 0;
float speed = 5.5f;       // 'f' suffix for float literals
string playerName = "Hero";
bool isAlive = true;
\`\`\`

**Common Data Types:**
| Type | Description | Example |
|------|-------------|---------|
| int | Whole numbers | 42, -10, 0 |
| float | Decimal numbers (32-bit) | 3.14f, -0.5f |
| double | Decimal numbers (64-bit) | 3.14159265 |
| string | Text | "Hello World" |
| bool | True/False | true, false |
| char | Single character | 'A', '7' |
| Vector3 | 3D coordinates | new Vector3(1, 2, 3) |

**Access Modifiers:**
\`\`\`csharp
public int health = 100;    // Visible in Inspector, accessible from other scripts
private int secretCode = 42; // Hidden, only this script can access
[SerializeField] private int armor = 50; // Hidden from other scripts, visible in Inspector
\`\`\`

**Constants and Readonly:**
\`\`\`csharp
const float GRAVITY = 9.81f;    // Cannot change after declaration
readonly int maxLevel = 50;      // Set once, in constructor or declaration
\`\`\`

**Type Conversion:**
\`\`\`csharp
int wholeNumber = (int)3.7f;      // Explicit cast: 3
float decimal1 = 5;                // Implicit: 5.0f
string text = score.ToString();    // Convert to string
int parsed = int.Parse("42");     // Parse string to int
\`\`\`

**String Formatting:**
\`\`\`csharp
string msg = $"Score: {score}, Name: {playerName}";
string formatted = string.Format("Level {0}: {1}", level, levelName);
\`\`\`

**Unity-Specific Types:**
\`\`\`csharp
Vector3 position = new Vector3(0, 1, 0);
Quaternion rotation = Quaternion.identity;
Color color = Color.red;
\`\`\``,
          terms: ['Variable', 'Data Type', 'int', 'float', 'string', 'bool', 'Vector3', 'Access Modifier', 'SerializeField'],
          activity: 'Create a C# script in Unity that declares variables for a player: name, health, speed, and isAlive. Print them to the Console using Debug.Log().',
          relatedTopics: ['mod2-les2', 'mod2-les3']
        },
        {
          id: 'mod2-les2',
          title: 'Methods & Functions',
          objectives: [
            'Define and call methods in C#',
            'Understand parameters and return types',
            'Use Unity lifecycle methods'
          ],
          content: `Methods (also called functions) are reusable blocks of code that perform specific tasks.

**Basic Method Syntax:**
\`\`\`csharp
// returnType MethodName(parameters)
void SayHello() {
    Debug.Log("Hello, World!");
}

int Add(int a, int b) {
    return a + b;
}

float CalculateDamage(float baseDamage, float multiplier) {
    return baseDamage * multiplier;
}
\`\`\`

**Calling Methods:**
\`\`\`csharp
SayHello();                    // Prints: Hello, World!
int result = Add(3, 5);       // result = 8
float dmg = CalculateDamage(10f, 1.5f); // dmg = 15.0
\`\`\`

**Unity Lifecycle Methods:**
These methods are called automatically by Unity at specific times:

\`\`\`csharp
public class PlayerScript : MonoBehaviour {
    void Awake() {
        // Called once when script instance is loaded
        // Initialize references here
    }

    void Start() {
        // Called once before the first frame
        // Setup game state here
    }

    void Update() {
        // Called every frame
        // Handle input and game logic here
    }

    void FixedUpdate() {
        // Called at fixed time intervals (physics)
        // Apply forces and physics changes here
    }

    void LateUpdate() {
        // Called after all Update methods
        // Camera follow logic goes here
    }

    void OnDestroy() {
        // Called when the object is destroyed
        // Cleanup here
    }
}
\`\`\`

**Method Overloading:**
\`\`\`csharp
void Attack() { /* default attack */ }
void Attack(float damage) { /* attack with specific damage */ }
void Attack(float damage, string type) { /* typed attack */ }
\`\`\`

**Optional Parameters:**
\`\`\`csharp
void Move(float speed, float direction = 0f) {
    // direction defaults to 0 if not provided
}
\`\`\``,
          terms: ['Method', 'Function', 'Return Type', 'Parameter', 'void', 'MonoBehaviour', 'Start', 'Update', 'FixedUpdate'],
          activity: 'Write a C# script with a TakeDamage(int amount) method that reduces health and prints the remaining health.',
          relatedTopics: ['mod2-les1', 'mod2-les3']
        },
        {
          id: 'mod2-les3',
          title: 'Conditionals & Loops',
          objectives: [
            'Use if/else and switch statements',
            'Implement for, while, and foreach loops',
            'Apply control flow in game logic'
          ],
          content: `Control flow statements determine which code runs and how many times.

**If/Else Statements:**
\`\`\`csharp
if (health <= 0) {
    Debug.Log("Game Over!");
    isAlive = false;
} else if (health < 25) {
    Debug.Log("Low health warning!");
} else {
    Debug.Log("Health OK: " + health);
}
\`\`\`

**Switch Statement:**
\`\`\`csharp
switch (weaponType) {
    case "Sword":
        damage = 25;
        break;
    case "Bow":
        damage = 15;
        break;
    case "Staff":
        damage = 35;
        break;
    default:
        damage = 10;
        break;
}
\`\`\`

**Comparison Operators:**
| Operator | Meaning |
|----------|---------|
| == | Equal to |
| != | Not equal |
| < | Less than |
| > | Greater than |
| <= | Less than or equal |
| >= | Greater than or equal |

**Logical Operators:**
| Operator | Meaning |
|----------|---------|
| && | AND |
| \\|\\| | OR |
| ! | NOT |

**For Loop:**
\`\`\`csharp
for (int i = 0; i < 10; i++) {
    Debug.Log("Iteration: " + i);
}
\`\`\`

**While Loop:**
\`\`\`csharp
int count = 0;
while (count < 5) {
    Debug.Log("Count: " + count);
    count++;
}
\`\`\`

**Foreach Loop:**
\`\`\`csharp
string[] items = { "Sword", "Shield", "Potion" };
foreach (string item in items) {
    Debug.Log("Item: " + item);
}
\`\`\`

**Game Logic Example:**
\`\`\`csharp
void Update() {
    // Check if player collected all coins
    if (coinsCollected >= totalCoins && !levelComplete) {
        levelComplete = true;
        Debug.Log("Level Complete!");
    }
}
\`\`\``,
          terms: ['if', 'else', 'switch', 'for loop', 'while loop', 'foreach', 'Logical Operator', 'Comparison Operator'],
          activity: 'Write a script that uses a for loop to spawn 5 cubes at different positions, and an if statement to color them based on their index.',
          relatedTopics: ['mod2-les2', 'mod2-les4']
        },
        {
          id: 'mod2-les4',
          title: 'Keyboard Input & Player Movement',
          objectives: [
            'Read keyboard input in Unity',
            'Move a GameObject with scripts',
            'Implement smooth character movement'
          ],
          content: `Unity provides Input methods to read keyboard, mouse, and controller input. Combined with Transform manipulation, this creates player movement.

**Reading Keyboard Input:**
\`\`\`csharp
void Update() {
    // Check specific keys
    if (Input.GetKeyDown(KeyCode.Space)) {
        Debug.Log("Space pressed!");
        Jump();
    }
    
    if (Input.GetKey(KeyCode.LeftShift)) {
        // Held down — sprinting
        speed = sprintSpeed;
    }
    
    if (Input.GetKeyUp(KeyCode.LeftShift)) {
        // Released
        speed = normalSpeed;
    }
}
\`\`\`

**Input Methods:**
- \`GetKeyDown(key)\` — True on the frame the key is pressed
- \`GetKey(key)\` — True every frame the key is held
- \`GetKeyUp(key)\` — True on the frame the key is released

**Axis-Based Input:**
\`\`\`csharp
void Update() {
    // Returns -1 to 1 based on arrow keys / WASD
    float horizontal = Input.GetAxis("Horizontal"); // A/D or Left/Right
    float vertical = Input.GetAxis("Vertical");     // W/S or Up/Down
    
    Vector3 movement = new Vector3(horizontal, 0, vertical);
    transform.Translate(movement * speed * Time.deltaTime);
}
\`\`\`

**Complete Player Movement Script:**
\`\`\`csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour {
    public float moveSpeed = 5f;
    public float rotateSpeed = 100f;
    
    private Rigidbody rb;
    
    void Start() {
        rb = GetComponent<Rigidbody>();
    }
    
    void FixedUpdate() {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        
        // Move
        Vector3 movement = transform.forward * v * moveSpeed;
        rb.MovePosition(rb.position + movement * Time.fixedDeltaTime);
        
        // Rotate
        float turn = h * rotateSpeed * Time.fixedDeltaTime;
        Quaternion turnRotation = Quaternion.Euler(0f, turn, 0f);
        rb.MoveRotation(rb.rotation * turnRotation);
    }
}
\`\`\`

**Time.deltaTime:**
Multiplying movement by Time.deltaTime makes it frame-rate independent. Without it, faster computers would move the player faster.

**Important Notes:**
- Use Update() for input detection
- Use FixedUpdate() for physics-based movement
- Always multiply by Time.deltaTime or Time.fixedDeltaTime`,
          terms: ['Input', 'GetAxis', 'KeyCode', 'Time.deltaTime', 'Translate', 'MovePosition', 'FixedUpdate'],
          activity: 'Try the interactive Movement Demo in NeuralVerse. Then create a Unity script that moves a cube with WASD keys.',
          relatedTopics: ['mod2-les3', 'mod2-les5'],
          hasSimulation: 'movementDemo'
        },
        {
          id: 'mod2-les5',
          title: 'Camera Systems',
          objectives: [
            'Set up different camera types',
            'Implement camera following',
            'Create a camera switching system'
          ],
          content: `The Camera component renders the scene from its perspective. Games often use multiple cameras for different views.

**Camera Types:**
1. **Static Camera** — Fixed position, doesn't move
2. **Follow Camera** — Follows the player with offset
3. **First-Person Camera** — Attached to player, sees through their eyes
4. **Third-Person Camera** — Behind and above the player
5. **Orbit Camera** — Rotates around a target point

**Simple Follow Camera:**
\`\`\`csharp
using UnityEngine;

public class CameraFollow : MonoBehaviour {
    public Transform target;       // Player to follow
    public Vector3 offset = new Vector3(0, 5, -10);
    public float smoothSpeed = 5f;
    
    void LateUpdate() {
        if (target == null) return;
        
        Vector3 desiredPosition = target.position + offset;
        Vector3 smoothed = Vector3.Lerp(
            transform.position, 
            desiredPosition, 
            smoothSpeed * Time.deltaTime
        );
        transform.position = smoothed;
        transform.LookAt(target);
    }
}
\`\`\`

**Camera Switching System:**
\`\`\`csharp
using UnityEngine;

public class CameraSwitcher : MonoBehaviour {
    public Camera[] cameras;
    private int currentCam = 0;
    
    void Start() {
        // Disable all cameras except the first
        for (int i = 0; i < cameras.Length; i++) {
            cameras[i].gameObject.SetActive(i == 0);
        }
    }
    
    void Update() {
        if (Input.GetKeyDown(KeyCode.C)) {
            // Disable current camera
            cameras[currentCam].gameObject.SetActive(false);
            
            // Move to next camera (cycle)
            currentCam = (currentCam + 1) % cameras.Length;
            
            // Enable new camera
            cameras[currentCam].gameObject.SetActive(true);
            Debug.Log("Switched to camera: " + currentCam);
        }
    }
}
\`\`\`

**Cinemachine (Recommended):**
Unity's Cinemachine package provides professional camera behaviors without custom code:
- Virtual Cameras with blend transitions
- Follow and Look At targets
- Noise (camera shake)
- Dolly tracks
- Framing and composition tools

Install via Package Manager > Unity Registry > Cinemachine`,
          terms: ['Camera', 'Follow Camera', 'LateUpdate', 'Lerp', 'LookAt', 'Cinemachine', 'Camera Switching'],
          activity: 'Set up two cameras in Unity: a follow camera and a top-down camera. Write a script to switch between them with the C key.',
          relatedTopics: ['mod2-les4', 'mod2-les6']
        },
        {
          id: 'mod2-les6',
          title: 'UI Menus & HUD',
          objectives: [
            'Create Unity UI elements',
            'Build a main menu',
            'Display a heads-up display (HUD)'
          ],
          content: `Unity's UI system uses Canvas-based elements for menus, HUDs, and interactive interfaces.

**Creating UI:**
1. Right-click Hierarchy > UI > Canvas
2. Add UI elements as children of Canvas:
   - Text (TextMeshPro recommended)
   - Button
   - Image
   - Slider
   - Toggle
   - Input Field
   - Panel

**Canvas Settings:**
- **Screen Space - Overlay** — UI drawn on top of everything (most common for HUD)
- **Screen Space - Camera** — UI rendered by a specific camera
- **World Space** — UI exists in 3D space (for VR or in-game screens)

**Main Menu Script:**
\`\`\`csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour {
    public void PlayGame() {
        SceneManager.LoadScene("GameScene");
    }
    
    public void OpenSettings() {
        // Show settings panel
        settingsPanel.SetActive(true);
    }
    
    public void QuitGame() {
        Debug.Log("Quitting...");
        Application.Quit();
    }
}
\`\`\`

**HUD Score Display:**
\`\`\`csharp
using UnityEngine;
using TMPro;

public class HUDManager : MonoBehaviour {
    public TextMeshProUGUI scoreText;
    public TextMeshProUGUI healthText;
    public Slider healthBar;
    
    public void UpdateScore(int score) {
        scoreText.text = $"Score: {score}";
    }
    
    public void UpdateHealth(float current, float max) {
        healthText.text = $"HP: {current}/{max}";
        healthBar.value = current / max;
    }
}
\`\`\`

**Button Events:**
1. Select Button in Hierarchy
2. In Inspector, find Button component
3. Under On Click(), click +
4. Drag the script's GameObject
5. Select the function to call

**Anchoring UI Elements:**
- Anchors determine how elements resize with screen
- Top-left anchor for score/health displays
- Center anchor for menus
- Use Anchor Presets (Inspector > Rect Transform > anchor button)`,
          terms: ['Canvas', 'UI', 'Button', 'TextMeshPro', 'HUD', 'SceneManager', 'Anchor', 'Rect Transform'],
          activity: 'Create a simple main menu in Unity with Play, Settings, and Quit buttons. Connect them to a MainMenu script.',
          relatedTopics: ['mod2-les5', 'mod2-les7']
        },
        {
          id: 'mod2-les7',
          title: 'Prefabs & Instantiation',
          objectives: [
            'Create and use Prefabs',
            'Instantiate objects at runtime',
            'Use Object Pooling for efficiency'
          ],
          content: `Prefabs are reusable GameObject templates. They allow you to create, configure, and store a complete object with all its components and properties.

**Creating a Prefab:**
1. Set up a GameObject in the scene with desired components
2. Drag it from Hierarchy into the Project panel
3. The original becomes a Prefab Instance (blue text in Hierarchy)
4. Delete the scene instance — the Prefab asset remains

**Prefab Benefits:**
- Change the Prefab asset → all instances update
- Spawn copies at runtime
- Consistent configuration across scenes
- Version-controlled asset

**Instantiating Prefabs:**
\`\`\`csharp
using UnityEngine;

public class Spawner : MonoBehaviour {
    public GameObject enemyPrefab;
    public Transform spawnPoint;
    
    void Update() {
        if (Input.GetKeyDown(KeyCode.E)) {
            SpawnEnemy();
        }
    }
    
    void SpawnEnemy() {
        GameObject enemy = Instantiate(
            enemyPrefab,
            spawnPoint.position,
            spawnPoint.rotation
        );
        
        // Optional: modify the spawned object
        enemy.name = "Enemy_" + Time.time;
        
        // Destroy after 10 seconds
        Destroy(enemy, 10f);
    }
}
\`\`\`

**Projectile Example:**
\`\`\`csharp
public class Shooter : MonoBehaviour {
    public GameObject bulletPrefab;
    public float bulletSpeed = 20f;
    
    void Update() {
        if (Input.GetMouseButtonDown(0)) {
            GameObject bullet = Instantiate(
                bulletPrefab, 
                transform.position, 
                transform.rotation
            );
            Rigidbody rb = bullet.GetComponent<Rigidbody>();
            rb.velocity = transform.forward * bulletSpeed;
            Destroy(bullet, 5f); // Cleanup
        }
    }
}
\`\`\`

**Prefab Variants:**
- Create variations of a base Prefab
- Override specific properties while inheriting others
- Right-click Prefab > Create > Prefab Variant`,
          terms: ['Prefab', 'Instantiate', 'Destroy', 'Object Pooling', 'Prefab Variant', 'Runtime Spawning'],
          activity: 'Create a Cube Prefab in Unity. Write a script that spawns copies when you press the E key at random positions.',
          relatedTopics: ['mod2-les6', 'mod2-les8']
        },
        {
          id: 'mod2-les8',
          title: 'Particle Effects & Explosions',
          objectives: [
            'Create explosion effects',
            'Trigger particles from scripts',
            'Combine multiple particle systems'
          ],
          content: `Combining particle systems, audio, and physics creates compelling explosion and destruction effects.

**Creating an Explosion Effect:**

Step 1: Create the Particle System
\`\`\`
GameObject > Effects > Particle System
\`\`\`

Step 2: Configure for explosion:
- Duration: 0.5
- Looping: false
- Start Lifetime: 0.3 – 1.0 (random)
- Start Speed: 5 – 15 (random)
- Start Size: 0.5 – 2.0 (random)
- Start Color: Orange to Red gradient
- Gravity Modifier: 1
- Simulation Space: World
- Emission: Burst of 30-50 particles
- Shape: Sphere, radius 0.5

**Triggering from Script:**
\`\`\`csharp
using UnityEngine;

public class Explosive : MonoBehaviour {
    public GameObject explosionPrefab;
    public float explosionForce = 500f;
    public float explosionRadius = 5f;
    
    public void Explode() {
        // Spawn explosion effect
        GameObject fx = Instantiate(
            explosionPrefab, 
            transform.position, 
            Quaternion.identity
        );
        
        // Apply force to nearby rigidbodies
        Collider[] colliders = Physics.OverlapSphere(
            transform.position, explosionRadius
        );
        
        foreach (Collider hit in colliders) {
            Rigidbody rb = hit.GetComponent<Rigidbody>();
            if (rb != null) {
                rb.AddExplosionForce(
                    explosionForce, 
                    transform.position, 
                    explosionRadius
                );
            }
        }
        
        // Cleanup
        Destroy(fx, 2f);
        Destroy(gameObject);
    }
}
\`\`\`

**Layered Explosion (Multiple Systems):**
Create a parent empty GameObject with children:
1. Flash — Quick bright burst (Start Lifetime: 0.1, large size, emissive)
2. Fireball — Main explosion (orange/red, burst emission)
3. Sparks — Small bright particles (high speed, gravity)
4. Smoke — Dark particles (slow, long lifetime, grow over time)
5. Debris — Mesh particles or physics objects

**Audio Integration:**
\`\`\`csharp
public AudioClip explosionSound;
AudioSource.PlayClipAtPoint(explosionSound, transform.position);
\`\`\``,
          terms: ['Particle Burst', 'Explosion Force', 'OverlapSphere', 'AddExplosionForce', 'Particle Layers'],
          activity: 'Try the Particle Demo in NeuralVerse. Then recreate a multi-layered explosion in Unity using at least 3 particle sub-systems.',
          relatedTopics: ['mod2-les7', 'mod1-les7']
        }
      ]
    },
    {
      id: 'mod3',
      title: 'Deep Reinforcement Learning',
      icon: '🧠',
      color: '#10b981',
      description: 'Master reinforcement learning concepts from Q-Learning to Unity ML-Agents.',
      lessons: [
        {
          id: 'mod3-les1',
          title: 'Introduction to Reinforcement Learning',
          objectives: [
            'Define reinforcement learning and its key elements',
            'Distinguish RL from supervised and unsupervised learning',
            'Understand the agent-environment interaction loop'
          ],
          content: `Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment. The agent receives rewards or penalties based on its actions and learns to maximize cumulative reward over time.

**RL vs Other ML Paradigms:**
| Aspect | Supervised Learning | Unsupervised Learning | Reinforcement Learning |
|--------|-------------------|----------------------|----------------------|
| Data | Labeled examples | Unlabeled data | Rewards from environment |
| Goal | Predict labels | Find patterns | Maximize reward |
| Feedback | Immediate, correct answer | None | Delayed, scalar reward |
| Example | Image classification | Clustering | Game playing |

**The RL Framework:**

The agent-environment interaction follows this cycle:
1. Agent observes the current **State** (S)
2. Agent selects an **Action** (A) based on its **Policy** (π)
3. Environment transitions to a new **State** (S')
4. Environment provides a **Reward** (R)
5. Agent updates its knowledge
6. Repeat

**Key Components:**
- **Agent** — The learner and decision-maker
- **Environment** — The world the agent interacts with
- **State (S)** — Current situation description
- **Action (A)** — What the agent can do
- **Reward (R)** — Numeric feedback signal (+/- value)
- **Policy (π)** — The agent's strategy: mapping states to actions
- **Value Function V(s)** — Expected future reward from state s
- **Q-Function Q(s,a)** — Expected future reward for taking action a in state s

**Types of RL:**
- **Model-Free** — Agent doesn't know environment dynamics (Q-Learning, SARSA)
- **Model-Based** — Agent has/learns a model of the environment
- **On-Policy** — Learns from current policy's actions (SARSA)
- **Off-Policy** — Can learn from any policy's actions (Q-Learning)

**Real-World RL Applications:**
- Game playing (AlphaGo, Atari, StarCraft)
- Robotics control
- Autonomous driving
- Resource management
- Recommendation systems
- NPC behavior in games`,
          terms: ['Agent', 'Environment', 'State', 'Action', 'Reward', 'Policy', 'Value Function', 'Q-Function', 'Model-Free', 'On-Policy', 'Off-Policy'],
          activity: 'Identify 3 everyday scenarios that can be modeled as RL problems. Define the agent, environment, states, actions, and rewards for each.',
          relatedTopics: ['mod3-les2', 'mod3-les3']
        },
        {
          id: 'mod3-les2',
          title: 'Q-Learning Algorithm',
          objectives: [
            'Understand the Q-Learning update rule',
            'Implement a Q-table',
            'Trace through Q-value updates by hand'
          ],
          content: `Q-Learning is a model-free, off-policy RL algorithm that learns the value of state-action pairs without needing a model of the environment.

**The Q-Table:**
A Q-table stores estimated values for every (state, action) pair:

| State | Up | Down | Left | Right |
|-------|-----|------|------|-------|
| (0,0) | 0.0 | 0.5 | 0.0 | 0.8 |
| (0,1) | 0.3 | 0.0 | 0.7 | 0.2 |
| ... | ... | ... | ... | ... |

The agent looks up its current state, picks the action with the highest Q-value (or explores randomly).

**Q-Learning Update Rule:**
\`\`\`
Q(s, a) ← Q(s, a) + α × [R + γ × max Q(s', a') − Q(s, a)]
\`\`\`

Where:
- **Q(s, a)** — Current Q-value for state s, action a
- **α (alpha)** — Learning rate (0 < α ≤ 1). How much to update. Higher = faster but unstable
- **R** — Reward received after taking action a
- **γ (gamma)** — Discount factor (0 ≤ γ < 1). How much to value future rewards
- **max Q(s', a')** — Best Q-value in the next state (greedy future estimate)

**Step-by-Step Example:**
Initial: Q(s, Right) = 0.0, α = 0.1, γ = 0.9

1. In state s, take action Right
2. Receive reward R = 1
3. Arrive at state s' where max Q(s', a') = 0.5
4. Update: Q(s, Right) = 0.0 + 0.1 × [1 + 0.9 × 0.5 − 0.0] = 0.145

**The Algorithm:**
\`\`\`
Initialize Q-table with zeros
For each episode:
    s = initial state
    While episode not done:
        Choose action a using ε-greedy policy
        Take action a, observe reward R and next state s'
        Q(s,a) ← Q(s,a) + α[R + γ·max_a' Q(s',a') − Q(s,a)]
        s ← s'
\`\`\`

**Convergence:**
Q-Learning is guaranteed to converge to optimal Q-values if:
- Every state-action pair is visited infinitely often
- Learning rate decreases appropriately
- The environment is stationary (Markov property)

**Limitations:**
- Only works with discrete (finite) state and action spaces
- Q-table size grows exponentially with state dimensions
- For continuous/large spaces, use Deep Q-Networks (DQN) instead`,
          terms: ['Q-Table', 'Q-Value', 'Learning Rate', 'Discount Factor', 'Update Rule', 'Convergence', 'Bellman Equation'],
          activity: 'Open the Q-Learning Simulator in NeuralVerse. Train the agent with default settings, then experiment with different learning rates and observe the effect.',
          relatedTopics: ['mod3-les1', 'mod3-les3'],
          hasSimulation: 'qLearning'
        },
        {
          id: 'mod3-les3',
          title: 'Exploration vs Exploitation',
          objectives: [
            'Understand the exploration-exploitation dilemma',
            'Implement epsilon-greedy strategy',
            'Learn about epsilon decay'
          ],
          content: `The exploration-exploitation tradeoff is a fundamental challenge in reinforcement learning.

**The Dilemma:**
- **Exploitation** — Choose the action with the highest known Q-value (use what you know)
- **Exploration** — Choose a random action to discover potentially better options

If you always exploit, you might miss better strategies.
If you always explore, you never use what you've learned.

**Epsilon-Greedy Policy:**
The most common solution uses a parameter ε (epsilon):
\`\`\`
With probability ε: choose a RANDOM action (explore)
With probability 1−ε: choose the BEST action (exploit)
\`\`\`

**Implementation:**
\`\`\`python
# Pseudocode
def choose_action(state, epsilon):
    if random() < epsilon:
        return random_action()      # Explore
    else:
        return argmax(Q[state])     # Exploit
\`\`\`

**JavaScript Implementation (as in NeuralVerse simulator):**
\`\`\`javascript
function chooseAction(state, epsilon) {
    if (Math.random() < epsilon) {
        // Explore: random action
        return Math.floor(Math.random() * numActions);
    } else {
        // Exploit: best known action
        return argMax(qTable[state]);
    }
}
\`\`\`

**Epsilon Decay:**
Start with high exploration, gradually shift to exploitation:
\`\`\`
ε_new = ε × decay_rate     (e.g., ε = ε × 0.995)
ε = max(ε_new, ε_min)      (don't go below minimum)
\`\`\`

Typical schedule:
- Start: ε = 1.0 (100% exploration)
- During training: ε gradually decreases
- End: ε = 0.01 (1% exploration, mostly exploitation)

**Other Exploration Strategies:**
1. **Boltzmann (Softmax)** — Action probabilities proportional to Q-values
2. **UCB (Upper Confidence Bound)** — Prefer actions with uncertainty
3. **Optimistic Initialization** — Start Q-values high to encourage exploration
4. **Curiosity-Driven** — Reward for visiting novel states

**Visualization in NeuralVerse:**
In the Q-Learning simulator, you can observe:
- Early episodes: Agent moves randomly (high ε)
- Mid training: Agent starts finding paths but still explores
- Late training: Agent consistently takes optimal path (low ε)`,
          terms: ['Exploration', 'Exploitation', 'Epsilon-Greedy', 'Epsilon Decay', 'Softmax', 'UCB', 'Random Policy', 'Greedy Policy'],
          activity: 'In the Q-Learning Simulator, compare training with ε=1.0 (always random) vs ε=0.0 (always greedy). What happens?',
          relatedTopics: ['mod3-les2', 'mod3-les4']
        },
        {
          id: 'mod3-les4',
          title: 'The Taxi Problem',
          objectives: [
            'Apply Q-Learning to the classic Taxi problem',
            'Understand state representation in grid worlds',
            'Evaluate agent performance'
          ],
          content: `The Taxi problem is a classic RL benchmark from OpenAI Gym. An agent (taxi) must pick up a passenger and deliver them to their destination.

**Environment:**
- 5×5 grid with walls
- 4 designated locations (R, G, B, Y)
- Passenger at one location, destination at another
- Taxi starts at a random position

**State Space:**
- Taxi row (0-4) × Taxi column (0-4) × Passenger location (5 options: 4 locations + in taxi) × Destination (4 options)
- Total: 5 × 5 × 5 × 4 = **500 states**

**Action Space (6 actions):**
| Action | Description |
|--------|-------------|
| 0 | Move South |
| 1 | Move North |
| 2 | Move East |
| 3 | Move West |
| 4 | Pickup passenger |
| 5 | Drop off passenger |

**Reward Structure:**
- **+20** — Successful delivery
- **-10** — Illegal pickup or dropoff
- **-1** — Each step (encourages efficiency)

**Training Process:**
\`\`\`python
# Pseudocode for Taxi Q-Learning
Q = initialize_q_table(500, 6)  # 500 states, 6 actions

for episode in range(num_episodes):
    state = env.reset()
    done = False
    
    while not done:
        action = epsilon_greedy(Q, state, epsilon)
        next_state, reward, done = env.step(action)
        
        # Q-Learning update
        Q[state][action] += alpha * (
            reward + gamma * max(Q[next_state]) - Q[state][action]
        )
        state = next_state
    
    epsilon *= decay_rate
\`\`\`

**Performance Metrics:**
- **Average reward per episode** — Should increase over training
- **Steps per episode** — Should decrease (more efficient paths)
- **Success rate** — Percentage of successful deliveries
- **Convergence** — Q-values stabilize

**The NeuralVerse Grid Simulator:**
Our Q-Learning simulator demonstrates the same concepts on a simpler grid:
- Agent navigates from start to goal
- Obstacles block certain cells
- Rewards for reaching the goal, penalties for hitting walls
- Same Q-table update mechanism as the Taxi problem

**Key Insight:**
Tabular Q-Learning works well here because the state space is small (500 states × 6 actions = 3000 Q-values). For larger problems (images, continuous states), we need function approximation — leading to Deep RL.`,
          terms: ['Taxi Problem', 'State Space', 'Action Space', 'Reward Shaping', 'Convergence', 'Performance Metrics'],
          activity: 'Use the Q-Learning Simulator with different grid sizes and obstacle configurations. Track how training time changes with complexity.',
          relatedTopics: ['mod3-les3', 'mod3-les5']
        },
        {
          id: 'mod3-les5',
          title: 'Unity ML-Agents & PPO',
          objectives: [
            'Understand Unity ML-Agents Toolkit',
            'Learn Proximal Policy Optimization basics',
            'Configure agent training in Unity'
          ],
          content: `Unity ML-Agents is a toolkit that enables training intelligent agents in Unity environments using deep reinforcement learning.

**What is Unity ML-Agents?**
An open-source project by Unity Technologies that provides:
- Python training algorithms (via PyTorch)
- Unity SDK for creating training environments
- Pre-built example environments
- TensorBoard integration for monitoring

**Architecture:**
\`\`\`
Unity Environment ←→ Python Training Process
     (C# Agent)          (PPO Algorithm)
         ↕                     ↕
   Observations          Neural Network
   Actions               Policy Updates
   Rewards               Training Logs
\`\`\`

**Key Components in Unity:**
1. **Agent (C# class)** — Extends Unity's Agent class
2. **Behavior Parameters** — Configuration for observations and actions
3. **Decision Requester** — Controls when agent makes decisions
4. **Academy** — Manages training environment settings

**Agent Script Template:**
\`\`\`csharp
using Unity.MLAgents;
using Unity.MLAgents.Sensors;
using Unity.MLAgents.Actuators;

public class MyAgent : Agent {
    public override void OnEpisodeBegin() {
        // Reset environment for new episode
        transform.localPosition = startPosition;
    }
    
    public override void CollectObservations(
        VectorSensor sensor
    ) {
        // Send observations to the neural network
        sensor.AddObservation(transform.localPosition);
        sensor.AddObservation(target.localPosition);
    }
    
    public override void OnActionReceived(
        ActionBuffers actions
    ) {
        // Execute actions from the neural network
        float moveX = actions.ContinuousActions[0];
        float moveZ = actions.ContinuousActions[1];
        transform.Translate(moveX, 0, moveZ);
        
        // Calculate reward
        float distance = Vector3.Distance(
            transform.localPosition, 
            target.localPosition
        );
        
        if (distance < 1.5f) {
            SetReward(1.0f);
            EndEpisode();
        }
        
        AddReward(-0.001f); // Small penalty per step
    }
}
\`\`\`

**Proximal Policy Optimization (PPO):**
PPO is the default algorithm in ML-Agents. It is a policy gradient method.

Key ideas:
- Uses a neural network to represent the policy
- Updates policy in small, stable steps (clipped updates)
- Balances exploration and exploitation automatically
- Works with both continuous and discrete actions

**PPO vs Q-Learning:**
| Feature | Q-Learning | PPO |
|---------|-----------|-----|
| State Space | Discrete only | Continuous OK |
| Action Space | Discrete only | Both |
| Function | Q-table | Neural Network |
| Stability | Can diverge | More stable |
| Sample Efficiency | Higher | Lower |
| Scalability | Limited | High |

**Training Configuration (YAML):**
\`\`\`yaml
behaviors:
  MyAgent:
    trainer_type: ppo
    hyperparameters:
      batch_size: 64
      buffer_size: 2048
      learning_rate: 3.0e-4
      num_epoch: 3
    network_settings:
      num_layers: 2
      hidden_units: 128
    reward_signals:
      extrinsic:
        gamma: 0.99
    max_steps: 500000
\`\`\`

**Important Note:**
The NeuralVerse Q-Learning simulator demonstrates tabular RL concepts. PPO-based training requires:
- Unity Editor with ML-Agents package installed
- Python environment with mlagents package
- GPU recommended for faster training
- Separate Unity project (see Unity Practical Lab)`,
          terms: ['ML-Agents', 'PPO', 'Policy Gradient', 'Neural Network Policy', 'Observations', 'Continuous Actions', 'Training Configuration'],
          activity: 'Read the ML-Agents setup guide in the Unity Practical Lab. Install ML-Agents in a Unity project and explore the example environments.',
          relatedTopics: ['mod3-les4', 'mod4-les2']
        }
      ]
    },
    {
      id: 'mod4',
      title: 'Mobile Virtual Reality',
      icon: '📱',
      color: '#f59e0b',
      description: 'Build mobile VR experiences with Google Cardboard, Blender, and imitation learning.',
      lessons: [
        {
          id: 'mod4-les1',
          title: 'Mobile VR Fundamentals',
          objectives: [
            'Understand mobile VR architecture',
            'Compare mobile vs PC/standalone VR',
            'Learn mobile VR design constraints'
          ],
          content: `Mobile VR uses a smartphone placed inside a headset viewer (like Google Cardboard) to create a VR experience.

**Mobile VR Architecture:**
\`\`\`
Smartphone (Display + Sensors + Processing)
    ↓
VR Headset Shell (Lenses + Housing)
    ↓
User's Eyes (Stereoscopic 3D)
\`\`\`

**How It Works:**
1. The app renders two side-by-side views (one per eye)
2. Lenses in the headset bend the images to fill peripheral vision
3. Phone's gyroscope and accelerometer track head rotation
4. The app updates the view in response to head movement

**Mobile VR vs Other Platforms:**
| Feature | Mobile VR | PC VR | Standalone VR |
|---------|-----------|-------|---------------|
| Cost | Low ($15 viewer) | High ($1000+) | Medium ($300-500) |
| Processing | Phone GPU | Desktop GPU | Mobile SoC |
| Tracking | 3DOF (rotation) | 6DOF (full) | 6DOF |
| Controllers | Gaze + button | Full tracking | Full tracking |
| Graphics | Limited | High quality | Medium |
| Setup | Very easy | Complex | Easy |

**3DOF vs 6DOF:**
- **3DOF (3 Degrees of Freedom)** — Tracks rotation only (yaw, pitch, roll). Head can look around but can't move position
- **6DOF (6 Degrees of Freedom)** — Tracks rotation AND position. Head can look around AND move in space

**Mobile VR Design Constraints:**
1. **Performance** — Limited GPU, target 60 FPS minimum
2. **Heat** — Phone overheats with sustained rendering
3. **Battery** — VR drains battery quickly
4. **Interaction** — Limited input (gaze, single button, Bluetooth controller)
5. **Comfort** — Reduce motion sickness:
   - Maintain high frame rate
   - Minimize camera-controlled movement
   - Use teleportation for locomotion
   - Provide fixed reference points

**Target Hardware:**
- Minimum: Phone with gyroscope, 1080p display
- Recommended: Phone with high-res AMOLED, fast processor
- Viewer: Google Cardboard, Daydream View, or equivalent`,
          terms: ['Mobile VR', '3DOF', '6DOF', 'Stereoscopic Rendering', 'Gyroscope', 'Accelerometer', 'Latency', 'Google Cardboard'],
          activity: 'Research your phone\'s VR capabilities. Does it have a gyroscope? What resolution is the display? Try the VR Demo in NeuralVerse.',
          relatedTopics: ['mod1-les1', 'mod4-les3'],
          hasSimulation: 'vrDemo'
        },
        {
          id: 'mod4-les2',
          title: 'Imitation Learning',
          objectives: [
            'Understand imitation learning as a training approach',
            'Compare imitation learning with reinforcement learning',
            'Learn about behavioral cloning and DAgger'
          ],
          content: `Imitation Learning (IL) is a machine learning approach where an agent learns to perform tasks by observing expert demonstrations, rather than exploring through trial and error.

**Core Idea:**
Instead of defining a reward function and letting the agent discover behavior through RL, we show the agent what good behavior looks like and train it to replicate that behavior.

**Analogy:**
- **RL** = Learning to cook by trying random ingredients and tasting the result
- **IL** = Learning to cook by watching a chef and copying their recipe

**Types of Imitation Learning:**

**1. Behavioral Cloning (BC)**
- Treat it as supervised learning
- Collect (state, action) pairs from expert
- Train a model to predict action given state
- Simple but suffers from "distribution shift"

\`\`\`
Expert demonstrates: [s1→a1, s2→a2, s3→a3, ...]
Train policy π: π(s) ≈ expert_action
\`\`\`

**Problem with BC:**
If the learned policy makes a small error, it reaches states never seen in training data. Errors compound, leading to failure.

**2. DAgger (Dataset Aggregation)**
- Start with behavioral cloning
- Run the learned policy
- Ask expert to label the new states encountered
- Add new data to training set
- Retrain and repeat

This addresses distribution shift by covering more states.

**3. GAIL (Generative Adversarial Imitation Learning)**
- Uses adversarial training (like GANs)
- Discriminator distinguishes expert vs agent behavior
- Agent learns to fool the discriminator
- No explicit reward function needed

**Imitation Learning in Unity ML-Agents:**
ML-Agents supports behavioral cloning:
\`\`\`yaml
behaviors:
  MyAgent:
    trainer_type: ppo
    behavioral_cloning:
      demo_path: demos/expert_demo.demo
      strength: 0.5
      steps: 150000
\`\`\`

Record demonstrations:
1. Add a DemonstrationRecorder component to the Agent
2. Play the game and perform optimal actions
3. ML-Agents saves the .demo file
4. Use it to pre-train or guide the RL agent

**When to Use Imitation Learning:**
- Reward function is hard to define
- Expert demonstrations are available
- Task requires complex sequential behavior
- Bootstrapping RL training (pre-train with IL, fine-tune with RL)

**Limitations:**
- Requires quality demonstrations
- Can only be as good as the expert
- Behavioral cloning alone can be brittle
- May not generalize to unseen situations`,
          terms: ['Imitation Learning', 'Behavioral Cloning', 'DAgger', 'GAIL', 'Distribution Shift', 'Expert Demonstration', 'Demo Recording'],
          activity: 'Think of a task where imitation learning would be better than RL. Explain why defining a reward function would be difficult for that task.',
          relatedTopics: ['mod3-les1', 'mod3-les5']
        },
        {
          id: 'mod4-les3',
          title: 'Google Cardboard & VR SDK',
          objectives: [
            'Set up a Google Cardboard project in Unity',
            'Understand the VR SDK architecture',
            'Create a basic mobile VR scene'
          ],
          content: `Google Cardboard is an affordable VR platform that uses a smartphone and a cardboard/plastic viewer.

**Google Cardboard SDK for Unity:**
The Cardboard XR Plugin provides:
- Stereoscopic rendering (split screen for left/right eye)
- Lens distortion correction
- Head tracking (3DOF using phone sensors)
- Button/trigger input detection
- QR code-based headset configuration

**Setup Steps:**

**1. Install the SDK:**
- Open Unity Package Manager
- Add package from git URL:
  \`https://github.com/googlevr/cardboard-xr-plugin.git\`
- Or download the .unitypackage from GitHub releases

**2. Configure Project:**
\`\`\`
Edit > Project Settings > Player:
- Minimum API Level: Android 7.0 (API 24)
- Target API Level: Latest
- Scripting Backend: IL2CPP
- Target Architecture: ARM64

Edit > Project Settings > XR Plug-in Management:
- Enable Cardboard XR Plugin
\`\`\`

**3. Create VR Scene:**
\`\`\`csharp
// VR Camera Setup
// The XR Plugin handles stereoscopic rendering automatically
// when the Cardboard XR Plugin is enabled.

// For interaction, use gaze-based input:
public class GazeInteraction : MonoBehaviour {
    public float gazeTime = 2f; // Seconds to activate
    private float timer = 0f;
    
    void Update() {
        // Cast ray from camera center
        Ray ray = Camera.main.ViewportPointToRay(
            new Vector3(0.5f, 0.5f, 0)
        );
        
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, 100f)) {
            // Looking at an interactive object
            timer += Time.deltaTime;
            if (timer >= gazeTime) {
                hit.collider.SendMessage(
                    "OnGazeActivated", 
                    SendMessageOptions.DontRequireReceiver
                );
                timer = 0f;
            }
        } else {
            timer = 0f;
        }
    }
}
\`\`\`

**4. Build for Android:**
\`\`\`
File > Build Settings:
- Switch Platform to Android
- Add scenes to build
- Click Build and Run
\`\`\`

**Interaction Patterns for Mobile VR:**
1. **Gaze Selection** — Look at an object for a set time
2. **Reticle** — Crosshair in center of view, highlights targets
3. **Cardboard Trigger** — Physical button on viewer
4. **Bluetooth Controller** — Separate input device

**Important Notes:**
- Google has deprecated Daydream but Cardboard remains supported
- The Cardboard SDK is open-source
- For new projects, consider OpenXR as the standard API
- The NeuralVerse VR Demo simulates gaze interaction with mouse — an actual Cardboard experience requires building and running on an Android phone with a compatible viewer

**Desktop Simulation Limitations:**
The VR Demo in NeuralVerse uses mouse movement to simulate head rotation. This demonstrates the concept of gaze-based interaction but:
- Does NOT provide stereoscopic rendering
- Does NOT use actual phone sensors
- Is NOT a replacement for testing on real hardware
- Demonstrates the interaction PATTERN, not the actual VR experience`,
          terms: ['Google Cardboard', 'Cardboard SDK', 'Stereoscopic Rendering', 'Gaze Interaction', 'Reticle', '3DOF Tracking', 'XR Plugin'],
          activity: 'Follow the Google Cardboard setup guide to create a Unity project targeting Android. If no Android device is available, set up the project and test in the Unity Editor.',
          relatedTopics: ['mod4-les1', 'mod4-les4']
        },
        {
          id: 'mod4-les4',
          title: 'Whack-a-Mole VR & Mini-Games',
          objectives: [
            'Design a simple VR mini-game',
            'Implement gaze/click interaction mechanics',
            'Create timed gameplay with scoring'
          ],
          content: `Whack-a-Mole is a practical project that demonstrates core VR interaction: target appearance, user interaction (gaze or click), scoring, and timing.

**Game Design:**
- Targets appear at random positions for a limited time
- Player must "whack" them before they disappear
- Score increases with successful hits
- Difficulty increases over time (faster appearance, shorter display time)
- Game ends after a set duration or number of rounds

**VR Version in Unity:**
Targets are 3D objects that pop up from the ground. In VR, the player looks at targets and uses the Cardboard trigger to whack them.

**Gaze + Trigger Interaction:**
\`\`\`csharp
public class MoleTarget : MonoBehaviour {
    public float displayTime = 2f;
    private bool isActive = false;
    
    public void Activate() {
        isActive = true;
        gameObject.SetActive(true);
        // Animate rising from ground
        StartCoroutine(ShowAndHide());
    }
    
    IEnumerator ShowAndHide() {
        // Rise animation
        Vector3 start = transform.position;
        Vector3 end = start + Vector3.up * 0.5f;
        float t = 0;
        while (t < 0.3f) {
            t += Time.deltaTime;
            transform.position = Vector3.Lerp(start, end, t / 0.3f);
            yield return null;
        }
        
        yield return new WaitForSeconds(displayTime);
        
        if (isActive) {
            // Player missed
            isActive = false;
            gameObject.SetActive(false);
        }
    }
    
    // Called by gaze system or click
    public void OnHit() {
        if (!isActive) return;
        isActive = false;
        
        // Score and effects
        GameManager.Instance.AddScore(10);
        // Play hit effect
        gameObject.SetActive(false);
    }
}
\`\`\`

**Game Manager:**
\`\`\`csharp
public class WhackAMoleManager : MonoBehaviour {
    public MoleTarget[] targets;
    public float spawnInterval = 1.5f;
    public float gameDuration = 60f;
    
    private int score = 0;
    private float timeLeft;
    
    void Start() {
        timeLeft = gameDuration;
        StartCoroutine(SpawnLoop());
    }
    
    IEnumerator SpawnLoop() {
        while (timeLeft > 0) {
            int idx = Random.Range(0, targets.Length);
            targets[idx].Activate();
            yield return new WaitForSeconds(spawnInterval);
            
            // Increase difficulty
            spawnInterval = Mathf.Max(0.5f, spawnInterval - 0.01f);
        }
    }
    
    void Update() {
        timeLeft -= Time.deltaTime;
        if (timeLeft <= 0) {
            EndGame();
        }
    }
}
\`\`\`

**NeuralVerse Desktop Version:**
The Whack-a-Mole mini-game in NeuralVerse is a desktop simulation using HTML Canvas:
- Targets appear as circles on a grid
- Click/tap to whack them
- Same scoring and timing mechanics
- Demonstrates the GAME DESIGN, not the VR implementation

To create the actual VR version:
1. Set up a Unity project with Cardboard SDK
2. Create 3D "mole" models or use primitives
3. Implement gaze-based interaction
4. Add scoring and UI
5. Build for Android and test in a Cardboard viewer`,
          terms: ['Whack-a-Mole', 'Gaze Interaction', 'Spawn System', 'Coroutine', 'Game Manager', 'Difficulty Scaling'],
          activity: 'Play the Whack-a-Mole mini-game in NeuralVerse. Then design your own VR mini-game concept with states, actions, and scoring rules.',
          relatedTopics: ['mod4-les3', 'mod4-les5'],
          hasSimulation: 'whackAMole'
        },
        {
          id: 'mod4-les5',
          title: 'Blender for 3D Asset Creation',
          objectives: [
            'Understand Blender\'s role in the VR pipeline',
            'Learn basic 3D modeling concepts',
            'Export models for Unity'
          ],
          content: `Blender is a free, open-source 3D creation suite used for modeling, texturing, animation, and rendering.

**Why Blender for VR Development?**
- Create custom 3D models (characters, environments, props)
- UV unwrap and texture models
- Create animations
- Export in Unity-compatible formats (FBX, OBJ, glTF)
- Free and cross-platform

**Blender Basics:**

**Navigation:**
- Middle mouse: Orbit
- Shift + Middle mouse: Pan
- Scroll wheel: Zoom
- Numpad: Preset views (1=front, 3=side, 7=top)

**Edit Modes:**
- **Object Mode** — Move, rotate, scale whole objects
- **Edit Mode** (Tab) — Modify vertices, edges, faces
- **Sculpt Mode** — Shape surfaces like clay

**Basic Modeling Operations:**
1. **Extrude (E)** — Pull faces outward to create geometry
2. **Loop Cut (Ctrl+R)** — Add edge loops for detail
3. **Subdivide** — Split faces for smoother geometry
4. **Boolean** — Combine/subtract shapes
5. **Mirror Modifier** — Model half, mirror for symmetry

**UV Mapping:**
UV mapping projects a 2D texture onto a 3D surface.
1. Enter Edit Mode
2. Select faces
3. U > Smart UV Project (for quick mapping)
4. Edit UV layout in UV Editor
5. Paint or apply texture

**Exporting for Unity:**
\`\`\`
File > Export > FBX (.fbx)

Export Settings:
- Include: Selected Objects
- Transform: Scale = 1.0
- Apply Transform: checked
- Forward: -Z Forward
- Up: Y Up
- Geometry: Apply Modifiers
- Armature: if animated
\`\`\`

**Import in Unity:**
1. Copy .fbx file into Assets folder
2. Unity imports automatically
3. Configure import settings in Inspector:
   - Scale Factor (usually 1)
   - Generate Colliders (if needed)
   - Material creation mode
   - Animation import settings

**Performance Tips for VR:**
- Keep polygon count low (mobile VR: <100K total)
- Use texture atlases (combine textures)
- Avoid transparency where possible
- Use LOD (Level of Detail) for distant objects
- Bake lighting instead of real-time`,
          terms: ['Blender', '3D Modeling', 'UV Mapping', 'FBX Export', 'Polygon Count', 'LOD', 'Texture Atlas'],
          activity: 'Install Blender (blender.org). Create a simple object (table, chair, or tree). Export as FBX and import into Unity.',
          relatedTopics: ['mod1-les8', 'mod4-les6']
        },
        {
          id: 'mod4-les6',
          title: 'Course Review & Practical Project Guide',
          objectives: [
            'Review all major course topics',
            'Plan a practical VR/AI project',
            'Understand project requirements and deliverables'
          ],
          content: `This lesson reviews the entire course and guides you through planning a practical project that integrates VR and AI concepts.

**Course Summary:**

**Module 1 — Virtual Reality & Unity 3D:**
✓ VR history, types, and applications
✓ Unity Editor, scenes, GameObjects
✓ Materials, lighting, particles, physics
✓ Asset management and project organization

**Module 2 — C# Programming & Interaction:**
✓ Variables, methods, control flow
✓ Keyboard input and player movement
✓ Camera systems
✓ UI menus and HUD
✓ Prefabs and particle effects

**Module 3 — Deep Reinforcement Learning:**
✓ RL fundamentals (agent, environment, reward)
✓ Q-Learning algorithm and Q-tables
✓ Exploration vs exploitation
✓ Unity ML-Agents and PPO

**Module 4 — Mobile VR:**
✓ Mobile VR architecture and constraints
✓ Imitation learning
✓ Google Cardboard SDK
✓ VR mini-games
✓ Blender 3D modeling

**Practical Project Ideas:**

**1. VR Training Simulator**
- Create a virtual classroom or lab
- Interactive objects with information panels
- Quiz system within VR
- Technologies: Unity + Cardboard SDK

**2. RL-Trained NPC Game**
- Design a simple game environment
- Train NPC agents using ML-Agents
- Player vs trained agent
- Technologies: Unity + ML-Agents + PPO

**3. VR Museum/Gallery**
- 3D scanned or modeled exhibits
- Gaze-based navigation
- Audio narration
- Technologies: Unity + Cardboard + Blender

**4. Mobile VR Maze Game**
- Procedurally generated mazes
- Head-tracked navigation
- AI hint system
- Technologies: Unity + Cardboard + Q-Learning

**Project Deliverables:**
1. Unity project with source code
2. Build for target platform
3. Documentation (README, architecture diagram)
4. Demo video (screen recording or VR footage)
5. Report covering design decisions, implementation, and testing

**Key Evaluation Criteria:**
- Correct use of VR development practices
- Code quality and organization
- Integration of AI/ML concepts
- User experience and interaction design
- Documentation completeness`,
          terms: ['Project Planning', 'Integration', 'Deliverables', 'Evaluation Criteria'],
          activity: 'Choose one project idea from above. Write a one-page plan covering: objective, features, technology stack, timeline, and expected challenges.',
          relatedTopics: ['mod1-les1', 'mod3-les5']
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { courseData };
}
