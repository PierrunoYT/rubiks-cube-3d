// ===== LAYER ROTATION LOGIC =====

import * as State from './state.js';

// Access THREE from global scope
const THREE = window.THREE;

export function rotateLayer(face, clockwise = true, recordMove = true, state) {
  if (State.isRotating) return;
  State.setIsRotating(true);

  // Track move in history (unless we're solving or it's marked not to record)
  if (recordMove && !State.isSolving) {
    State.moveHistory.push({ face, clockwise });
    if (!State.isScrambling) {
      State.setMoveCount(State.moveCount + 1);
      state.updateMoveCounter();
      state.updateButtonStates(false); // Enable solve button after manual move
      
      // Check if solution is active and invalidate it if manual move detected
      if (State.solutionActive && !State.isAutoSolving) {
        state.invalidateSolution();
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
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.x - 1) < 0.1);
      axis = 'x';
      break;
    case 'L': // Left face (x = -1)
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.x + 1) < 0.1);
      axis = 'x';
      break;
    case 'M': // Middle vertical slice (x = 0) - rotates like L
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.x) < 0.1);
      axis = 'x';
      break;
    case 'U': // Up face (y = 1)
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.y - 1) < 0.1);
      axis = 'y';
      break;
    case 'D': // Down face (y = -1)
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.y + 1) < 0.1);
      axis = 'y';
      break;
    case 'E': // Equator slice (y = 0) - rotates like D
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.y) < 0.1);
      axis = 'y';
      break;
    case 'F': // Front face (z = 1)
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.z - 1) < 0.1);
      axis = 'z';
      break;
    case 'B': // Back face (z = -1)
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.z + 1) < 0.1);
      axis = 'z';
      break;
    case 'S': // Standing slice (z = 0) - rotates like F
      cubeletsToRotate = State.cubelets.filter(c => Math.abs(c.position.z) < 0.1);
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
      State.setIsRotating(false);
    }
  }

  animate();
}

