// ===== CENTRALIZED STATE MANAGEMENT =====

// Scene-related state
export let isRotating = false;
export let isSolving = false;
export let isScrambling = false;
export let isPreviewing = false;
export let isAutoSolving = false;

// Cube state
export let cubelets = [];
export let cubeGroup = null;
export let faceColors = null;
export let initialState = [];

// View state
export let viewRotation = { x: 0.3, y: 0.7 };
export let mouseDown = false;
export let lastMouseX = 0;
export let lastMouseY = 0;
export let isDraggingLayer = false;
export let draggedLayer = null;
export let dragStartX = 0;
export let dragStartY = 0;
export let shiftPressed = false;

// Move tracking
export let moveHistory = [];
export let moveCount = 0;

// Label state
export let faceLabels = [];
export let labelsVisible = true;

// Indicator state
export let rotationIndicators = [];
export let rotationCountBadge = null;

// Color picker state
export let selectedColor = null;
export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2();

// Solution state
export let solutionSteps = [];
export let currentStepIndex = 0;
export let solutionActive = false;
export let moveHistorySnapshot = [];

// State setters (for updating state from other modules)
export function setIsRotating(value) { isRotating = value; }
export function setIsSolving(value) { isSolving = value; }
export function setIsScrambling(value) { isScrambling = value; }
export function setIsPreviewing(value) { isPreviewing = value; }
export function setIsAutoSolving(value) { isAutoSolving = value; }

export function setCubelets(value) { cubelets = value; }
export function setCubeGroup(value) { cubeGroup = value; }
export function setFaceColors(value) { faceColors = value; }
export function setInitialState(value) { initialState = value; }

export function setViewRotation(value) { viewRotation = value; }
export function setMouseDown(value) { mouseDown = value; }
export function setLastMouseX(value) { lastMouseX = value; }
export function setLastMouseY(value) { lastMouseY = value; }
export function setIsDraggingLayer(value) { isDraggingLayer = value; }
export function setDraggedLayer(value) { draggedLayer = value; }
export function setDragStartX(value) { dragStartX = value; }
export function setDragStartY(value) { dragStartY = value; }
export function setShiftPressed(value) { shiftPressed = value; }

export function setMoveHistory(value) { moveHistory = value; }
export function setMoveCount(value) { moveCount = value; }

export function setFaceLabels(value) { faceLabels = value; }
export function setLabelsVisible(value) { labelsVisible = value; }

export function setRotationIndicators(value) { rotationIndicators = value; }
export function setRotationCountBadge(value) { rotationCountBadge = value; }

export function setSelectedColor(value) { selectedColor = value; }

export function setSolutionSteps(value) { solutionSteps = value; }
export function setCurrentStepIndex(value) { currentStepIndex = value; }
export function setSolutionActive(value) { solutionActive = value; }
export function setMoveHistorySnapshot(value) { moveHistorySnapshot = value; }

