// ===== RUBIK'S CUBE CONSTRUCTION =====

// Standard Rubik's cube colors: Right, Left, Top, Bottom, Front, Back
export const faceColors = {
  right: 0xB71234,   // Red
  left: 0xFF5800,    // Orange
  top: 0xFFFFFF,     // White
  bottom: 0xFFD500,  // Yellow
  front: 0x009B48,   // Green
  back: 0x0046AD     // Blue
};

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

export function createCube(scene) {
  const cubeGroup = new THREE.Group();
  scene.add(cubeGroup);
  
  const cubelets = [];
  const size = 3;
  
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
  
  return { cubeGroup, cubelets };
}

export function saveInitialState(cubelets) {
  return cubelets.map(c => ({
    position: c.position.clone(),
    quaternion: c.quaternion.clone()
  }));
}

