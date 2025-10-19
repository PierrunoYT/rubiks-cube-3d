# 🎲 3D Rubik's Cube

An interactive 3D Rubik's Cube built with Three.js that you can solve in your browser!

![Rubik's Cube](https://img.shields.io/badge/Three.js-r128-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Realistic Design**: Black plastic body with colored stickers, just like a real Rubik's cube
- **Smooth Animations**: 300ms smooth rotation animations with proper quaternion-based transforms
- **Standard Color Scheme**: Red, Orange, White, Yellow, Green, Blue
- **Full Controls**: Rotate any face clockwise or counter-clockwise
- **Color Picker Tool**: Select colors and click on cube faces to customize them
- **Solution Finder**: Get step-by-step instructions to solve the cube
  - Shows each move in standard notation (R, L', U, etc.)
  - Execute moves one at a time or auto-solve
  - Works with scrambled and manually manipulated cubes
- **Move Tracking**: Displays move counter and enables solve functionality
- **Scramble Function**: Randomize the cube with 20 moves
- **Solve Function**: Automatically reverse all moves to return to the solved state
- **Reset Function**: Smoothly restore cube to its initial state
- **Interactive Camera**: Drag with mouse or use arrow keys to rotate the view
- **Beautiful UI**: Modern, polished interface with glowing accents

## 🎮 Controls

### Face Rotations
- **R** / **Shift+R** - Right face (clockwise/counter-clockwise)
- **L** / **Shift+L** - Left face
- **U** / **Shift+U** - Up/Top face
- **D** / **Shift+D** - Down/Bottom face
- **F** / **Shift+F** - Front face
- **B** / **Shift+B** - Back face

### View Controls
- **Mouse Drag** - Rotate camera view
- **Arrow Keys** - Rotate camera view
- **S** - Scramble cube

### Color Picker
- **Click Color** - Select a color from the picker (bottom left)
- **Click Face** - Click on any cube sticker to change its color
- All 6 standard Rubik's cube colors available (Red, Orange, White, Yellow, Green, Blue)

### Solution Finder
- **Get Solution Button** - Click to analyze the cube and get solving steps
- **Next Step** - Execute one move at a time with visual guidance
- **Auto Solve** - Automatically execute all remaining steps
- Shows moves in standard Rubik's cube notation (R, L', U2, etc.)

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/PierrunoYT/rubiks-cube-3d.git
   ```

2. Open `rubikscube.html` in your browser - that's it!

## 🌐 Live Demo

**[Try it live on GitHub Pages!](https://pierrunoyt.github.io/rubiks-cube-3d/rubikscube.html)**

No build process, no dependencies to install. Just open and play!

## 🛠️ Technical Details

- **Three.js r128**: For 3D rendering
- **Pure JavaScript**: No frameworks or build tools needed
- **Quaternion Rotations**: Smooth, gimbal-lock-free rotations
- **Realistic Materials**: Phong materials with proper lighting and shadows
- **Modular Design**: Each cubelet is constructed with a black body and colored stickers
- **Raycasting**: Click detection for interactive color changing
- **Move History**: Tracks all rotations for undo/solve functionality

## 🎨 Design

The cube features:
- Black plastic cubelets with visible gaps (0.88 unit size in 1.0 unit grid)
- Colored stickers with subtle borders and beveling
- Multiple light sources for realistic depth and shadows
- Rim lighting for a professional look
- Interactive color picker with hover effects and selection indicators
- Modern glassmorphism UI panels with backdrop blur effects

## 📝 License

MIT License - Feel free to use this project however you'd like!

## 🤝 Contributing

Pull requests are welcome! Feel free to:
- Add new features (timer, advanced solve algorithms, pattern generators)
- Improve the UI/UX
- Optimize performance
- Fix bugs

## 🎯 Future Ideas

- [x] Move counter ✓
- [x] Color picker for customization ✓
- [x] Solve function ✓
- [x] Solution step-by-step guide ✓
- [ ] Timer for speedsolving
- [ ] Advanced solve algorithm for custom states (Kociemba, CFOP hints)
- [ ] Save/load cube state
- [ ] Pattern generator (checkerboard, stripes, etc.)
- [ ] Different cube sizes (2x2, 4x4, 5x5)
- [ ] Touch controls for mobile
- [ ] Keyboard shortcut customization
- [ ] Animation speed control
- [ ] Solution optimization (fewer moves)

---

Made with ❤️ and Three.js

