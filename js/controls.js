// ===== INPUT CONTROLS =====

import * as State from './state.js';

// Access THREE from global scope
const THREE = window.THREE;

export function setupKeyboardControls(rotateLayerFn, scrambleFn) {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const clockwise = !e.shiftKey;

    // Arrow keys for view rotation
    const rotSpeed = 0.1;
    if (e.key === 'ArrowUp') State.viewRotation.x -= rotSpeed;
    if (e.key === 'ArrowDown') State.viewRotation.x += rotSpeed;
    if (e.key === 'ArrowLeft') State.viewRotation.y -= rotSpeed;
    if (e.key === 'ArrowRight') State.viewRotation.y += rotSpeed;
    
    // Clamp vertical rotation to prevent flipping
    State.viewRotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, State.viewRotation.x));

    // Letter key cube rotations
    if (key === 'r') rotateLayerFn('R', clockwise);
    if (key === 'l') rotateLayerFn('L', clockwise);
    if (key === 'u') rotateLayerFn('U', clockwise);
    if (key === 'd') rotateLayerFn('D', clockwise);
    if (key === 'f') rotateLayerFn('F', clockwise);
    if (key === 'b') rotateLayerFn('B', clockwise);
    
    // Middle slices
    if (key === 'm') rotateLayerFn('M', clockwise);
    if (key === 'e') rotateLayerFn('E', clockwise);
    
    // Scramble
    if (key === 's') scrambleFn();
  });
}

export function setupMouseControls(camera, renderer, cubeGroup, rotateLayerFn) {
  document.addEventListener('mousedown', (e) => {
    State.setMouseDown(true);
    State.setLastMouseX(e.clientX);
    State.setLastMouseY(e.clientY);
  });

  document.addEventListener('mousemove', (e) => {
    if (!State.mouseDown) return;
    
    // Camera rotation only
    const deltaX = e.clientX - State.lastMouseX;
    const deltaY = e.clientY - State.lastMouseY;
    
    State.viewRotation.y -= deltaX * 0.005; // Reversed direction
    State.viewRotation.x += deltaY * 0.005;
    
    // Clamp vertical rotation to prevent flipping
    State.viewRotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, State.viewRotation.x));
    
    State.setLastMouseX(e.clientX);
    State.setLastMouseY(e.clientY);
  });

  document.addEventListener('mouseup', () => {
    State.setMouseDown(false);
  });
}

// Get which layer was clicked
export function getLayerFromClick(event, mouse, raycaster, renderer, cubeGroup, camera) {
  // Calculate mouse position in normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // Update the picking ray
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(cubeGroup.children, true);
  
  if (intersects.length > 0) {
    // Find the cubelet that was clicked
    let clickedCubelet = null;
    for (let i = 0; i < intersects.length; i++) {
      const object = intersects[i].object;
      // Find the parent cubelet group
      let current = object;
      while (current.parent && current.parent !== cubeGroup) {
        current = current.parent;
      }
      if (current.parent === cubeGroup) {
        clickedCubelet = current;
        break;
      }
    }
    
    if (clickedCubelet) {
      // Determine which face/layer this cubelet belongs to
      const pos = clickedCubelet.position;
      const tolerance = 0.1;
      
      // Determine which layers this cubelet is part of
      const layers = {
        face: null,
        position: pos.clone()
      };
      
      if (Math.abs(pos.x - 1) < tolerance) layers.R = true;
      if (Math.abs(pos.x + 1) < tolerance) layers.L = true;
      if (Math.abs(pos.y - 1) < tolerance) layers.U = true;
      if (Math.abs(pos.y + 1) < tolerance) layers.D = true;
      if (Math.abs(pos.z - 1) < tolerance) layers.F = true;
      if (Math.abs(pos.z + 1) < tolerance) layers.B = true;
      
      return layers;
    }
  }
  
  return null;
}

// Determine rotation direction based on drag
export function determineRotationFromDrag(layer, deltaX, deltaY, camera) {
  if (!layer) return null;
  
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);
  
  // Determine which face to rotate based on which layer and drag direction
  // Fixed directions to match intuitive dragging
  if (layer.R) {
    // Right face - vertical drag rotates around X axis
    if (absDeltaY > absDeltaX) {
      return { face: 'R', clockwise: deltaY > 0 };
    } else {
      return { face: 'R', clockwise: deltaX < 0 };
    }
  }
  if (layer.L) {
    // Left face - opposite of right
    if (absDeltaY > absDeltaX) {
      return { face: 'L', clockwise: deltaY < 0 };
    } else {
      return { face: 'L', clockwise: deltaX > 0 };
    }
  }
  if (layer.U) {
    // Top face - horizontal drag determines rotation
    if (absDeltaX > absDeltaY) {
      return { face: 'U', clockwise: deltaX > 0 };
    } else {
      return { face: 'U', clockwise: deltaY > 0 };
    }
  }
  if (layer.D) {
    // Bottom face - opposite of top
    if (absDeltaX > absDeltaY) {
      return { face: 'D', clockwise: deltaX < 0 };
    } else {
      return { face: 'D', clockwise: deltaY < 0 };
    }
  }
  if (layer.F) {
    // Front face
    if (absDeltaX > absDeltaY) {
      return { face: 'F', clockwise: deltaX < 0 };
    } else {
      return { face: 'F', clockwise: deltaY < 0 };
    }
  }
  if (layer.B) {
    // Back face - opposite of front
    if (absDeltaX > absDeltaY) {
      return { face: 'B', clockwise: deltaX > 0 };
    } else {
      return { face: 'B', clockwise: deltaY > 0 };
    }
  }
  
  return null;
}

