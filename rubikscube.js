// ===== SCENE SETUP =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('canvas'), 
  antialias: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1a1a2e);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// ===== TEXT LABELS FOR FACES =====
let faceLabels = [];
let labelsVisible = true;

function createFaceLabel(text, position, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 256;
  
  // Draw text
  context.fillStyle = color;
  context.font = 'Bold 120px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 128, 128);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    opacity: 0.7
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.copy(position);
  sprite.scale.set(0.5, 0.5, 1);
  
  return sprite;
}

// Create labels for each face
const labelData = [
  { text: 'R', position: new THREE.Vector3(1.8, 0, 0), color: '#FF3366' },
  { text: 'L', position: new THREE.Vector3(-1.8, 0, 0), color: '#FF8800' },
  { text: 'U', position: new THREE.Vector3(0, 1.8, 0), color: '#FFFFFF' },
  { text: 'D', position: new THREE.Vector3(0, -1.8, 0), color: '#FFD500' },
  { text: 'F', position: new THREE.Vector3(0, 0, 1.8), color: '#00DD66' },
  { text: 'B', position: new THREE.Vector3(0, 0, -1.8), color: '#0066FF' }
];

labelData.forEach(data => {
  const label = createFaceLabel(data.text, data.position, data.color);
  scene.add(label);
  faceLabels.push(label);
});

function toggleLabels() {
  labelsVisible = !labelsVisible;
  faceLabels.forEach(label => {
    label.visible = labelsVisible;
  });
}

// ===== VISUAL ROTATION INDICATORS =====
let rotationIndicators = [];

