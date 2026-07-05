// ===== FAST SOLVER =====
// Executes a real Kociemba two-phase solution on the current cube state.

import * as State from './state.js';
import { solveKociemba } from './solverKociemba.js';
import { showModal } from './modal.js';

export function findOptimalSolution(cubelets) {
  return solveKociemba(cubelets);
}

export function fastSolve(rotateLayerFn, updateMoveCounterFn, updateButtonStatesFn, cubelets, invalidateSolutionFn) {
  if (State.isRotating || State.isBusy()) return;

  const result = solveKociemba(cubelets);

  if (result.solved) {
    showModal({ icon: '✨', title: 'Cube is already solved!' });
    return;
  }

  if (result.error || result.notReady || result.steps.length === 0) {
    showModal({
      icon: '🎯',
      title: 'Kociemba Solver',
      stats: [{ value: result.message || 'No solution found.' }]
    });
    return;
  }

  // A solution shown in the panel no longer matches the cube once we solve it
  if (typeof invalidateSolutionFn === 'function') invalidateSolutionFn();

  State.setIsSolving(true);
  updateButtonStatesFn(true);

  let index = 0;
  const steps = result.steps;
  const startTime = Date.now();

  function doMove() {
    if (State.isRotating) {
      setTimeout(doMove, 50);
      return;
    }

    if (index >= steps.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

      State.setIsSolving(false);
      State.setMoveHistory([]);
      State.setMoveCount(0);
      updateMoveCounterFn();
      updateButtonStatesFn(false);

      setTimeout(() => {
        // Count notation moves (U2 = one move), not expanded quarter turns
        const moveCount = result.solutionString.trim().split(/\s+/).length;
        showModal({
          icon: '✨',
          title: 'Cube Solved!',
          stats: [
            { label: 'Method', value: `🎯 ${result.method}` },
            { label: 'Solution', value: result.solutionString, mono: true }
          ],
          statsRow: [
            { label: 'Moves', value: String(moveCount) },
            { label: 'Time', value: `${elapsed}s` }
          ]
        });
      }, 300);
      return;
    }

    const step = steps[index];
    rotateLayerFn(step.move, step.clockwise, false);
    index++;
    setTimeout(doMove, 50);
  }

  doMove();
}
