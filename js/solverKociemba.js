// ===== KOCIEMBA TWO-PHASE SOLVER =====
// Uses the cubejs library (loaded globally as window.Cube) which implements
// Herbert Kociemba's two-phase algorithm. Solves ANY valid cube state
// (scrambles, manual moves, even color-picker edits) in ~20 moves.

const THREE = window.THREE;

let solverInitialized = false;
let solverInitializing = false;
const initCallbacks = [];

// Initialize the solver's pruning tables (takes a few seconds, done once).
// Safe to call multiple times; callbacks fire once init completes.
export function initKociemba(onReady) {
  if (solverInitialized) {
    if (onReady) onReady();
    return;
  }
  if (onReady) initCallbacks.push(onReady);
  if (solverInitializing) return;
  solverInitializing = true;

  const start = () => {
    if (typeof window.Cube === 'undefined') {
      // cubejs script not loaded yet, retry shortly
      setTimeout(start, 200);
      return;
    }
    // Defer so the UI can paint before the heavy table generation
    setTimeout(() => {
      window.Cube.initSolver();
      solverInitialized = true;
      solverInitializing = false;
      console.log('✅ Kociemba solver initialized');
      initCallbacks.forEach(cb => cb());
      initCallbacks.length = 0;
    }, 50);
  };
  start();
}

export function isSolverReady() {
  return solverInitialized;
}

// ========== CUBE STATE READING ==========

// Read the color of the sticker of `cubelet` that currently faces `face`.
function getStickerColor(cubelet, targetFace) {
  for (const child of cubelet.children) {
    if (child.geometry?.type === 'BoxGeometry' && child.geometry.parameters.depth < 0.1) {
      // Skip the border meshes behind each sticker. Identify them by size
      // (0.87 vs the sticker's 0.85) rather than color, since a border could
      // in principle be repainted via the color picker.
      if (child.geometry.parameters.width > 0.86) continue;

      const worldPos = new THREE.Vector3();
      child.getWorldPosition(worldPos);

      const tolerance = 0.3;
      let face = null;
      if (Math.abs(worldPos.x - 1.46) < tolerance) face = 'R';
      else if (Math.abs(worldPos.x + 1.46) < tolerance) face = 'L';
      else if (Math.abs(worldPos.y - 1.46) < tolerance) face = 'U';
      else if (Math.abs(worldPos.y + 1.46) < tolerance) face = 'D';
      else if (Math.abs(worldPos.z - 1.46) < tolerance) face = 'F';
      else if (Math.abs(worldPos.z + 1.46) < tolerance) face = 'B';

      if (face === targetFace && child.material?.color) {
        return child.material.color.getHex();
      }
    }
  }
  return null;
}

function findCubeletAt(cubelets, x, y, z) {
  for (const cubelet of cubelets) {
    const p = cubelet.position;
    if (Math.round(p.x) === x && Math.round(p.y) === y && Math.round(p.z) === z) {
      return cubelet;
    }
  }
  return null;
}

// Facelet coordinate maps in standard Kociemba order (U1..U9, R1..R9, F, D, L, B),
// each face read row by row as viewed from outside the cube.
const FACELET_POSITIONS = {
  U: [[-1,1,-1],[0,1,-1],[1,1,-1], [-1,1,0],[0,1,0],[1,1,0], [-1,1,1],[0,1,1],[1,1,1]],
  R: [[1,1,1],[1,1,0],[1,1,-1], [1,0,1],[1,0,0],[1,0,-1], [1,-1,1],[1,-1,0],[1,-1,-1]],
  F: [[-1,1,1],[0,1,1],[1,1,1], [-1,0,1],[0,0,1],[1,0,1], [-1,-1,1],[0,-1,1],[1,-1,1]],
  D: [[-1,-1,1],[0,-1,1],[1,-1,1], [-1,-1,0],[0,-1,0],[1,-1,0], [-1,-1,-1],[0,-1,-1],[1,-1,-1]],
  L: [[-1,1,-1],[-1,1,0],[-1,1,1], [-1,0,-1],[-1,0,0],[-1,0,1], [-1,-1,-1],[-1,-1,0],[-1,-1,1]],
  B: [[1,1,-1],[0,1,-1],[-1,1,-1], [1,0,-1],[0,0,-1],[-1,0,-1], [1,-1,-1],[0,-1,-1],[-1,-1,-1]]
};