function createRotationArrow(face, clockwise) {
  const group = new THREE.Group();
  
  // Create arrow shape for rotation indicator
  const arrowShape = new THREE.Shape();
  const radius = 0.7;
  const arrowSize = 0.2;
  
  // Draw curved arrow
  for (let i = 0; i <= 20; i++) {
    const angle = (i / 20) * Math.PI * 1.5 * (clockwise ? 1 : -1);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) arrowShape.moveTo(x, y);
    else arrowShape.lineTo(x, y);
  }
  
  // Create multiple arrows around the face
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x4ecdc4,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  
  // Create arrow head using a cone
  const coneGeometry = new THREE.ConeGeometry(0.15, 0.3, 8);
  const cone1 = new THREE.Mesh(coneGeometry, material);
  const cone2 = new THREE.Mesh(coneGeometry, material);
  const cone3 = new THREE.Mesh(coneGeometry, material);
  const cone4 = new THREE.Mesh(coneGeometry, material);
  
  // Position arrows based on face
  let position, rotation1, rotation2, rotation3, rotation4;
  const offset = 1.1;
  
  switch(face) {
    case 'R':
      position = new THREE.Vector3(offset, 0, 0);
      rotation1 = [0, 0, clockwise ? Math.PI/2 : -Math.PI/2];
      cone1.position.set(0, 0.7, 0.7);
      cone2.position.set(0, 0.7, -0.7);
      cone3.position.set(0, -0.7, 0.7);
      cone4.position.set(0, -0.7, -0.7);
      cone1.rotation.set(0, clockwise ? Math.PI : 0, clockwise ? Math.PI/4 : -Math.PI/4);
      cone2.rotation.set(0, clockwise ? Math.PI : 0, clockwise ? -Math.PI/4 : Math.PI/4);
      cone3.rotation.set(0, clockwise ? 0 : Math.PI, clockwise ? Math.PI/4 : -Math.PI/4);
      cone4.rotation.set(0, clockwise ? 0 : Math.PI, clockwise ? -Math.PI/4 : Math.PI/4);
      break;
    case 'L':
      position = new THREE.Vector3(-offset, 0, 0);
      cone1.position.set(0, 0.7, 0.7);
      cone2.position.set(0, 0.7, -0.7);
      cone3.position.set(0, -0.7, 0.7);
      cone4.position.set(0, -0.7, -0.7);
      cone1.rotation.set(0, clockwise ? 0 : Math.PI, clockwise ? Math.PI/4 : -Math.PI/4);
      cone2.rotation.set(0, clockwise ? 0 : Math.PI, clockwise ? -Math.PI/4 : Math.PI/4);
      cone3.rotation.set(0, clockwise ? Math.PI : 0, clockwise ? Math.PI/4 : -Math.PI/4);
      cone4.rotation.set(0, clockwise ? Math.PI : 0, clockwise ? -Math.PI/4 : Math.PI/4);
      break;
    case 'U':
      position = new THREE.Vector3(0, offset, 0);
      cone1.position.set(0.7, 0, 0.7);
      cone2.position.set(0.7, 0, -0.7);
      cone3.position.set(-0.7, 0, 0.7);
      cone4.position.set(-0.7, 0, -0.7);
      cone1.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, 0, clockwise ? Math.PI/2 : -Math.PI/2);
      cone2.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, 0, clockwise ? Math.PI/2 : -Math.PI/2);
      cone3.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, 0, clockwise ? -Math.PI/2 : Math.PI/2);
      cone4.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, 0, clockwise ? -Math.PI/2 : Math.PI/2);
      break;
    case 'D':
      position = new THREE.Vector3(0, -offset, 0);
      cone1.position.set(0.7, 0, 0.7);
      cone2.position.set(0.7, 0, -0.7);
      cone3.position.set(-0.7, 0, 0.7);
      cone4.position.set(-0.7, 0, -0.7);
      cone1.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, 0, clockwise ? Math.PI/2 : -Math.PI/2);
      cone2.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, 0, clockwise ? Math.PI/2 : -Math.PI/2);
      cone3.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, 0, clockwise ? -Math.PI/2 : Math.PI/2);
      cone4.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, 0, clockwise ? -Math.PI/2 : Math.PI/2);
      break;
    case 'F':
      position = new THREE.Vector3(0, 0, offset);
      cone1.position.set(0.7, 0.7, 0);
      cone2.position.set(0.7, -0.7, 0);
      cone3.position.set(-0.7, 0.7, 0);
      cone4.position.set(-0.7, -0.7, 0);
      cone1.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, clockwise ? -Math.PI/2 : Math.PI/2, 0);
      cone2.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, clockwise ? -Math.PI/2 : Math.PI/2, 0);
      cone3.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, clockwise ? Math.PI/2 : -Math.PI/2, 0);
      cone4.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, clockwise ? Math.PI/2 : -Math.PI/2, 0);
      break;
    case 'B':
      position = new THREE.Vector3(0, 0, -offset);
      cone1.position.set(0.7, 0.7, 0);
      cone2.position.set(0.7, -0.7, 0);
      cone3.position.set(-0.7, 0.7, 0);
      cone4.position.set(-0.7, -0.7, 0);
      cone1.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, clockwise ? -Math.PI/2 : Math.PI/2, 0);
      cone2.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, clockwise ? -Math.PI/2 : Math.PI/2, 0);
      cone3.rotation.set(clockwise ? -Math.PI/4 : Math.PI/4, clockwise ? Math.PI/2 : -Math.PI/2, 0);
      cone4.rotation.set(clockwise ? Math.PI/4 : -Math.PI/4, clockwise ? Math.PI/2 : -Math.PI/2, 0);
      break;
  }
  
  group.add(cone1, cone2, cone3, cone4);
  group.position.copy(position);
  
  return group;
}

function showRotationIndicator(face, clockwise) {
  // Remove existing indicators
  clearRotationIndicators();
  
  // Create new indicator
  const indicator = createRotationArrow(face, clockwise);
  scene.add(indicator);
  rotationIndicators.push(indicator);
  
  // Animate the indicator (pulsing effect)
  let startTime = Date.now();
  const animateDuration = 2000;
  
  function animateIndicator() {
    if (rotationIndicators.indexOf(indicator) === -1) return; // Indicator was removed
    
    const elapsed = Date.now() - startTime;
    const progress = (elapsed % 800) / 800;
    const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.15;
    
    indicator.scale.set(scale, scale, scale);
    
    // Update opacity with pulse
    indicator.children.forEach(child => {
      if (child.material) {
        child.material.opacity = 0.6 + Math.sin(progress * Math.PI * 2) * 0.2;
      }
    });
    
    if (elapsed < animateDuration) {
      requestAnimationFrame(animateIndicator);
    }
  }
  
  animateIndicator();
}

