// ===== CUBE ACTIONS (SCRAMBLE, SOLVE, RESET) =====

import * as State from './state.js';

export function scrambleCube(rotateLayerFn, updateButtonStatesFn) {
  if (State.isRotating || State.isSolving) return;
  
  State.setIsScrambling(true);
  const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
  const moves = 20;
  let count = 0;
  let lastMove = null;

  // Disable buttons during scramble
  updateButtonStatesFn(true);

  function doMove() {
    if (count >= moves) {
      State.setIsScrambling(false);
      updateButtonStatesFn(false);
      return;
    }
    
    // Wait until previous rotation is complete
    if (State.isRotating) {
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
    
    rotateLayerFn(face, clockwise);
    lastMove = { face, clockwise };
    
    count++;
    setTimeout(doMove, 320); // Wait slightly longer than animation duration
  }

  doMove();
}

export function solveCube(rotateLayerFn, updateMoveCounterFn, updateButtonStatesFn) {
  if (State.isRotating || State.isSolving || State.moveHistory.length === 0) return;
  
  State.setIsSolving(true);
  updateButtonStatesFn(true);

  // Reverse the move history
  const reversedMoves = [...State.moveHistory].reverse();
  let index = 0;

  function doMove() {
    if (index >= reversedMoves.length) {
      State.setIsSolving(false);
      State.setMoveHistory([]);
      State.setMoveCount(0);
      updateMoveCounterFn();
      updateButtonStatesFn(false);
      return;
    }
    
    // Wait until previous rotation is complete
    if (State.isRotating) {
      setTimeout(doMove, 50);
      return;
    }
    
    const move = reversedMoves[index];
    // Reverse the direction of the move
    rotateLayerFn(move.face, !move.clockwise, false);
    
    index++;
    setTimeout(doMove, 320);
  }

  doMove();
}

export function resetCube(cubelets, initialState, updateMoveCounterFn, updateButtonStatesFn) {
  if (State.isRotating || State.isSolving || State.isScrambling) return;
  
  State.setIsRotating(true);
  updateButtonStatesFn(true);
  
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
      State.setMoveHistory([]);
      State.setMoveCount(0);
      updateMoveCounterFn();
      State.setIsRotating(false);
      updateButtonStatesFn(false);
    }
  }
  
  animate();
}

