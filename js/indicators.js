// ===== VISUAL ROTATION INDICATORS =====

import * as State from './state.js';

export function createRotationArrow(face, clockwise, rotationCount = 1) {
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
  
  // Add rotation count badge if count > 1
  if (rotationCount > 1) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    // Draw circle background
    context.fillStyle = '#4ecdc4';
    context.beginPath();
    context.arc(128, 128, 100, 0, Math.PI * 2);
    context.fill();
    
    // Draw text
    context.fillStyle = '#1a1a2e';
    context.font = 'Bold 120px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('x' + rotationCount, 128, 140);
    
    // Create sprite from canvas
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true,
      opacity: 0.95
    });
    const badge = new THREE.Sprite(spriteMaterial);
    badge.scale.set(0.8, 0.8, 1);
    group.add(badge);
  }
  
  return group;
}

export function showRotationIndicator(scene, cubelets, face, clockwise, rotationCount = 1) {
  // Remove existing indicators
  clearRotationIndicators(scene, State.rotationIndicators);
  
  // Create new indicator
  const indicator = createRotationArrow(face, clockwise, rotationCount);
  scene.add(indicator);
  State.rotationIndicators.push(indicator);
  
  // Highlight the layer that needs to move
  highlightLayer(cubelets, face);
  
  // Animate the indicator (pulsing effect)
  let startTime = Date.now();
  const animateDuration = 2000;
  
  function animateIndicator() {
    if (State.rotationIndicators.indexOf(indicator) === -1) return; // Indicator was removed
    
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

// Function to highlight the layer that needs to move
export function highlightLayer(cubelets, face) {
  let cubeletsToHighlight = [];
  
  switch(face) {
    case 'R':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.x - 1) < 0.1);
      break;
    case 'L':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.x + 1) < 0.1);
      break;
    case 'U':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.y - 1) < 0.1);
      break;
    case 'D':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.y + 1) < 0.1);
      break;
    case 'F':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.z - 1) < 0.1);
      break;
    case 'B':
      cubeletsToHighlight = cubelets.filter(c => Math.abs(c.position.z + 1) < 0.1);
      break;
  }
  
  // Store original states
  const originalStates = [];
  
  // Add glow effect to layer
  cubeletsToHighlight.forEach(cubelet => {
    cubelet.children.forEach(child => {
      if (child.material && child.geometry && child.geometry.type === 'BoxGeometry') {
        const params = child.geometry.parameters;
        // Check if it's a sticker (small depth)
        if (params.depth < 0.1) {
          originalStates.push({
            material: child.material,
            originalEmissive: child.material.emissive ? child.material.emissive.clone() : new THREE.Color(0x000000),
            originalEmissiveIntensity: child.material.emissiveIntensity || 0
          });
          
          // Add emissive glow
          if (!child.material.emissive) {
            child.material.emissive = new THREE.Color(0x4ecdc4);
          } else {
            child.material.emissive.setHex(0x4ecdc4);
          }
          child.material.emissiveIntensity = 0.5;
        }
      }
    });
  });
  
  // Animate the glow
  let startTime = Date.now();
  const glowDuration = 2000;
  
  function animateGlow() {
    if (State.rotationIndicators.length === 0) {
      // Restore original states
      let index = 0;
      cubeletsToHighlight.forEach(cubelet => {
        cubelet.children.forEach(child => {
          if (child.material && child.geometry && child.geometry.type === 'BoxGeometry') {
            const params = child.geometry.parameters;
            if (params.depth < 0.1 && originalStates[index]) {
              child.material.emissive = originalStates[index].originalEmissive;
              child.material.emissiveIntensity = originalStates[index].originalEmissiveIntensity;
              index++;
            }
          }
        });
      });
      return;
    }
    
    const elapsed = Date.now() - startTime;
    const progress = (elapsed % 600) / 600;
    const intensity = 0.3 + Math.sin(progress * Math.PI * 2) * 0.2;
    
    cubeletsToHighlight.forEach(cubelet => {
      cubelet.children.forEach(child => {
        if (child.material && child.geometry && child.geometry.type === 'BoxGeometry') {
          const params = child.geometry.parameters;
          if (params.depth < 0.1) {
            child.material.emissiveIntensity = intensity;
          }
        }
      });
    });
    
    if (elapsed < glowDuration) {
      requestAnimationFrame(animateGlow);
    } else {
      // Restore original states
      let index = 0;
      cubeletsToHighlight.forEach(cubelet => {
        cubelet.children.forEach(child => {
          if (child.material && child.geometry && child.geometry.type === 'BoxGeometry') {
            const params = child.geometry.parameters;
            if (params.depth < 0.1 && originalStates[index]) {
              child.material.emissive = originalStates[index].originalEmissive;
              child.material.emissiveIntensity = originalStates[index].originalEmissiveIntensity;
              index++;
            }
          }
        });
      });
    }
  }
  
  animateGlow();
}

export function clearRotationIndicators(scene, rotationIndicators) {
  rotationIndicators.forEach(indicator => {
    scene.remove(indicator);
    indicator.children.forEach(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  });
  State.setRotationIndicators([]);
}