function clearRotationIndicators() {
  rotationIndicators.forEach(indicator => {
    scene.remove(indicator);
    indicator.children.forEach(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  });
  rotationIndicators = [];
}

// Add a ground plane that stays horizontal
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ 
  color: 0x0a0a12,
  shininess: 10,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Make it horizontal
ground.position.y = -3; // Position below the cube
ground.receiveShadow = true;
scene.add(ground);

// Add a subtle grid for depth perception
const gridHelper = new THREE.GridHelper(20, 20, 0x1a1a2e, 0x0f0f1e);
gridHelper.position.y = -2.99;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.3;
scene.add(gridHelper);

// ===== RUBIK'S CUBE DATA STRUCTURE =====
const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

// Standard Rubik's cube colors: Right, Left, Top, Bottom, Front, Back
const faceColors = {
  right: 0xB71234,   // Red
  left: 0xFF5800,    // Orange
  top: 0xFFFFFF,     // White
  bottom: 0xFFD500,  // Yellow
  front: 0x009B48,   // Green
  back: 0x0046AD     // Blue
};

// Store all 27 cubelets (including center)
const cubelets = [];
const size = 3;

// Create a realistic cubelet with black body and colored stickers
function createCubelet(x, y, z) {
  const cubeletGroup = new THREE.Group();
  
  // Black cube body (slightly smaller to create gaps)
  const blackMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x000000,
    shininess: 30
  });
  const bodyGeometry = new THREE.BoxGeometry(0.88, 0.88, 0.88);
  const body = new THREE.Mesh(bodyGeometry, blackMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  cubeletGroup.add(body);
  
  // Add rounded corners effect with edge highlights
  const edgeGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  const edgeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x1a1a1a,
    shininess: 50
  });
  const edges = new THREE.Mesh(edgeGeometry, edgeMaterial);
  cubeletGroup.add(edges);
  
  // Create stickers (colored squares) on visible faces
  const stickerSize = 0.85;
  const stickerThickness = 0.02;
  const offset = 0.46;
  
  // Determine which faces are visible (on the outside of the cube)
  const faces = [
    { condition: x === 1, color: faceColors.right, pos: [offset, 0, 0], rot: [0, Math.PI/2, 0] },
    { condition: x === -1, color: faceColors.left, pos: [-offset, 0, 0], rot: [0, -Math.PI/2, 0] },
    { condition: y === 1, color: faceColors.top, pos: [0, offset, 0], rot: [-Math.PI/2, 0, 0] },
    { condition: y === -1, color: faceColors.bottom, pos: [0, -offset, 0], rot: [Math.PI/2, 0, 0] },
    { condition: z === 1, color: faceColors.front, pos: [0, 0, offset], rot: [0, 0, 0] },
    { condition: z === -1, color: faceColors.back, pos: [0, 0, -offset], rot: [0, Math.PI, 0] }
  ];
  
  faces.forEach(face => {
    if (face.condition) {
      const stickerGeometry = new THREE.BoxGeometry(stickerSize, stickerSize, stickerThickness);
      const stickerMaterial = new THREE.MeshPhongMaterial({ 
        color: face.color,
        shininess: 100,
        specular: 0x222222
      });
      const sticker = new THREE.Mesh(stickerGeometry, stickerMaterial);
      sticker.position.set(...face.pos);
      sticker.rotation.set(...face.rot);
      sticker.castShadow = true;
      cubeletGroup.add(sticker);
      
      // Add slight border/bevel to sticker for realism
      const borderGeometry = new THREE.BoxGeometry(stickerSize + 0.02, stickerSize + 0.02, stickerThickness * 0.5);
      const borderMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        shininess: 20
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.set(face.pos[0] * 0.98, face.pos[1] * 0.98, face.pos[2] * 0.98);
      border.rotation.set(...face.rot);
      cubeletGroup.add(border);
    }
  });
  
  return cubeletGroup;
}

// Create the 3x3x3 cube
for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      // Position: -1, 0, 1 for each axis
      const px = x - 1;
      const py = y - 1;
      const pz = z - 1;
      
      const cubelet = createCubelet(px, py, pz);
      cubelet.position.set(px, py, pz);
      cubeGroup.add(cubelet);
      cubelets.push(cubelet);
    }
  }
}

