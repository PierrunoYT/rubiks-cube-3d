# 🎲 3D Rubik's Cube

An interactive 3D Rubik's Cube built with Three.js that you can solve in your browser with advanced visual guidance and intuitive controls!

![Rubik's Cube](https://img.shields.io/badge/Three.js-r128-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## ✨ Features

### 🎨 Realistic 3D Cube
- **Authentic Design**: Black plastic body with colored stickers, just like a real Rubik's cube
- **Smooth Animations**: 300ms smooth rotation animations with quaternion-based transforms
- **Standard Color Scheme**: Red (Right), Orange (Left), White (Top), Yellow (Bottom), Green (Front), Blue (Back)
- **Professional Lighting**: Multiple light sources including directional, ambient, key lights, and colored rim lights
- **Dynamic Shadows**: Real-time shadow mapping for realistic depth perception
- **Adaptive Ground Plane**: Grid and ground fade when camera moves below cube level

### 🎮 Multiple Control Methods
- **Keyboard Controls**: Full face rotation support with standard notation (R, L, U, D, F, B)
  - Press letter keys for clockwise rotation
  - Hold Shift for counter-clockwise rotation
  - Arrow keys to rotate camera view
- **Mouse Drag**: Click and drag anywhere to rotate the camera view
- **Interactive Layer Dragging**: Hold Shift + Click & Drag on any layer to rotate it
  - Natural gesture-based control
  - Direction-aware rotation (horizontal/vertical drag determines rotation)
  - 30-pixel threshold to prevent accidental rotations

### 🧩 Advanced Solution System

#### Visual Guidance
- **Animated Rotation Arrows**: Cyan pulsing arrows show exactly which direction to turn
- **Layer Highlighting**: The entire layer to move glows with a pulsing cyan effect
- **Rotation Count Badges**: When multiple consecutive turns are needed, a badge shows "x2", "x3", etc.
- **Step-by-Step Instructions**: Clear move notation (R, L', U2, etc.) with descriptions

#### Preview Functionality
- **Individual Step Preview** (👁️ button on each step):
  - Shows the move with full animation
  - Automatically reverses back to original position
  - No cube state changes - perfect for learning
- **Preview All Steps** (Preview All 👁️ button):
  - Sequences through all remaining solution steps
  - Each step highlights in golden yellow during preview
  - Shows animations for every move then reverses
  - Cube returns to exact starting state

#### Solution Execution
- **Next Step**: Execute one move at a time with visual guidance
- **Auto Solve**: Automatically execute all remaining steps with indicators
- **Smart Grouping**: Consecutive identical moves are grouped (e.g., "R (x3)" instead of "R, R, R")

### 🛠️ Additional Tools

#### Interactive UI Elements
- **Toggleable Face Labels**: 3D sprite labels (R, L, U, D, F, B) floating around the cube
- **Notation Guide**: Visual reference panel showing cube notation layout
- **Move Counter**: Tracks the number of moves made
- **Color Picker**: 
  - Select from 6 standard Rubik's cube colors
  - Click any cube face to change its color
  - Perfect for creating custom patterns or fixing mistakes

#### Cube Functions
- **Scramble**: Randomizes cube with 20 intelligent moves (avoids canceling moves)
- **Solve**: Reverses all moves to return to solved state
- **Reset**: Smoothly animates cube back to initial configuration
- **Get Solution**: Analyzes current state and provides solving steps

### 🎯 UI/UX Design
- **Modern Glassmorphism**: Translucent panels with backdrop blur effects
- **Cyan Accent Theme**: Beautiful glowing accents and hover effects
- **Responsive Layout**: All UI elements positioned for optimal visibility
- **Smooth Animations**: Transitions, hover effects, and pulsing indicators
- **Custom Scrollbars**: Themed scrollbars in solution panel
- **State Indicators**:
  - Current step: Cyan highlight
  - Completed steps: Grayed out with strikethrough
  - Preview mode: Golden yellow pulsing highlight

## 🎮 Controls Reference

### Face Rotations (Keyboard)
| Key | Action |
|-----|--------|
| **R** / **Shift+R** | Right face (clockwise/counter-clockwise) |
| **L** / **Shift+L** | Left face |
| **U** / **Shift+U** | Up/Top face |
| **D** / **Shift+D** | Down/Bottom face |
| **F** / **Shift+F** | Front face |
| **B** / **Shift+B** | Back face |
| **S** | Scramble cube |

### View Controls
| Control | Action |
|---------|--------|
| **Mouse Drag** | Rotate camera around cube |
| **Arrow Keys** | Rotate camera view |
| **Shift + Click & Drag Layer** | Rotate the clicked layer |

### Solution Panel
| Button | Action |
|--------|--------|
| **🧩 Get Solution** | Analyze cube and display solution steps |
| **Next Step ▶** | Execute next solution move with visual guidance |
| **👁️ (per step)** | Preview individual step without changing cube state |
| **Preview All 👁️** | Preview all remaining steps in sequence |
| **Auto Solve 🚀** | Execute all remaining steps automatically |
| **Close ✕** | Close solution panel |

### Color Picker
1. Click a color from the palette (bottom left)
2. Click any cube sticker to change its color
3. Create custom patterns or fix mistakes

## 🚀 Getting Started

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/PierrunoYT/rubiks-cube-3d.git
   cd rubiks-cube-3d
   ```

2. **Start a local web server** (required for ES6 modules):
   
   **Python** (recommended):
   ```bash
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000/rubikscube.html`
   
   **Node.js**:
   ```bash
   npx http-server
   ```
   Then open: `http://localhost:8080/rubikscube.html`
   
   **VS Code**: Install "Live Server" extension, right-click `rubikscube.html` → "Open with Live Server"

⚠️ **Note**: You cannot open `rubikscube.html` directly from the file system (file:// protocol) due to CORS restrictions with ES6 modules. A web server is required for local development.

### Quick Start Guide
1. **Scramble** the cube using the 🎲 button or press **S**
2. **Manually solve** using keyboard controls or Shift+Drag
3. **OR get help**: Click **🧩 Get Solution**
4. **Preview steps**: Click 👁️ on any step or use **Preview All**
5. **Execute**: Use **Next Step** for guidance or **Auto Solve** for automatic solving

## 🌐 Live Demo

**[Try it live on GitHub Pages!](https://pierrunoyt.github.io/rubiks-cube-3d/rubikscube.html)**

No build process, no dependencies to install. Just open and play!

## 🛠️ Technical Details

### Architecture
- **Three.js r128**: 3D rendering engine
- **ES6 Modules**: Modern JavaScript module system for better code organization
- **Modular Design**: Clean separation of concerns with dedicated modules:
  - **state.js**: Centralized state management
  - **scene.js**: Three.js scene initialization and lighting
  - **cube.js**: Rubik's cube construction (27 individual cubelets)
  - **labels.js**: Face label creation and management
  - **indicators.js**: Visual rotation indicators and highlighting
  - **rotation.js**: Layer rotation animation logic
  - **actions.js**: Cube actions (scramble, solve, reset)
  - **controls.js**: Keyboard and mouse input handling
  - **colorPicker.js**: Color picker functionality
  - **solution.js**: Solution finding and execution system
  - **ui.js**: UI updates and event listener management
  - **main.js**: Application orchestration and initialization

### Key Technologies
- **Quaternion Rotations**: Smooth, gimbal-lock-free rotations
- **Raycasting**: Precise click detection for:
  - Color picker face selection
  - Shift+Drag layer detection
- **Canvas 2D Context**: Dynamic texture generation for:
  - Face labels (sprites)
  - Rotation count badges
- **Phong Materials**: Realistic lighting with:
  - Ambient lighting for overall illumination
  - Directional lights for shadows and depth
  - Key lights for proper contrast
  - Colored rim lights for style
  - Emissive materials for layer highlighting

### Cube Construction
- **27 Cubelets**: Each cubelet is an independent group
- **Black Plastic Bodies**: 0.88 unit cubes with gaps for realism
- **Colored Stickers**: Separate geometry with borders and beveling
- **Efficient Filtering**: Layer selection uses position-based filtering
- **State Tracking**: Complete move history for undo/solve functionality

### Animation System
- **Smooth Interpolation**: Linear interpolation for position, spherical for rotation
- **60 FPS Target**: RequestAnimationFrame-based render loop
- **Pulsing Effects**: Sine wave animations for indicators and highlights
- **Ease Functions**: Cubic ease-out for reset animation
- **Opacity Fading**: Dynamic ground/grid visibility based on camera position

### Solution Algorithm
- **Move History Based**: Tracks all moves for simple reversal solving
- **Notation Translation**: Converts internal moves to standard notation (R, L', U2, etc.)
- **Smart Grouping**: Consecutive identical moves are grouped for clarity
- **Preview Mode**: Non-destructive move preview with automatic reversal
- **Validation**: Detects manual state changes and invalidates solution

## 📁 File Structure

```
rubiks-cube-3d/
├── js/                      # Modularized JavaScript code
│   ├── main.js             # Main entry point and orchestration
│   ├── state.js            # Centralized state management
│   ├── scene.js            # Three.js scene and lighting setup
│   ├── cube.js             # Rubik's cube construction
│   ├── labels.js           # Face labels
│   ├── indicators.js       # Visual rotation indicators
│   ├── rotation.js         # Layer rotation logic
│   ├── actions.js          # Cube actions (scramble, solve, reset)
│   ├── controls.js         # Input controls (keyboard, mouse)
│   ├── colorPicker.js      # Color picker functionality
│   ├── solution.js         # Solution finding and execution
│   └── ui.js               # UI management and updates
├── rubikscube.html         # Main HTML structure and UI elements
├── rubikscube.css          # Styling, animations, and theme
├── README.md               # This file
├── LICENSE                 # MIT License
└── DEPLOY.md               # Deployment guide
```

### Module Organization

The codebase is organized by feature and responsibility:

- **State Management**: All shared state is centralized in `state.js`, making it easy to track and manage application state
- **Scene Setup**: `scene.js` handles all Three.js initialization, including camera, renderer, ground plane, and lighting
- **Cube Logic**: `cube.js` contains the cubelet construction logic with proper color assignment
- **Visual Feedback**: `indicators.js` and `labels.js` handle all visual guidance elements
- **Core Mechanics**: `rotation.js` manages the animated layer rotations with quaternion-based transforms
- **User Actions**: `actions.js` implements high-level cube operations (scramble, solve, reset)
- **Input Handling**: `controls.js` manages all keyboard and mouse interactions
- **Solution System**: `solution.js` contains the complete solution finding and execution logic
- **UI Layer**: `ui.js` handles DOM updates and keeps UI logic separate from core functionality
- **Orchestration**: `main.js` ties everything together and initializes the application

### Benefits of Modular Structure

- **Maintainability**: Each module has a single, clear responsibility
- **Testability**: Modules can be tested independently
- **Reusability**: Functions can be easily reused across different parts of the application
- **Scalability**: New features can be added without affecting existing code
- **Readability**: Smaller, focused files are easier to understand and navigate

## 🎨 Design Philosophy

### Visual Hierarchy
- **Center Focus**: Cube positioned at center with camera orbiting around
- **Corner Panels**: Controls (top-left), actions (top-right), info (bottom)
- **On-Demand Panels**: Solution panel and color picker appear when needed
- **Subtle Depth**: Layered UI with shadows and backdrop blur

### Color Scheme
- **Primary**: Cyan (#4ecdc4) for interactive elements and highlights
- **Background**: Dark blue gradient (#1a1a2e to #0f0f1e)
- **Accent**: Golden yellow (#ffd700) for preview mode
- **Semantic**: Red for warnings, green for success

### Interaction Design
- **Progressive Disclosure**: Advanced features revealed when needed
- **Visual Feedback**: Hover effects, pulsing animations, state colors
- **Forgiving Interface**: Preview mode lets users explore without commitment
- **Clear Affordances**: Buttons, badges, and indicators communicate function

## 🧪 Browser Compatibility

**Requirements**: Modern browser with ES6 module support

- ✅ Chrome/Edge 61+ (Recommended)
- ✅ Firefox 60+
- ✅ Safari 11+
- ✅ Opera 48+
- ⚠️ IE11 (Not supported - ES6 modules not available)

## 📝 License

MIT License - Feel free to use this project however you'd like!

## 🤝 Contributing

Pull requests are welcome! Areas for contribution:
- **Performance**: Optimize rendering and animations
- **Features**: Add new solving algorithms, patterns, or cube sizes
- **UI/UX**: Improve interface design and interactions
- **Mobile**: Add touch controls and responsive design
- **Accessibility**: Improve keyboard navigation and screen reader support

## 🎯 Future Ideas

### Completed ✅
- [x] Move counter
- [x] Color picker for customization
- [x] Solve function with move history
- [x] Solution step-by-step guide
- [x] Visual rotation indicators
- [x] Layer highlighting animations
- [x] Rotation count badges
- [x] Preview mode (individual and all steps)
- [x] Shift+Drag layer control
- [x] Smart move grouping

### Planned 🚧
- [ ] **Timer for speedsolving** with scramble generation
- [ ] **Advanced solve algorithms** (Kociemba, CFOP, Roux)
- [ ] **Pattern generator** (checkerboard, stripes, cube-in-cube, etc.)
- [ ] **Different cube sizes** (2x2, 4x4, 5x5, Pyraminx, Megaminx)
- [ ] **Touch controls** for mobile devices
- [ ] **Save/load cube state** to localStorage
- [ ] **Keyboard shortcut customization**
- [ ] **Animation speed control** slider
- [ ] **Solution optimization** (find minimal move count)
- [ ] **Tutorial mode** for beginners (learn basic algorithms)
- [ ] **Solve visualization** (show solving methods like F2L, OLL, PLL)
- [ ] **Recording mode** (record and replay solve sequences)
- [ ] **Statistics tracking** (solve times, move counts, etc.)
- [ ] **Themes** (light mode, custom color schemes)
- [ ] **Multiplayer** (race mode, shared cubes)

## 🐛 Known Issues

- Color picker modifications invalidate solution (by design - complex solver needed)
- Preview mode may have slight timing variations on slower devices
- Shift+Drag rotation direction depends on camera angle (working as intended)

## 💡 Tips & Tricks

1. **Learning to Solve**: Use Preview mode to see moves before committing
2. **Custom Patterns**: Use color picker to create interesting designs
3. **Smooth View**: Drag slowly for precise camera control
4. **Quick Rotations**: Shift+Drag is fastest for single moves
5. **Notation Practice**: Watch the solution steps to learn standard notation
6. **Reset Often**: Use Reset button to practice algorithms from solved state

## 🙏 Acknowledgments

- Built with [Three.js](https://threejs.org/) - Amazing 3D library
- Inspired by classic Rubik's Cube and speedcubing community
- Color scheme based on official Rubik's brand colors

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Submit a pull request
- Star the repo if you find it useful! ⭐

---

**Made with ❤️, Three.js, and lots of cube rotations**

*Happy cubing! 🎲*
