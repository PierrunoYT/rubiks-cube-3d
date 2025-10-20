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
  document.getElementById('fastSolveBtn').disabled = disabled;
  document.getElementById('resetBtn').disabled = disabled;
  document.getElementById('getSolutionBtn').disabled = disabled;
  
  // Disable solver method buttons during solving
  document.getElementById('kociembaBtn').disabled = disabled;
  document.getElementById('cfopBtn').disabled = disabled;
  document.getElementById('beginnersBtn').disabled = disabled;
}

export function setupUIEventListeners(callbacks) {
  // Button event listeners
  document.getElementById('scrambleBtn').addEventListener('click', callbacks.scramble);
  document.getElementById('solveBtn').addEventListener('click', callbacks.solve);
  document.getElementById('fastSolveBtn').addEventListener('click', callbacks.fastSolve);
  document.getElementById('resetBtn').addEventListener('click', callbacks.reset);
  document.getElementById('getSolutionBtn').addEventListener('click', callbacks.getSolution);
  document.getElementById('nextStepBtn').addEventListener('click', callbacks.nextStep);
  document.getElementById('previewAllBtn').addEventListener('click', callbacks.previewAll);
  document.getElementById('autoSolveBtn').addEventListener('click', callbacks.autoSolve);
  document.getElementById('closeSolutionBtn').addEventListener('click', callbacks.closeSolution);
  document.getElementById('toggleLabelsBtn').addEventListener('click', callbacks.toggleLabels);
  
  // Solver method selection buttons
  document.getElementById('kociembaBtn').addEventListener('click', callbacks.selectKociemba);
  document.getElementById('cfopBtn').addEventListener('click', callbacks.selectCFOP);
  document.getElementById('beginnersBtn').addEventListener('click', callbacks.selectBeginners);
}

export function updateSolverButtonStates(activeIndex) {
  const buttons = [
    document.getElementById('kociembaBtn'),
    document.getElementById('cfopBtn'),
    document.getElementById('beginnersBtn')
  ];
  
  buttons.forEach((btn, index) => {
    if (index === activeIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