// ===== LIGHTING =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight1.position.set(10, 10, 10);
directionalLight1.castShadow = true;
directionalLight1.shadow.mapSize.width = 2048;
directionalLight1.shadow.mapSize.height = 2048;
directionalLight1.shadow.camera.near = 0.5;
directionalLight1.shadow.camera.far = 50;
directionalLight1.shadow.camera.left = -15;
directionalLight1.shadow.camera.right = 15;
directionalLight1.shadow.camera.top = 15;
directionalLight1.shadow.camera.bottom = -15;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight2.position.set(-5, -3, -5);
scene.add(directionalLight2);

// Key light for better depth
const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
keyLight.position.set(5, 0, 8);
scene.add(keyLight);

// Add subtle colored rim lights for style
const rimLight1 = new THREE.PointLight(0x4ecdc4, 0.3, 50);
rimLight1.position.set(-8, 3, -8);
scene.add(rimLight1);

const rimLight2 = new THREE.PointLight(0xff6b9d, 0.3, 50);
rimLight2.position.set(8, -3, 8);
scene.add(rimLight2);

// ===== ROTATION CONTROLS =====
let isRotating = false;
let viewRotation = { x: 0.3, y: 0.7 }; // Start with camera looking down from above
let mouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;

// ===== MOVE TRACKING =====
let moveHistory = [];
let moveCount = 0;
let isSolving = false;
let isScrambling = false;

// ===== SAVE INITIAL STATE =====
const initialState = cubelets.map(c => ({
  position: c.position.clone(),
  quaternion: c.quaternion.clone()
}));

// ===== LAYER ROTATION FUNCTION =====
function rotateLayer(face, clockwise = true, recordMove = true) {
  if (isRotating) return;
  isRotating = true;

  // Track move in history (unless we're solving or it's marked not to record)
  if (recordMove && !isSolving) {
    moveHistory.push({ face, clockwise });
    if (!isScrambling) {
      moveCount++;
      updateMoveCounter();
      updateButtonStates(false); // Enable solve button after manual move
      
      // Check if solution is active and invalidate it if manual move detected
      if (solutionActive && !isAutoSolving) {
        invalidateSolution();
      }
    }
  }

  const angle = clockwise ? Math.PI / 2 : -Math.PI / 2;
  const duration = 300;
  const startTime = Date.now();

  // Select cubelets for this face
  let cubeletsToRotate = [];
  let axis = 'x';
  let axisValue = 0;

  switch(face) {
    case 'R': // Right face (x = 1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.x - 1) < 0.1);
      axis = 'x';
      break;
    case 'L': // Left face (x = -1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.x + 1) < 0.1);
      axis = 'x';
      break;
    case 'U': // Up face (y = 1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.y - 1) < 0.1);
      axis = 'y';
      break;
    case 'D': // Down face (y = -1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.y + 1) < 0.1);
      axis = 'y';
      break;
    case 'F': // Front face (z = 1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.z - 1) < 0.1);
      axis = 'z';
      break;
    case 'B': // Back face (z = -1)
      cubeletsToRotate = cubelets.filter(c => Math.abs(c.position.z + 1) < 0.1);
      axis = 'z';
      break;
  }

  // Store starting positions and rotations
  const startData = cubeletsToRotate.map(c => ({
    position: c.position.clone(),
    quaternion: c.quaternion.clone()
  }));

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentAngle = angle * progress;

    cubeletsToRotate.forEach((cubelet, i) => {
      const start = startData[i];
      
      // Reset to start position
      cubelet.position.copy(start.position);
      cubelet.quaternion.copy(start.quaternion);

      // Create rotation pivot at origin
      const rotationAxis = new THREE.Vector3(
        axis === 'x' ? 1 : 0,
        axis === 'y' ? 1 : 0,
        axis === 'z' ? 1 : 0
      );

      // Rotate position around axis
      cubelet.position.applyAxisAngle(rotationAxis, currentAngle);
      
      // Rotate the cubelet itself
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(rotationAxis, currentAngle);
      cubelet.quaternion.multiplyQuaternions(quaternion, start.quaternion);
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Snap to grid
      cubeletsToRotate.forEach(cubelet => {
        cubelet.position.x = Math.round(cubelet.position.x);
        cubelet.position.y = Math.round(cubelet.position.y);
        cubelet.position.z = Math.round(cubelet.position.z);
      });
      isRotating = false;
    }
  }

  animate();
}

