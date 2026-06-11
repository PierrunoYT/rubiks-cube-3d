# Rubik's Cube Solver

This application uses **Kociemba's Two-Phase Algorithm** — the industry standard for computer-based Rubik's Cube solving — via the [cubejs](https://github.com/ldez/cubejs) library.

## 🎯 Kociemba's Two-Phase Algorithm

**Files:** `js/solverKociemba.js` (state reading + integration), `js/fastSolver.js` (execution)

### Overview
- **Solves:** Any valid cube state — scrambles, manual moves, even color-picker edits
- **Solution Length:** 22 moves or fewer (typically ~20)
- **Speed:** 0.01–0.4 s per solve after a one-time ~4–5 s initialization

### How It Works
1. **Phase 1:** Reduce the cube to the subgroup G1
   - Orient all edges and corners correctly
   - Place the four middle-slice edges in the middle slice
2. **Phase 2:** Solve within G1
   - Uses only half-turns on L, R, F, B and any turns on U, D
   - Reaches the solved state

The search is guided by precomputed pruning tables, which are generated once when the page loads (the "Initializing solver..." status in the Fast Solve panel).

### Pipeline in This App
1. The live 3D cube is read sticker-by-sticker (via world positions of the sticker meshes)
2. The state is converted to a 54-character facelet string (`UUUUUUUUUR...`)
3. `cubejs` validates the state and runs the two-phase search
4. The returned algorithm (e.g. `R U' F2 L D' ...`) is parsed and animated move by move

### Invalid States
If the cube was edited with the color picker into an **unsolvable** configuration (e.g. a single twisted corner or duplicated colors), the solver detects this and reports it instead of guessing. Use **Reset** to return to a solved state.

## 📋 Get Solution Panel

The **Get Solution** button uses the same Kociemba solver to produce step-by-step instructions with visual guidance (arrows, layer highlighting, previews). While the solver is still initializing, it falls back to reversing your move history.

## 🔗 Additional Resources

- **Kociemba's Algorithm:** [kociemba.org/cube.htm](http://kociemba.org/cube.htm)
- **cubejs library:** [github.com/ldez/cubejs](https://github.com/ldez/cubejs)
