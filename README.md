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
- **Scramble Function**: Randomize the cube with 20 moves
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

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rubiks-cube.git
   ```

2. Open `rubikscube.html` in your browser - that's it!

No build process, no dependencies to install. Just open and play!

## 🛠️ Technical Details

- **Three.js r128**: For 3D rendering
- **Pure JavaScript**: No frameworks or build tools needed
- **Quaternion Rotations**: Smooth, gimbal-lock-free rotations
- **Realistic Materials**: Phong materials with proper lighting and shadows
- **Modular Design**: Each cubelet is constructed with a black body and colored stickers

## 🎨 Design

The cube features:
- Black plastic cubelets with visible gaps (0.88 unit size in 1.0 unit grid)
- Colored stickers with subtle borders and beveling
- Multiple light sources for realistic depth and shadows
- Rim lighting for a professional look

## 📝 License

MIT License - Feel free to use this project however you'd like!

## 🤝 Contributing

Pull requests are welcome! Feel free to:
- Add new features (timer, move counter, solve algorithm hints)
- Improve the UI/UX
- Optimize performance
- Fix bugs

## 🎯 Future Ideas

- [ ] Move counter
- [ ] Timer for speedsolving
- [ ] Solve algorithm hints
- [ ] Save/load cube state
- [ ] Different cube sizes (2x2, 4x4, 5x5)
- [ ] Touch controls for mobile
- [ ] Keyboard shortcut customization

---

Made with ❤️ and Three.js

