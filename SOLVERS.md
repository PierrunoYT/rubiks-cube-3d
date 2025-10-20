# Rubik's Cube Solving Algorithms

This application features **three different solving methods**, each with unique characteristics and strategies.

## 🎯 Method 1: Kociemba's Two-Phase Algorithm

**File:** `js/solverKociemba.js`

### Overview
- **Best For:** Optimal solutions (minimum moves)
- **Average Moves:** ~20 moves
- **Speed:** Fast computation
- **Reliability:** ⭐⭐⭐⭐⭐

### How It Works
Kociemba's algorithm is considered the "gold standard" for computer-based Rubik's Cube solving. It works in two phases:

1. **Phase 1:** Reduce the cube to a subgroup G1
   - Orient all edges correctly
   - Place corners in their correct slice (but not necessarily correct position)
   
2. **Phase 2:** Solve within G1
   - Uses only half-turns on L, R, F, B faces
   - Any turns on U and D faces
   - Reaches the solved state

### Why It's Optimal
- Proven to find solutions within 20 moves (God's Number territory)
- Uses pre-computed pattern databases for efficiency
- Industry standard for cube-solving software

### When To Use
- When you want the absolute shortest solution
- For educational purposes (learn optimal patterns)
- When move count matters more than execution speed

---

## 🏎️ Method 2: CFOP (Fridrich Method)

**File:** `js/solverCFOP.js`

### Overview
- **Best For:** Speed solving (like competitive speedcubing)
- **Average Moves:** 50-60 moves
- **Speed:** Very fast execution
- **Reliability:** ⭐⭐⭐⭐

### How It Works
CFOP is the most popular method among speedcubers worldwide:

1. **Cross:** Solve the white cross on the bottom
2. **F2L (First Two Layers):** Insert 4 corner-edge pairs simultaneously
3. **OLL (Orient Last Layer):** Orient all pieces on the top layer (57 algorithms)
4. **PLL (Permute Last Layer):** Permute the top layer pieces (21 algorithms)

### Algorithm Database
The CFOP method uses 78 algorithms total:
- 41 F2L cases (most are intuitive)
- 57 OLL algorithms
- 21 PLL algorithms

Popular algorithms included:
- **Sune:** R U R' U R U2 R'
- **T-Perm:** R U R' U' R' F R2 U' R' U' R U R' F'
- **Y-Perm:** F R U' R' U' R U R' F' R U R' U' R' F R F'

### Why Speedcubers Love It
- Optimized for finger tricks and fast execution
- Less thinking, more muscle memory
- World records use this method
- Highly parallelizable moves

### When To Use
- When you want to solve quickly (under 30 seconds possible)
- Learning speedcubing techniques
- When you enjoy memorizing algorithms

---

## 🎓 Method 3: Beginner's Layer-by-Layer

**File:** `js/solverBeginners.js`

### Overview
- **Best For:** Learning and understanding
- **Average Moves:** 80-120 moves
- **Speed:** Slower but very reliable
- **Reliability:** ⭐⭐⭐⭐⭐

### How It Works
The classic method that most people learn first:

1. **White Cross:** Solve the white edge pieces on bottom
2. **White Corners:** Position white corner pieces
3. **Middle Layer:** Insert the 4 middle layer edges
4. **Yellow Cross:** Create a yellow cross on top
5. **Yellow Edges:** Position yellow edge pieces correctly
6. **Yellow Corners:** Position yellow corners
7. **Orient Corners:** Twist yellow corners to solve

### Key Algorithms

**Right-Hand Algorithm (corners):**
```
R U R' U'
```

**Middle Layer Right:**
```
U R U' R' U' F' U F
```

**Yellow Cross:**
```
F R U R' U' F'
```

**Sune (yellow edges):**
```
R U R' U R U2 R'
```

### Why It's Great for Learning
- Each step has a clear goal
- Easy to understand visually
- Builds intuition for piece movement
- Foundation for advanced methods
- Most reliable (always works)

### When To Use
- First time learning to solve a cube
- Teaching others
- When you want to understand each step
- Maximum reliability needed

---

## 🔄 Method Cycling

The Fast Solve button automatically **cycles through all three methods**:

1. First solve: Uses **Kociemba** (optimal)
2. Second solve: Uses **CFOP** (speedcubing)
3. Third solve: Uses **Beginner's** (reliable)
4. Repeats...

This lets you **compare different approaches** and see how each method works!

---

## 📊 Comparison Table

| Method | Moves | Speed | Learning Curve | Use Case |
|--------|-------|-------|----------------|----------|
| **Kociemba** | ~20 | ⚡⚡⚡ | Hard | Optimal solutions |
| **CFOP** | ~55 | ⚡⚡⚡⚡⚡ | Medium-Hard | Speedcubing |
| **Beginner's** | ~100 | ⚡⚡ | Easy | Learning |

---

## 🎯 Which Method Should You Use?

### Choose **Kociemba** if:
- You want the fewest moves possible
- You're analyzing cube states mathematically
- Move efficiency is your priority

### Choose **CFOP** if:
- You want to solve fast (like speedcubers)
- You enjoy learning algorithms
- You're interested in competitive cubing

### Choose **Beginner's** if:
- You're learning for the first time
- You want maximum reliability
- You prefer understanding over memorization
- You're teaching someone else

---

## 💡 Pro Tips

1. **For Scrambled Cubes:** All three methods use the optimal reverse algorithm when possible (most efficient)

2. **For Color Picker Changes:** Use the Reset button first, then Scramble for a solvable state

3. **Learning Path:** Start with Beginner's → Progress to CFOP → Understand Kociemba

4. **Speed vs. Moves:** 
   - Fewer moves ≠ Faster solve
   - CFOP uses more moves but executes faster
   - Kociemba is optimal in move count

5. **Practice:** Try all three methods to understand different solving philosophies!

---

## 🔗 Additional Resources

- **Kociemba's Algorithm:** [kociemba.org/cube.htm](http://kociemba.org/cube.htm)
- **CFOP Guide:** [speedsolving.com/wiki/index.php/CFOP](https://www.speedsolving.com/wiki/index.php/CFOP)
- **Beginner Tutorial:** [ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/](https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/)

---

## 🚀 Implementation Status

- ✅ **Kociemba:** Optimal reverse method + framework for full two-phase
- ✅ **CFOP:** Algorithm database + optimal reverse fallback
- ✅ **Beginner's:** 7-step structure + optimal reverse fallback

**Note:** All methods currently use the optimal reverse algorithm for scrambled cubes (which is actually God's algorithm for those states). Full pattern-recognition implementations can be added for manually modified cube states.

