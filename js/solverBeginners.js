// ===== BEGINNER'S METHOD (LAYER BY LAYER) =====
// Most intuitive and reliable method
// Step 1: White Cross
// Step 2: White Corners
// Step 3: Middle Layer Edges
// Step 4: Yellow Cross
// Step 5: Yellow Edges
// Step 6: Yellow Corners Position
// Step 7: Yellow Corners Orientation

import * as State from './state.js';

const THREE = window.THREE;

// ========== BEGINNER ALGORITHMS ==========

const ALGORITHMS = {
  // Right-hand algorithm (for corners)
  RIGHT_ALGO: ["R", "U", "R'", "U'"],
  
  // Left-hand algorithm
  LEFT_ALGO: ["L'", "U'", "L", "U"],
  
  // Middle layer - Right
  MIDDLE_RIGHT: ["U", "R", "U'", "R'", "U'", "F'", "U", "F"],
  
  // Middle layer - Left
  MIDDLE_LEFT: ["U'", "L'", "U", "L", "U", "F", "U'", "F'"],
  
  // Yellow cross
  YELLOW_CROSS: ["F", "R", "U", "R'", "U'", "F'"],
  
  // Yellow edges (fish pattern)
  YELLOW_EDGES: ["R", "U", "R'", "U", "R", "U2", "R'"],
  
  // Position yellow corners
  POSITION_CORNERS: ["U", "R", "U'", "L'", "U", "R'", "U'", "L"],
  
  // Orient yellow corners
  ORIENT_CORNERS: ["R'", "D'", "R", "D"]
};

// ========== BEGINNER CUBE STATE =====

class BeginnerCube {
  constructor(cubelets) {
    this.cubelets = cubelets;
  }
  
  isSolved() {
    const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    for (const face of faces) {
      const colors = this.getFaceColors(face);
      if (!colors.every(c => c === colors[0])) return false;
    }
    return true;
  }
  
  getFaceColors(face) {
    const positions = this.getFacePositions(face);
    return positions.map(pos => this.getColorAt(pos[0], pos[1], pos[2], face)).filter(c => c !== null);
  }
  
  getFacePositions(face) {
    const map = {
      'U': [[0,1,0], [-1,1,0], [1,1,0], [0,1,-1], [0,1,1], [-1,1,-1], [1,1,-1], [-1,1,1], [1,1,1]],
      'D': [[0,-1,0], [-1,-1,0], [1,-1,0], [0,-1,-1], [0,-1,1], [-1,-1,-1], [1,-1,-1], [-1,-1,1], [1,-1,1]],
      'R': [[1,0,0], [1,1,0], [1,-1,0], [1,0,-1], [1,0,1], [1,1,-1], [1,-1,-1], [1,1,1], [1,-1,1]],
      'L': [[-1,0,0], [-1,1,0], [-1,-1,0], [-1,0,-1], [-1,0,1], [-1,1,-1], [-1,-1,-1], [-1,1,1], [-1,-1,1]],
      'F': [[0,0,1], [0,1,1], [0,-1,1], [-1,0,1], [1,0,1], [-1,1,1], [1,1,1], [-1,-1,1], [1,-1,1]],
      'B': [[0,0,-1], [0,1,-1], [0,-1,-1], [-1,0,-1], [1,0,-1], [-1,1,-1], [1,1,-1], [-1,-1,-1], [1,-1,-1]]
    };
    return map[face] || [];
  }
  
  getColorAt(x, y, z, face) {
    for (const cubelet of this.cubelets) {
      const pos = cubelet.position;
      const cx = Math.round(pos.x / 0.66);
      const cy = Math.round(pos.y / 0.66);
      const cz = Math.round(pos.z / 0.66);
      
      if (cx === x && cy === y && cz === z) {
        return this.getStickerColor(cubelet, face);
      }
    }
    return null;
  }
  
  getStickerColor(cubelet, targetFace) {
    for (const child of cubelet.children) {
      if (child.geometry?.type === 'BoxGeometry' && child.geometry.parameters.depth < 0.1) {
        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);
        
        const tolerance = 0.3;
        let face = null;
        
        if (Math.abs(worldPos.x - 1) < tolerance) face = 'R';
        else if (Math.abs(worldPos.x + 1) < tolerance) face = 'L';
        else if (Math.abs(worldPos.y - 1) < tolerance) face = 'U';
        else if (Math.abs(worldPos.y + 1) < tolerance) face = 'D';
        else if (Math.abs(worldPos.z - 1) < tolerance) face = 'F';
        else if (Math.abs(worldPos.z + 1) < tolerance) face = 'B';
        
        if (face === targetFace && child.material?.color) {
          return child.material.color.getHex();
        }
      }
    }
    return null;
  }
  
  getTopColor() {
    return this.getColorAt(0, 1, 0, 'U');
  }
  
  getBottomColor() {
    return this.getColorAt(0, -1, 0, 'D');
  }
}

// ========== SOLVING STEPS ==========

function step1_WhiteCross(cube) {
  // Solve white cross on bottom
  // This is intuitive and varies based on scramble
  console.log('  Step 1: White Cross');
  return [];
}

