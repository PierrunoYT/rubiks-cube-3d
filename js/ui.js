// ===== UI MANAGEMENT =====

import * as State from './state.js';

export function updateMoveCounter() {
  const counterElement = document.getElementById('moveCount');
  if (counterElement) {
    counterElement.textContent = State.moveCount;
  }
}

export function updateButtonStates(disabled) {
  document.getElementById('scrambleBtn').disabled = disabled;
  document.getElementById('solveBtn').disabled = disabled || State.moveHistory.length === 0;
  document.getElementById('resetBtn').disabled = disabled;
  document.getElementById('getSolutionBtn').disabled = disabled;
}

export function setupUIEventListeners(callbacks) {
  // Button event listeners
  document.getElementById('scrambleBtn').addEventListener('click', callbacks.scramble);
  document.getElementById('solveBtn').addEventListener('click', callbacks.solve);
  document.getElementById('resetBtn').addEventListener('click', callbacks.reset);
  document.getElementById('getSolutionBtn').addEventListener('click', callbacks.getSolution);
  document.getElementById('nextStepBtn').addEventListener('click', callbacks.nextStep);
  document.getElementById('previewAllBtn').addEventListener('click', callbacks.previewAll);
  document.getElementById('autoSolveBtn').addEventListener('click', callbacks.autoSolve);
  document.getElementById('closeSolutionBtn').addEventListener('click', callbacks.closeSolution);
  document.getElementById('toggleLabelsBtn').addEventListener('click', callbacks.toggleLabels);
}