// ===== SCRAMBLE FUNCTION =====
function scrambleCube() {
  if (isRotating || isSolving) return;
  
  isScrambling = true;
  const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
  const moves = 20;
  let count = 0;
  let lastMove = null;

  // Disable buttons during scramble
  updateButtonStates(true);

  function doMove() {
    if (count >= moves) {
      isScrambling = false;
      updateButtonStates(false);
      return;
    }
    
    // Wait until previous rotation is complete
    if (isRotating) {
      setTimeout(doMove, 50);
      return;
    }
    
    // Choose a random face and direction
    let face, clockwise;
    let attempts = 0;
    
    do {
      face = faces[Math.floor(Math.random() * faces.length)];
      clockwise = Math.random() > 0.5;
      attempts++;
      
      // Prevent the same face from being moved consecutively
      // This avoids moves like R followed by R' (which cancel out)
    } while (lastMove && lastMove.face === face && attempts < 10);
    
    rotateLayer(face, clockwise);
    lastMove = { face, clockwise };
    
    count++;
    setTimeout(doMove, 320); // Wait slightly longer than animation duration
  }

  doMove();
}

// ===== SOLVE FUNCTION =====
function solveCube() {
  if (isRotating || isSolving || moveHistory.length === 0) return;
  
  isSolving = true;
  updateButtonStates(true);

  // Reverse the move history
  const reversedMoves = [...moveHistory].reverse();
  let index = 0;

  function doMove() {
    if (index >= reversedMoves.length) {
      isSolving = false;
      moveHistory = [];
      moveCount = 0;
      updateMoveCounter();
      updateButtonStates(false);
      return;
    }
    
    // Wait until previous rotation is complete
    if (isRotating) {
      setTimeout(doMove, 50);
      return;
    }
    
    const move = reversedMoves[index];
    // Reverse the direction of the move
    rotateLayer(move.face, !move.clockwise, false);
    
    index++;
    setTimeout(doMove, 320);
  }

  doMove();
}

// ===== RESET FUNCTION =====
function resetCube() {
  if (isRotating || isSolving || isScrambling) return;
  
  isRotating = true;
  updateButtonStates(true);
  
  const duration = 500;
  const startTime = Date.now();
  
  // Store current states
  const startStates = cubelets.map(c => ({
    position: c.position.clone(),
    quaternion: c.quaternion.clone()
  }));
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out effect
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    cubelets.forEach((cubelet, i) => {
      // Interpolate position
      cubelet.position.lerpVectors(
        startStates[i].position, 
        initialState[i].position, 
        easeProgress
      );
      
      // Interpolate rotation using slerp (spherical linear interpolation)
      THREE.Quaternion.slerp(
        startStates[i].quaternion,
        initialState[i].quaternion,
        cubelet.quaternion,
        easeProgress
      );
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Snap to exact initial state
      cubelets.forEach((cubelet, i) => {
        cubelet.position.copy(initialState[i].position);
        cubelet.quaternion.copy(initialState[i].quaternion);
      });
      
      // Clear move tracking
      moveHistory = [];
      moveCount = 0;
      updateMoveCounter();
      isRotating = false;
      updateButtonStates(false);
    }
  }
  
  animate();
}

// ===== UPDATE MOVE COUNTER =====
function updateMoveCounter() {
  const counterElement = document.getElementById('moveCount');
  if (counterElement) {
    counterElement.textContent = moveCount;
  }
}

// ===== UPDATE BUTTON STATES =====
function updateButtonStates(disabled) {
  document.getElementById('scrambleBtn').disabled = disabled;
  document.getElementById('solveBtn').disabled = disabled || moveHistory.length === 0;
  document.getElementById('resetBtn').disabled = disabled;
  document.getElementById('getSolutionBtn').disabled = disabled;
}

// ===== KEYBOARD CONTROLS =====
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const clockwise = !e.shiftKey;

  // Arrow keys for view rotation
  const rotSpeed = 0.1;
  if (e.key === 'ArrowUp') viewRotation.x -= rotSpeed;
  if (e.key === 'ArrowDown') viewRotation.x += rotSpeed;
  if (e.key === 'ArrowLeft') viewRotation.y -= rotSpeed;
  if (e.key === 'ArrowRight') viewRotation.y += rotSpeed;
  
  // Clamp vertical rotation to prevent flipping
  viewRotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, viewRotation.x));

  // Cube rotations
  if (key === 'r') rotateLayer('R', clockwise);
  if (key === 'l') rotateLayer('L', clockwise);
  if (key === 'u') rotateLayer('U', clockwise);
  if (key === 'd') rotateLayer('D', clockwise);
  if (key === 'f') rotateLayer('F', clockwise);
  if (key === 'b') rotateLayer('B', clockwise);
  
  // Scramble
  if (key === 's') scrambleCube();
});

