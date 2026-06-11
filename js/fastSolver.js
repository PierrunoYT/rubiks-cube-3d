// ===== FAST SOLVER =====
// Executes a real Kociemba two-phase solution on the current cube state.

import * as State from './state.js';
import { solveKociemba } from './solverKociemba.js';

export function findOptimalSolution(cubelets) {
  return solveKociemba(cubelets);
}

export function fastSolve(rotateLayerFn, updateMoveCounterFn, updateButtonStatesFn, cubelets) {
  if (State.isRotating || State.isBusy()) return;

  const result = solveKociemba(cubelets);

  if (result.solved) {
    alert('✨ Cube is already solved!');
    return;
  }

  if (result.error || result.notReady || result.steps.length === 0) {
    alert(`🎯 Kociemba Solver\n\n${result.message || 'No solution found.'}`);
    return;
  }

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
        alert(
          `✨ Cube Solved!\n\n` +
          `Method: 🎯 ${result.method}\n` +
          `Solution: ${result.solutionString}\n` +
          `Moves: ${steps.length}\n` +
          `Time: ${elapsed}s`
        );
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
