// ===== FAST SOLVER - MULTI-METHOD SOLVER =====
// Integrates three solving methods and chooses the best one

import * as State from './state.js';
import { solveKociemba } from './solverKociemba.js';
import { solveCFOP } from './solverCFOP.js';
import { solveBeginners } from './solverBeginners.js';

// Track which method to use (cycles through all three)
let currentMethodIndex = 0;
const METHODS = [
  { name: 'Kociemba', func: solveKociemba, icon: '🎯', description: 'Two-Phase Algorithm (Most Optimal)' },
  { name: 'CFOP', func: solveCFOP, icon: '🏎️', description: 'Speedcubing Method (Fridrich)' },
  { name: 'Beginners', func: solveBeginners, icon: '🎓', description: 'Layer-by-Layer (Most Reliable)' }
];

// ========== METHOD SELECTION ==========

export function cycleMethod() {
  currentMethodIndex = (currentMethodIndex + 1) % METHODS.length;
  const method = METHODS[currentMethodIndex];
  console.log(`🔄 Switched to: ${method.icon} ${method.name} - ${method.description}`);
  return method;
}

export function getCurrentMethod() {
  return METHODS[currentMethodIndex];
}

export function setMethod(index) {
  if (index >= 0 && index < METHODS.length) {
    currentMethodIndex = index;
    return METHODS[currentMethodIndex];
  }
  return null;
}

// ========== MAIN SOLVER ==========

export function findOptimalSolution(cubelets, moveHistory) {
  const method = METHODS[currentMethodIndex];
  console.log(`\n${'='.repeat(50)}`);
  console.log(`⚡ FAST SOLVE - Using: ${method.icon} ${method.name}`);
  console.log(`${method.description}`);
  console.log(`${'='.repeat(50)}\n`);
  
  // Call the selected solving method
  const result = method.func(cubelets, moveHistory);
  
  // Add method info to result
  result.methodName = method.name;
  result.methodIcon = method.icon;
  
  return result;
}

// ========== EXECUTION ==========

export function fastSolve(rotateLayerFn, updateMoveCounterFn, updateButtonStatesFn, cubelets, moveHistory) {
  if (State.isRotating || State.isSolving || State.isScrambling) return;
  
  const method = getCurrentMethod();
  
  // Debug logging
  console.log('🔍 Debug Info:');
  console.log('   Move History Length:', moveHistory.length);
  console.log('   Move History:', moveHistory);
  console.log('   Method:', method.name);
  
  // Find solution using current method
  const result = findOptimalSolution(cubelets, moveHistory);
  
  console.log('   Result:', result);
  
  if (result.solved) {
    alert(`✨ Cube is already solved!\n\nMove History: ${moveHistory.length} moves`);
    return;
  }
  
  if (result.needsReset) {
    const message = result.message || 
      'This cube state requires advanced analysis.\n\n' +
      'For cubes modified with the color picker:\n' +
      '• Use Reset to return to solved state\n' +
      '• Use Scramble for a solvable random state\n\n' +
      'The solver works best on scrambled cubes.';
    alert(`${method.icon} ${method.name}\n\n${message}`);
    return;
  }
  
  if (result.steps.length === 0) {
    alert(`⚠️ No solution found.\n\nDebug Info:\n• Move History: ${moveHistory.length} moves\n• Result: ${JSON.stringify(result, null, 2)}\n\nTry:\n• Scrambling with the Scramble button\n• Using a different solving method\n• Resetting the cube`);
    return;
  }
  
  // Show solving info
  console.log(`\n📊 Solution Summary:`);
  console.log(`   Method: ${result.method || method.name}`);
  console.log(`   Moves: ${result.steps.length}`);
  console.log(`   Reliable: ${result.reliable !== false ? 'Yes' : 'No'}`);
  
  // Execute the solution
  State.setIsSolving(true);
  updateButtonStatesFn(true);
  
  let index = 0;
  const steps = result.steps;
  const startTime = Date.now();
  
  function doMove() {
    console.log(`🎬 doMove called - index: ${index}/${steps.length}`);
    
    if (index >= steps.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      
      console.log('✅ All moves completed!');
      
      State.setIsSolving(false);
      State.setMoveHistory([]);
      State.setMoveCount(0);
      updateMoveCounterFn();
      updateButtonStatesFn(false);
      
      // Show completion message
      setTimeout(() => {
        const methodInfo = `${method.icon} ${result.method || method.name}`;
        const nextMethod = METHODS[(currentMethodIndex + 1) % METHODS.length];
        alert(
          `✨ Cube Solved Successfully!\n\n` +
          `Method: ${methodInfo}\n` +
          `Moves: ${steps.length}\n` +
          `Time: ${elapsed}s\n\n` +
          `💡 Tip: Click Fast Solve again to try:\n` +
          `${nextMethod.icon} ${nextMethod.name}\n` +
          `(${nextMethod.description})`
        );
        
        // Auto-cycle to next method for next solve
        cycleMethod();
      }, 300);
      return;
    }
    
    // Wait until previous rotation is complete
    if (State.isRotating) {
      console.log('⏳ Waiting for rotation to complete...');
      setTimeout(doMove, 50);
      return;
    }
    
    const step = steps[index];
    console.log(`🔄 Executing move ${index + 1}: ${step.notation}`);
    rotateLayerFn(step.move, step.clockwise, false);
    
    index++;
    setTimeout(doMove, 320);
  }
  
  console.log('🚀 Starting execution...');
  doMove();
}

// Export methods info for UI
export function getMethodsInfo() {
  return METHODS.map((m, i) => ({
    index: i,
    name: m.name,
    icon: m.icon,
    description: m.description,
    active: i === currentMethodIndex
  }));
}