// ===== MOUSE CONTROLS =====
document.addEventListener('mousedown', (e) => {
  mouseDown = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (!mouseDown) return;
  
  const deltaX = e.clientX - lastMouseX;
  const deltaY = e.clientY - lastMouseY;
  
  viewRotation.y -= deltaX * 0.005; // Reversed direction
  viewRotation.x += deltaY * 0.005;
  
  // Clamp vertical rotation to prevent flipping
  viewRotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, viewRotation.x));
  
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});

// ===== BUTTON EVENT LISTENERS =====
document.getElementById('scrambleBtn').addEventListener('click', scrambleCube);
document.getElementById('solveBtn').addEventListener('click', solveCube);
document.getElementById('resetBtn').addEventListener('click', resetCube);

// Initialize button states
updateButtonStates(false);

// ===== COLOR PICKER FUNCTIONALITY =====
let selectedColor = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle color selection
document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected class from all options
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    this.classList.add('selected');
    
    // Store selected color
    selectedColor = parseInt(this.getAttribute('data-color'));
  });
});

// Handle cube face clicking
renderer.domElement.addEventListener('click', (event) => {
  // Don't do anything if no color is selected
  if (selectedColor === null) return;
  
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    // Find the first sticker (colored face) that was clicked
    for (let i = 0; i < intersects.length; i++) {
      const object = intersects[i].object;
      
      // Check if it's a sticker (has colored material and is part of a cubelet)
      if (object.material && object.material.color && 
          object.geometry && object.geometry.type === 'BoxGeometry') {
        
        // Check if it's a sticker by checking its dimensions
        const params = object.geometry.parameters;
        if (params.width < 0.9 && params.height < 0.9 && params.depth < 0.1) {
          // This is a sticker! Change its color
          object.material.color.setHex(selectedColor);
          break;
        }
      }
    }
  }
});

// ===== SOLUTION FINDER =====
let solutionSteps = [];
let currentStepIndex = 0;
let isAutoSolving = false;
let solutionActive = false;
let moveHistorySnapshot = [];

// Function to get the color of a sticker at a specific position
function getStickerColor(cubelet, face) {
  const children = cubelet.children;
  for (let child of children) {
    if (child.geometry && child.geometry.type === 'BoxGeometry') {
      const params = child.geometry.parameters;
      // Check if it's a sticker (small depth)
      if (params.depth < 0.1) {
        // Get the sticker's world position
        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);
        
        // Determine which face this sticker is on based on position
        const tolerance = 0.3;
        let stickerFace = null;
        
        if (Math.abs(worldPos.x - 1) < tolerance) stickerFace = 'R';
        else if (Math.abs(worldPos.x + 1) < tolerance) stickerFace = 'L';
        else if (Math.abs(worldPos.y - 1) < tolerance) stickerFace = 'U';
        else if (Math.abs(worldPos.y + 1) < tolerance) stickerFace = 'D';
        else if (Math.abs(worldPos.z - 1) < tolerance) stickerFace = 'F';
        else if (Math.abs(worldPos.z + 1) < tolerance) stickerFace = 'B';
        
        if (stickerFace === face && child.material && child.material.color) {
          return child.material.color.getHex();
        }
      }
    }
  }
  return null;
}

// Function to check if cube is in solved state
function isCubeSolved() {
  const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
  
  for (let face of faces) {
    const colors = [];
    for (let cubelet of cubelets) {
      const color = getStickerColor(cubelet, face);
      if (color !== null) {
        colors.push(color);
      }
    }
    
    // Check if all colors on this face are the same
    if (colors.length > 0) {
      const firstColor = colors[0];
      for (let color of colors) {
        if (color !== firstColor) {
          return false;
        }
      }
    }
  }
  
  return true;
}

