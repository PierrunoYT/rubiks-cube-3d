// ===== FACE LABELS =====

// Access THREE from global scope
const THREE = window.THREE;

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

export function createLabels(scene) {
  const faceLabels = [];
  
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
  
  return faceLabels;
}

export function toggleLabels(faceLabels, labelsVisible) {
  const newLabelsVisible = !labelsVisible;
  faceLabels.forEach(label => {
    label.visible = newLabelsVisible;
  });
  return newLabelsVisible;
}