const FACE_ORDER = ['U', 'R', 'F', 'D', 'L', 'B'];

// Convert the live 3D cube into a 54-character facelet string like
// "UUUUUUUUURRRRRRRRR..." that cubejs understands.
export function cubeToFaceletString(cubelets) {
  // Color -> face letter mapping derived from the six center stickers
  const colorToFace = {};
  for (const face of FACE_ORDER) {
    const centerPos = FACELET_POSITIONS[face][4];
    const center = findCubeletAt(cubelets, centerPos[0], centerPos[1], centerPos[2]);
    if (!center) return null;
    const color = getStickerColor(center, face);
    if (color === null) return null;
    if (colorToFace[color] !== undefined) return null; // duplicate center color
    colorToFace[color] = face;
  }

  let facelets = '';
  for (const face of FACE_ORDER) {
    for (const pos of FACELET_POSITIONS[face]) {
      const cubelet = findCubeletAt(cubelets, pos[0], pos[1], pos[2]);
      if (!cubelet) return null;
      const color = getStickerColor(cubelet, face);
      const letter = colorToFace[color];
      if (!letter) return null; // unknown color (shouldn't happen)
      facelets += letter;
    }
  }
  return facelets;
}

// ========== SOLVING ==========

function getMoveDescription(face, clockwise) {
  const names = { R: 'Right', L: 'Left', U: 'Top', D: 'Bottom', F: 'Front', B: 'Back' };
  return `Turn ${names[face]} face ${clockwise ? 'clockwise' : 'counter-clockwise'}`;
}

// Parse a cubejs solution string like "R U' F2 L" into executable steps.
// Double turns are expanded into two quarter turns for the animation engine.
function parseSolutionString(solution) {
  const steps = [];
  for (const token of solution.trim().split(/\s+/)) {
    if (!token) continue;
    const face = token[0];
    if (!'URFDLB'.includes(face)) continue;
    const prime = token.includes("'");
    const double = token.includes('2');
    const clockwise = !prime;
    const count = double ? 2 : 1;
    for (let i = 0; i < count; i++) {
      // Each expanded step carries quarter-turn notation; the solution panel
      // groups consecutive identical steps itself (a U2 displays as "U (x2)").
      steps.push({
        move: face,
        clockwise,
        notation: prime ? `${face}'` : face,
        description: getMoveDescription(face, clockwise)
      });
    }
  }
  return steps;
}

// Main entry point: solve the current cube state with Kociemba's algorithm.
export function solveKociemba(cubelets) {
  if (typeof window.Cube === 'undefined') {
    return {
      solved: false, steps: [], error: true,
      message: 'Solver library failed to load. Check your internet connection and reload the page.'
    };
  }

  const facelets = cubeToFaceletString(cubelets);
  if (!facelets) {
    return {
      solved: false, steps: [], error: true,
      message: 'Could not read the cube state. Try resetting the cube.'
    };
  }

  let cube;
  try {
    cube = window.Cube.fromString(facelets);
  } catch (e) {
    return {
      solved: false, steps: [], error: true,
      message: 'Invalid cube state (this can happen after color-picker edits that create an unsolvable cube). Use Reset and try again.'
    };
  }

  if (cube.isSolved()) {
    return { solved: true, steps: [], method: "Kociemba's Two-Phase Algorithm" };
  }

  if (!solverInitialized) {
    return {
      solved: false, steps: [], notReady: true,
      message: 'Solver is still initializing (this takes a few seconds after page load). Please try again in a moment.'
    };
  }

  let solution;
  try {
    solution = cube.solve();
  } catch (e) {
    return {
      solved: false, steps: [], error: true,
      message: 'No solution exists for this cube state. It is unsolvable (likely due to color-picker edits). Use Reset.'
    };
  }

  if (!solution) {
    return {
      solved: false, steps: [], error: true,
      message: 'Solver could not find a solution for this state. Use Reset.'
    };
  }

  return {
    solved: false,
    steps: parseSolutionString(solution),
    method: "Kociemba's Two-Phase Algorithm",
    solutionString: solution
  };
}
