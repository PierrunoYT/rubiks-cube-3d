// ===== SCENE INITIALIZATION =====

// Access THREE from global scope
const THREE = window.THREE;

export function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('canvas'), 
    antialias: true 
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x1a1a2e);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // Add a ground plane that stays horizontal
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x0a0a12,
    shininess: 10,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Make it horizontal
  ground.position.y = -3; // Position below the cube
  ground.receiveShadow = true;
  scene.add(ground);

  // Add a subtle grid for depth perception
  const gridHelper = new THREE.GridHelper(20, 20, 0x1a1a2e, 0x0f0f1e);
  gridHelper.position.y = -2.99;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.3;
  scene.add(gridHelper);

  return { scene, camera, renderer, ground, gridHelper };
}

export function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight1.position.set(10, 10, 10);
  directionalLight1.castShadow = true;
  directionalLight1.shadow.mapSize.width = 2048;
  directionalLight1.shadow.mapSize.height = 2048;
  directionalLight1.shadow.camera.near = 0.5;
  directionalLight1.shadow.camera.far = 50;
  directionalLight1.shadow.camera.left = -15;
  directionalLight1.shadow.camera.right = 15;
  directionalLight1.shadow.camera.top = 15;
  directionalLight1.shadow.camera.bottom = -15;
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight2.position.set(-5, -3, -5);
  scene.add(directionalLight2);

  // Key light for better depth
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
  keyLight.position.set(5, 0, 8);
  scene.add(keyLight);

  // Add subtle colored rim lights for style
  const rimLight1 = new THREE.PointLight(0x4ecdc4, 0.3, 50);
  rimLight1.position.set(-8, 3, -8);
  scene.add(rimLight1);

  const rimLight2 = new THREE.PointLight(0xff6b9d, 0.3, 50);
  rimLight2.position.set(8, -3, 8);
  scene.add(rimLight2);
}

