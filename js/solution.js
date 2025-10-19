// ===== SOLUTION FINDER =====

import * as State from './state.js';

// Function to get the color of a sticker at a specific position
export function getStickerColor(cubelet, face) {
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
export function isCubeSolved(cubelets) {
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
export function findSolution(cubelets, moveHistory) {
  // Check if already solved
  if (isCubeSolved(cubelets)) {
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

export function getMoveDescription(face, clockwise) {
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
export function showSolution(cubelets, moveHistory) {
  const result = findSolution(cubelets, moveHistory);
  const panel = document.getElementById('solutionPanel');
  const stepsContainer = document.getElementById('solutionSteps');
  
  if (result.solved) {
    stepsContainer.innerHTML = '<div class="solution-step">🎉 Cube is already solved!</div>';
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('previewAllBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    State.setSolutionActive(false);
  } else if (result.needsManualSolve) {
    stepsContainer.innerHTML = `<div class="solution-step">${result.message}</div>`;
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('previewAllBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    State.setSolutionActive(false);
  } else if (result.steps.length === 0) {
    stepsContainer.innerHTML = '<div class="solution-step">⚠️ No solution found. Try resetting the cube.</div>';
    document.getElementById('nextStepBtn').disabled = true;
    document.getElementById('previewAllBtn').disabled = true;
    document.getElementById('autoSolveBtn').disabled = true;
    State.setSolutionActive(false);
  } else {
    State.setSolutionSteps(result.steps);
    State.setCurrentStepIndex(0);
    State.setSolutionActive(true);
    State.setMoveHistorySnapshot(JSON.parse(JSON.stringify(moveHistory))); // Deep copy
    displaySolutionSteps();
    document.getElementById('nextStepBtn').disabled = false;
    document.getElementById('previewAllBtn').disabled = false;
    document.getElementById('autoSolveBtn').disabled = false;
  }
  
  panel.style.display = 'block';
}

export function invalidateSolution(clearRotationIndicatorsFn) {
  if (!State.solutionActive) return;
  
  const stepsContainer = document.getElementById('solutionSteps');
  const warningDiv = document.createElement('div');
  warningDiv.className = 'solution-step';
  warningDiv.style.background = 'rgba(255, 100, 100, 0.3)';
  warningDiv.style.borderLeftColor = '#ff6464';
  warningDiv.innerHTML = '⚠️ Cube state changed! Solution is no longer valid. Click "Get Solution" again to recalculate.';
  stepsContainer.innerHTML = '';
  stepsContainer.appendChild(warningDiv);
  
  document.getElementById('nextStepBtn').disabled = true;
  document.getElementById('previewAllBtn').disabled = true;
  document.getElementById('autoSolveBtn').disabled = true;
  State.setSolutionActive(false);
  clearRotationIndicatorsFn();
}

export function displaySolutionSteps() {
  const stepsContainer = document.getElementById('solutionSteps');
  stepsContainer.innerHTML = '';
  
  // Group consecutive moves of the same face
  const groupedSteps = [];
  let i = 0;
  while (i < State.solutionSteps.length) {
    const currentStep = State.solutionSteps[i];
    let count = 1;
    let j = i + 1;
    
    // Count consecutive same moves
    while (j < State.solutionSteps.length && 
           State.solutionSteps[j].move === currentStep.move && 
           State.solutionSteps[j].clockwise === currentStep.clockwise) {
      count++;
      j++;
    }
    
    groupedSteps.push({
      ...currentStep,
      count: count,
      originalIndices: Array.from({length: count}, (_, k) => i + k)
    });
    
    i = j;
  }
  
  groupedSteps.forEach((step, groupIndex) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'solution-step';
    
    // Check if this group is completed or current
    const firstIndex = step.originalIndices[0];
    const lastIndex = step.originalIndices[step.originalIndices.length - 1];
    
    if (lastIndex < State.currentStepIndex) {
      stepDiv.classList.add('completed');
    } else if (firstIndex <= State.currentStepIndex && State.currentStepIndex <= lastIndex) {
      stepDiv.classList.add('current');
    }
    
    // Display notation with count if > 1
    const notation = step.count > 1 ? `${step.notation} (x${step.count})` : step.notation;
    const description = step.count > 1 ? 
      `${step.description} (${step.count} times)` : 
      step.description;
    
    // Add preview button for each step
    const previewBtn = document.createElement('button');
    previewBtn.className = 'preview-step-btn';
    previewBtn.innerHTML = '👁️';
    previewBtn.title = 'Preview this step';
    previewBtn.onclick = (e) => {
      e.stopPropagation();
      // This will be handled by the wrapper passed from main.js
      if (window.previewStepWrapper) {
        window.previewStepWrapper(firstIndex);
      }
    };
    
    stepDiv.innerHTML = `
      <span class="step-number">${firstIndex + 1}.</span>
      <span class="step-move">${notation}</span>
      <span>${description}</span>
    `;
    
    stepDiv.appendChild(previewBtn);
    stepsContainer.appendChild(stepDiv);
  });
  
  // Update button states
  document.getElementById('nextStepBtn').disabled = State.currentStepIndex >= State.solutionSteps.length;
}

// Preview a single step by moving and then reversing
export function previewStep(stepIndex, rotateLayerFn, showRotationIndicatorFn, clearRotationIndicatorsFn) {
  if (State.isPreviewing || State.isRotating || !State.solutionActive) return;
  
  State.setIsPreviewing(true);
  const step = State.solutionSteps[stepIndex];
  
  // Count consecutive same moves for display
  let rotationCount = 1;
  let tempIndex = stepIndex + 1;
  while (tempIndex < State.solutionSteps.length && 
         State.solutionSteps[tempIndex].move === step.move && 
         State.solutionSteps[tempIndex].clockwise === step.clockwise) {
    rotationCount++;
    tempIndex++;
  }
  
  // Show visual indicator
  showRotationIndicatorFn(step.move, step.clockwise, rotationCount);
  
  // Wait a bit for indicator visibility
  setTimeout(() => {
    // Perform the rotation
    rotateLayerFn(step.move, step.clockwise, false);
    
    // Wait for rotation to complete, then reverse it
    setTimeout(() => {
      clearRotationIndicatorsFn();
      
      // Reverse the rotation (move back)
      rotateLayerFn(step.move, !step.clockwise, false);
      
      // Clear everything after reverse completes
      setTimeout(() => {
        State.setIsPreviewing(false);
      }, 350);
    }, 350);
  }, 1000);
}

// Preview all remaining steps in sequence with actual movements
export function previewAllSteps(rotateLayerFn, showRotationIndicatorFn, clearRotationIndicatorsFn) {
  if (State.isPreviewing || State.isRotating || !State.solutionActive) return;
  
  State.setIsPreviewing(true);
  
  // Disable buttons during preview
  document.getElementById('nextStepBtn').disabled = true;
  document.getElementById('autoSolveBtn').disabled = true;
  document.getElementById('previewAllBtn').disabled = true;
  
  let previewIndex = State.currentStepIndex;
  
  function showNextPreview() {
    if (previewIndex >= State.solutionSteps.length) {
      State.setIsPreviewing(false);
      clearRotationIndicatorsFn();
      
      // Remove highlighting
      const stepsContainer = document.getElementById('solutionSteps');
      const stepDivs = stepsContainer.querySelectorAll('.solution-step');
      stepDivs.forEach(div => div.classList.remove('previewing'));
      
      // Re-enable buttons
      document.getElementById('nextStepBtn').disabled = State.currentStepIndex >= State.solutionSteps.length;
      document.getElementById('autoSolveBtn').disabled = false;
      document.getElementById('previewAllBtn').disabled = false;
      return;
    }
    
    // Wait for any rotation to complete
    if (State.isRotating) {
      setTimeout(showNextPreview, 50);
      return;
    }
    
    const step = State.solutionSteps[previewIndex];
    
    // Count consecutive same moves
    let rotationCount = 1;
    let tempIndex = previewIndex + 1;
    while (tempIndex < State.solutionSteps.length && 
           State.solutionSteps[tempIndex].move === step.move && 
           State.solutionSteps[tempIndex].clockwise === step.clockwise) {
      rotationCount++;
      tempIndex++;
    }
    
    // Show indicator
    showRotationIndicatorFn(step.move, step.clockwise, rotationCount);
    
    // Highlight current step in list
    const stepsContainer = document.getElementById('solutionSteps');
    const stepDivs = stepsContainer.querySelectorAll('.solution-step');
    stepDivs.forEach(div => div.classList.remove('previewing'));
    
    // Find and highlight the correct step div
    for (let div of stepDivs) {
      const stepNumberText = div.querySelector('.step-number').textContent;
      const stepNum = parseInt(stepNumberText) - 1;
      if (stepNum === previewIndex) {
        div.classList.add('previewing');
        break;
      }
    }
    
    // Perform the rotation after showing indicator
    setTimeout(() => {
      rotateLayerFn(step.move, step.clockwise, false);
      
      // Wait for rotation to complete, then reverse it
      setTimeout(() => {
        clearRotationIndicatorsFn();
        
        // Reverse the rotation
        rotateLayerFn(step.move, !step.clockwise, false);
        
        // Move to next preview after reverse completes
        setTimeout(() => {
          previewIndex++;
          showNextPreview();
        }, 350);
      }, 350);
    }, 800);
  }
  
  showNextPreview();
}

export function executeNextStep(rotateLayerFn, showRotationIndicatorFn, clearRotationIndicatorsFn, updateMoveCounterFn, updateButtonStatesFn) {
  if (State.currentStepIndex >= State.solutionSteps.length || State.isRotating || !State.solutionActive) return;
  
  const step = State.solutionSteps[State.currentStepIndex];
  
  // Count consecutive same moves for display
  let rotationCount = 1;
  let tempIndex = State.currentStepIndex + 1;
  while (tempIndex < State.solutionSteps.length && 
         State.solutionSteps[tempIndex].move === step.move && 
         State.solutionSteps[tempIndex].clockwise === step.clockwise) {
    rotationCount++;
    tempIndex++;
  }
  
  // Show visual indicator on the cube with count
  showRotationIndicatorFn(step.move, step.clockwise, rotationCount);
  
  // Execute the move after a short delay so user can see the indicator
  setTimeout(() => {
    rotateLayerFn(step.move, step.clockwise, false);
    
    // Clear indicator after move completes
    setTimeout(() => {
      clearRotationIndicatorsFn();
    }, 350);
  }, 1500);
  
  State.setCurrentStepIndex(State.currentStepIndex + 1);
  displaySolutionSteps();
  
  if (State.currentStepIndex >= State.solutionSteps.length) {
    // Reset move tracking since cube is now solved
    State.setMoveHistory([]);
    State.setMoveCount(0);
    updateMoveCounterFn();
    updateButtonStatesFn(false);
    State.setSolutionActive(false);
    
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

export function autoSolve(rotateLayerFn, showRotationIndicatorFn, clearRotationIndicatorsFn, updateMoveCounterFn, updateButtonStatesFn) {
  if (State.isAutoSolving || State.currentStepIndex >= State.solutionSteps.length || !State.solutionActive) return;
  
  State.setIsAutoSolving(true);
  document.getElementById('autoSolveBtn').disabled = true;
  document.getElementById('nextStepBtn').disabled = true;
  
  function executeStep() {
    if (State.currentStepIndex >= State.solutionSteps.length) {
      State.setIsAutoSolving(false);
      document.getElementById('autoSolveBtn').disabled = true;
      clearRotationIndicatorsFn();
      State.setSolutionActive(false);
      
      // Reset move tracking since cube is now solved
      State.setMoveHistory([]);
      State.setMoveCount(0);
      updateMoveCounterFn();
      updateButtonStatesFn(false);
      
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
    
    if (State.isRotating) {
      setTimeout(executeStep, 50);
      return;
    }
    
    const step = State.solutionSteps[State.currentStepIndex];
    
    // Count consecutive same moves for display
    let rotationCount = 1;
    let tempIndex = State.currentStepIndex + 1;
    while (tempIndex < State.solutionSteps.length && 
           State.solutionSteps[tempIndex].move === step.move && 
           State.solutionSteps[tempIndex].clockwise === step.clockwise) {
      rotationCount++;
      tempIndex++;
    }
    
    // Show visual indicator with count
    showRotationIndicatorFn(step.move, step.clockwise, rotationCount);
    
    // Wait briefly for indicator visibility, then rotate
    setTimeout(() => {
      rotateLayerFn(step.move, step.clockwise, false);
      State.setCurrentStepIndex(State.currentStepIndex + 1);
      displaySolutionSteps();
      
      // Clear indicator and move to next step
      setTimeout(() => {
        clearRotationIndicatorsFn();
        executeStep();
      }, 350);
    }, 800);
  }
  
  executeStep();
}

export function closeSolutionPanel(clearRotationIndicatorsFn) {
  document.getElementById('solutionPanel').style.display = 'none';
  State.setIsAutoSolving(false);
  State.setIsPreviewing(false);
  State.setSolutionSteps([]);
  State.setCurrentStepIndex(0);
  State.setSolutionActive(false);
  State.setMoveHistorySnapshot([]);
  clearRotationIndicatorsFn();
}

