// ===== MAIN ENTRY POINT =====

import * as State from './state.js';
import { initScene, setupLighting } from './scene.js';
import { createCube, saveInitialState, faceColors } from './cube.js';
import { createLabels, toggleLabels } from './labels.js';
import { showRotationIndicator, clearRotationIndicators } from './indicators.js';
import { rotateLayer } from './rotation.js';
import { scrambleCube, solveCube, resetCube } from './actions.js';
import { setupKeyboardControls, setupMouseControls } from './controls.js';
import { setupColorPicker } from './colorPicker.js';
import { 
  showSolution, 
  invalidateSolution, 
  previewStep, 
  previewAllSteps, 
  executeNextStep, 
  autoSolve, 
  closeSolutionPanel 
} from './solution.js';
import { fastSolve } from './fastSolver.js';
import { updateMoveCounter, updateButtonStates, setupUIEventListeners } from './ui.js';

// Initialize the application
function init() {
  // Check if THREE.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('THREE.js is not loaded yet. Retrying...');
    setTimeout(init, 100);
    return;
  }
  
  // 1. Initialize scene
  const { scene, camera, renderer, ground, gridHelper } = initScene();
  setupLighting(scene);
  
  // 2. Create cube
  const { cubeGroup, cubelets } = createCube(scene);
  State.setCubeGroup(cubeGroup);
  State.setCubelets(cubelets);
  State.setFaceColors(faceColors);
  
  // 3. Save initial state
  const initialState = saveInitialState(cubelets);
  State.setInitialState(initialState);
  
  // 4. Create labels
  const faceLabels = createLabels(scene);
  State.setFaceLabels(faceLabels);
  
  // 5. Create wrapper functions that pass necessary dependencies
  const rotateLayerWrapper = (face, clockwise = true, recordMove = true) => {
    rotateLayer(face, clockwise, recordMove, {
      updateMoveCounter,
      updateButtonStates,
      invalidateSolution: () => invalidateSolution(() => clearRotationIndicators(scene, State.rotationIndicators))
    });
  };
  
  const scrambleWrapper = () => {
    scrambleCube(rotateLayerWrapper, updateButtonStates);
  };
  
  const solveWrapper = () => {
    solveCube(rotateLayerWrapper, updateMoveCounter, updateButtonStates);
  };
  
  const fastSolveWrapper = () => {
    fastSolve(rotateLayerWrapper, updateMoveCounter, updateButtonStates, State.cubelets, State.moveHistory);
  };
  
  const resetWrapper = () => {
    resetCube(State.cubelets, State.initialState, updateMoveCounter, updateButtonStates);
  };
  
  const showRotationIndicatorWrapper = (face, clockwise, rotationCount) => {
    showRotationIndicator(scene, State.cubelets, face, clockwise, rotationCount);
  };
  
  const clearRotationIndicatorsWrapper = () => {
    clearRotationIndicators(scene, State.rotationIndicators);
  };
  
  const getSolutionWrapper = () => {
    showSolution(State.cubelets, State.moveHistory);
  };
  
  const nextStepWrapper = () => {
    executeNextStep(
      rotateLayerWrapper,
      showRotationIndicatorWrapper,
      clearRotationIndicatorsWrapper,
      updateMoveCounter,
      updateButtonStates
    );
  };
  
  const previewAllWrapper = () => {
    previewAllSteps(
      rotateLayerWrapper,
      showRotationIndicatorWrapper,
      clearRotationIndicatorsWrapper
    );
  };
  
  const autoSolveWrapper = () => {
    autoSolve(
      rotateLayerWrapper,
      showRotationIndicatorWrapper,
      clearRotationIndicatorsWrapper,
      updateMoveCounter,
      updateButtonStates
    );
  };
  
  const closeSolutionWrapper = () => {
    closeSolutionPanel(clearRotationIndicatorsWrapper);
  };
  
  const toggleLabelsWrapper = () => {
    const newLabelsVisible = toggleLabels(State.faceLabels, State.labelsVisible);
    State.setLabelsVisible(newLabelsVisible);
  };
  
  const previewStepWrapper = (stepIndex) => {
    previewStep(
      stepIndex,
      rotateLayerWrapper,
      showRotationIndicatorWrapper,
      clearRotationIndicatorsWrapper
    );
  };
  
  // Expose previewStepWrapper globally for inline button handlers
  window.previewStepWrapper = previewStepWrapper;
  
  // 6. Setup controls
  setupKeyboardControls(rotateLayerWrapper, scrambleWrapper);
  setupMouseControls(camera, renderer, cubeGroup, rotateLayerWrapper);
  setupColorPicker(scene, renderer, camera);
  
  // 7. Setup UI event listeners
  setupUIEventListeners({
    scramble: scrambleWrapper,
    solve: solveWrapper,
    fastSolve: fastSolveWrapper,
    reset: resetWrapper,
    getSolution: getSolutionWrapper,
    nextStep: nextStepWrapper,
    previewAll: previewAllWrapper,
    autoSolve: autoSolveWrapper,
    closeSolution: closeSolutionWrapper,
    toggleLabels: toggleLabelsWrapper
  });
  
  // 8. Initialize button states
  updateButtonStates(false);
  
  // 9. Setup window resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // 10. Start animation loop
  function render() {
    requestAnimationFrame(render);
    
    // Update camera position based on view rotation
    const radius = 8;
    camera.position.x = radius * Math.sin(State.viewRotation.y) * Math.cos(State.viewRotation.x);
    camera.position.y = radius * Math.sin(State.viewRotation.x);
    camera.position.z = radius * Math.cos(State.viewRotation.y) * Math.cos(State.viewRotation.x);
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
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