// Simple solving algorithm - finds moves to solve the cube
function findSolution() {
  // Check if already solved
  if (isCubeSolved()) {
    return { solved: true, steps: [] };
  }
  
  // If we have move history, use reverse moves (like the solve button)
  if (moveHistory.length > 0) {
    const steps = [];
    const reversedMoves = [...moveHistory].reverse();
    
    for (let move of reversedMoves) {
      const notation = move.clockwise ? move.face + "'" : move.face;
      steps.push({
        move: move.face,
        clockwise: !move.clockwise,
        notation: notation,
        description: getMoveDescription(move.face, !move.clockwise)
      });
    }
    
    return { solved: false, steps: steps };
  }
  
  // For manually created states (using color picker), try to find a solution
  // This is a simplified approach - a real solver would use algorithms like Kociemba
  return { 
    solved: false, 
    steps: [],
    needsManualSolve: true,
    message: "Cube was modified with color picker. Try using Reset to return to solved state, or manually solve using standard Rubik's cube methods."
  };
}

function getMoveDescription(face, clockwise) {
  const faceNames = {
    'R': 'Right',
    'L': 'Left',
    'U': 'Top',
    'D': 'Bottom',
    'F': 'Front',
    'B': 'Back'
  };
  
  const direction = clockwise ? 'clockwise' : 'counter-clockwise';
  return `Turn ${faceNames[face]} face ${direction}`;
}

// Show solution panel
function showSolution() {
  const result = findSolution();
  const panel = document.getElementById('solutionPanel');
  const stepsContainer = document.getElementById('solutionSteps');
  
  if (result.solved) {
    stepsContainer.innerHTML = '<div class="solution-step">🎉 Cube is already solved!</div>';
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    solutionActive = false;
  } else if (result.needsManualSolve) {
    stepsContainer.innerHTML = `<div class="solution-step">${result.message}</div>`;
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    solutionActive = false;
  } else if (result.steps.length === 0) {
    stepsContainer.innerHTML = '<div class="solution-step">⚠️ No solution found. Try resetting the cube.</div>';
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    solutionActive = false;
  } else {
    solutionSteps = result.steps;
    currentStepIndex = 0;
    solutionActive = true;
    moveHistorySnapshot = JSON.parse(JSON.stringify(moveHistory)); // Deep copy
    displaySolutionSteps();
    document.getElementById('nextStepBtn').disabled = false;
    document.getElementById('autoSolveBtn').disabled = false;
  }
  
  panel.style.display = 'block';
}

function invalidateSolution() {
  if (!solutionActive) return;
  
  const stepsContainer = document.getElementById('solutionSteps');
  const warningDiv = document.createElement('div');
  warningDiv.className = 'solution-step';
  warningDiv.style.background = 'rgba(255, 100, 100, 0.3)';
  warningDiv.style.borderLeftColor = '#ff6464';
  warningDiv.innerHTML = '⚠️ Cube state changed! Solution is no longer valid. Click "Get Solution" again to recalculate.';
  stepsContainer.innerHTML = '';
  stepsContainer.appendChild(warningDiv);
  
  document.getElementById('nextStepBtn').disabled = true;
  document.getElementById('autoSolveBtn').disabled = true;
  solutionActive = false;
  clearRotationIndicators();
}

function displaySolutionSteps() {
  const stepsContainer = document.getElementById('solutionSteps');
  stepsContainer.innerHTML = '';
  
  solutionSteps.forEach((step, index) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'solution-step';
    
    if (index < currentStepIndex) {
      stepDiv.classList.add('completed');
    } else if (index === currentStepIndex) {
      stepDiv.classList.add('current');
    }
    
    stepDiv.innerHTML = `
      <span class="step-number">${index + 1}.</span>
      <span class="step-move">${step.notation}</span>
      <span>${step.description}</span>
    `;
    
    stepsContainer.appendChild(stepDiv);
  });
  
  // Update button states
  document.getElementById('nextStepBtn').disabled = currentStepIndex >= solutionSteps.length;
}