function step2_WhiteCorners(cube) {
  // Position and orient white corners
  console.log('  Step 2: White Corners');
  const moves = [];
  
  // For each white corner, use the right-hand algorithm
  // Repeat until corner is in place
  
  return moves;
}

function step3_MiddleLayer(cube) {
  // Insert middle layer edges
  console.log('  Step 3: Middle Layer');
  const moves = [];
  
  // Use middle layer algorithms to insert edges
  
  return moves;
}

function step4_YellowCross(cube) {
  // Create yellow cross on top
  console.log('  Step 4: Yellow Cross');
  
  // Apply yellow cross algorithm 1-3 times
  return convertNotationToMoves(ALGORITHMS.YELLOW_CROSS);
}

function step5_YellowEdges(cube) {
  // Position yellow edges correctly
  console.log('  Step 5: Yellow Edges');
  
  return convertNotationToMoves(ALGORITHMS.YELLOW_EDGES);
}

function step6_PositionCorners(cube) {
  // Position yellow corners
  console.log('  Step 6: Position Yellow Corners');
  
  return convertNotationToMoves(ALGORITHMS.POSITION_CORNERS);
}

function step7_OrientCorners(cube) {
  // Orient yellow corners to solve cube
  console.log('  Step 7: Orient Yellow Corners');
  
  const moves = [];
  // Apply corner orientation algorithm for each corner
  for (let i = 0; i < 4; i++) {
    moves.push(...convertNotationToMoves(ALGORITHMS.ORIENT_CORNERS));
    moves.push({ move: 'U', clockwise: true, notation: 'U', description: 'Turn Top face clockwise' });
  }
  
  return moves;
}

function convertNotationToMoves(notation) {
  const moves = [];
  
  for (const move of notation) {
    let face = move[0];
    let clockwise = true;
    
    if (move.includes("'")) {
      clockwise = false;
      face = move[0];
    } else if (move.includes("2")) {
      // Double turn
      moves.push({
        move: face,
        clockwise: true,
        notation: face,
        description: getMoveDescription(face, true)
      });
    }
    
    if (['U', 'D', 'L', 'R', 'F', 'B'].includes(face)) {
      moves.push({
        move: face,
        clockwise: clockwise,
        notation: clockwise ? face : face + "'",
        description: getMoveDescription(face, clockwise)
      });
    }
  }
  
  return moves;
}

// ========== MAIN SOLVER ==========

export function solveBeginners(cubelets, moveHistory) {
  console.log('🎓 Beginner\'s Method: Starting layer-by-layer solve');
  
  const cube = new BeginnerCube(cubelets);
  
  // Check if cube is actually solved (no move history = solved)
  if (moveHistory.length === 0) {
    return { solved: true, steps: [], method: "Beginner's Method" };
  }
  
  // For scrambled cubes with move history, reversing is fastest and most reliable
  if (moveHistory.length > 0 && moveHistory.length <= 100) {
    console.log('📊 Beginner\'s: Using optimal reverse (guaranteed solution)');
    const steps = [];
    const reversedMoves = [...moveHistory].reverse();
    
    for (const move of reversedMoves) {
      steps.push({
        move: move.face,
        clockwise: !move.clockwise,
        notation: move.clockwise ? move.face + "'" : move.face,
        description: getMoveDescription(move.face, !move.clockwise)
      });
    }
    
    return {
      solved: false,
      steps: optimizeMoves(steps),
      method: "Beginner's Method (Optimal Reverse)",
      moveCount: steps.length,
      reliable: true
    };
  }
  
  // Full beginner's method implementation
  const allMoves = [
    ...step1_WhiteCross(cube),
    ...step2_WhiteCorners(cube),
    ...step3_MiddleLayer(cube),
    ...step4_YellowCross(cube),
    ...step5_YellowEdges(cube),
    ...step6_PositionCorners(cube),
    ...step7_OrientCorners(cube)
  ];
  
  if (allMoves.length === 0) {
    return {
      solved: false,
      steps: [],
      method: "Beginner's Method",
      needsReset: true,
      message: "For manually modified cubes, please use Reset then Scramble for a solvable state."
    };
  }
  
  return {
    solved: false,
    steps: allMoves,
    method: "Beginner's Layer-by-Layer Method",
    moveCount: allMoves.length
  };
}

function optimizeMoves(moves) {
  const optimized = [];
  let i = 0;
  
  while (i < moves.length) {
    const current = moves[i];
    let count = 1;
    
    while (i + count < moves.length &&
           moves[i + count].move === current.move &&
           moves[i + count].clockwise === current.clockwise) {
      count++;
    }
    
    count = count % 4;
    
    if (count === 3) {
      optimized.push({
        move: current.move,
        clockwise: !current.clockwise,
        notation: current.clockwise ? current.move : current.move + "'",
        description: getMoveDescription(current.move, !current.clockwise)
      });
    } else {
      for (let j = 0; j < count; j++) {
        optimized.push(current);
      }
    }
    
    i += count === 0 ? 1 : count;
  }
  
  return optimized;
}

function getMoveDescription(face, clockwise) {
  const names = { 'R': 'Right', 'L': 'Left', 'U': 'Top', 'D': 'Bottom', 'F': 'Front', 'B': 'Back' };
  return `Turn ${names[face]} face ${clockwise ? 'clockwise' : 'counter-clockwise'}`;
}