function executeNextStep() {
  if (currentStepIndex >= solutionSteps.length || isRotating || !solutionActive) return;
  
  const step = solutionSteps[currentStepIndex];
  
  // Show visual indicator on the cube
  showRotationIndicator(step.move, step.clockwise);
  
  // Execute the move after a short delay so user can see the indicator
  setTimeout(() => {
    rotateLayer(step.move, step.clockwise, false);
    
    // Clear indicator after move completes
    setTimeout(() => {
      clearRotationIndicators();
    }, 350);
  }, 1500);
  
  currentStepIndex++;
  displaySolutionSteps();
  
  if (currentStepIndex >= solutionSteps.length) {
    // Reset move tracking since cube is now solved
    moveHistory = [];
    moveCount = 0;
    updateMoveCounter();
    updateButtonStates(false);
    solutionActive = false;
    
    setTimeout(() => {
      const stepsContainer = document.getElementById('solutionSteps');
      const successMsg = document.createElement('div');
      successMsg.className = 'solution-step';
      successMsg.style.borderLeftColor = '#4ecdc4';
      successMsg.innerHTML = '🎉 Solution complete!';
      stepsContainer.appendChild(successMsg);
    }, 400);
  }
}

function autoSolve() {
  if (isAutoSolving || currentStepIndex >= solutionSteps.length || !solutionActive) return;
  
  isAutoSolving = true;
  document.getElementById('autoSolveBtn').disabled = true;
  document.getElementById('nextStepBtn').disabled = true;
  
  function executeStep() {
    if (currentStepIndex >= solutionSteps.length) {
      isAutoSolving = false;
      document.getElementById('autoSolveBtn').disabled = true;
      clearRotationIndicators();
      solutionActive = false;
      
      // Reset move tracking since cube is now solved
      moveHistory = [];
      moveCount = 0;
      updateMoveCounter();
      updateButtonStates(false);
      
      setTimeout(() => {
        const stepsContainer = document.getElementById('solutionSteps');
        const successMsg = document.createElement('div');
        successMsg.className = 'solution-step';
        successMsg.style.borderLeftColor = '#4ecdc4';
        successMsg.innerHTML = '🎉 Solution complete!';
        stepsContainer.appendChild(successMsg);
      }, 400);
      return;
    }
    
    if (isRotating) {
      setTimeout(executeStep, 50);
      return;
    }
    
    const step = solutionSteps[currentStepIndex];
    
    // Show visual indicator
    showRotationIndicator(step.move, step.clockwise);
    
    // Wait briefly for indicator visibility, then rotate
    setTimeout(() => {
      rotateLayer(step.move, step.clockwise, false);
      currentStepIndex++;
      displaySolutionSteps();
      
      // Clear indicator and move to next step
      setTimeout(() => {
        clearRotationIndicators();
        executeStep();
      }, 350);
    }, 800);
  }
  
  executeStep();
}

function closeSolutionPanel() {
  document.getElementById('solutionPanel').style.display = 'none';
  isAutoSolving = false;
  solutionSteps = [];
  currentStepIndex = 0;
  solutionActive = false;
  moveHistorySnapshot = [];
  clearRotationIndicators();
}

// Event listeners for solution buttons
document.getElementById('getSolutionBtn').addEventListener('click', showSolution);
document.getElementById('nextStepBtn').addEventListener('click', executeNextStep);
document.getElementById('autoSolveBtn').addEventListener('click', autoSolve);
document.getElementById('closeSolutionBtn').addEventListener('click', closeSolutionPanel);

// Event listener for toggle labels button
document.getElementById('toggleLabelsBtn').addEventListener('click', toggleLabels);

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== ANIMATION LOOP =====
function render() {
  requestAnimationFrame(render);
  
  // Update camera position based on view rotation
  const radius = 8;
  camera.position.x = radius * Math.sin(viewRotation.y) * Math.cos(viewRotation.x);
  camera.position.y = radius * Math.sin(viewRotation.x);
  camera.position.z = radius * Math.cos(viewRotation.y) * Math.cos(viewRotation.x);
  camera.lookAt(0, 0, 0);
  
  // Fade out ground and grid when camera is below or near the cube level
  const fadeThreshold = 1; // Start fading when camera Y is below this
  const fadeRange = 3; // Full fade range
  const cameraHeight = camera.position.y;
  
  let opacity = 0.3;
  if (cameraHeight < fadeThreshold) {
    // Calculate opacity based on camera height
    opacity = Math.max(0, Math.min(0.3, (cameraHeight + fadeRange) / fadeRange * 0.3));
  }
  
  ground.material.opacity = opacity;
  gridHelper.material.opacity = opacity;
  ground.visible = opacity > 0.01;
  gridHelper.visible = opacity > 0.01;
  
  renderer.render(scene, camera);
}

render();

