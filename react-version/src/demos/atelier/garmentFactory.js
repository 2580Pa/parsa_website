import * as THREE from 'three';

/**
 * Creates a realistic t-shirt/polo with proper clothing topology.
 * Built like actual garment geometry - front/back panels + sleeves.
 */

export function buildSoftGarment(color = '#16a629', accentColor = '#ffffff') {
  const group = new THREE.Group();
  
  // Fabric material
  const fabricMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.85,
    metalness: 0.0,
    sheen: 0.65,
    sheenColor: new THREE.Color(0xffffff).multiplyScalar(0.4),
    clearcoat: 0.03,
    clearcoatRoughness: 0.6,
    side: THREE.DoubleSide,
  });
  
  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.9,
    sheen: 0.4,
    side: THREE.DoubleSide,
  });
  
  // Build t-shirt with proper proportions
  const tshirt = createTShirt(fabricMaterial, accentMaterial);
  group.add(tshirt);
  
  group.scale.setScalar(1.1);
  group.position.y = 0;
  
  return group;
}

/**
 * Creates a proper t-shirt mesh with clothing topology
 */
function createTShirt(bodyMaterial, trimMaterial) {
  const group = new THREE.Group();
  
  // === TORSO: Create front and back panels ===
  const torso = createTorsoMesh(bodyMaterial);
  group.add(torso);
  
  // === SLEEVES: Short sleeves extending from shoulders ===
  const leftSleeve = createSleeveMesh(bodyMaterial);
  leftSleeve.position.set(-0.7, 0.4, 0);
  leftSleeve.rotation.z = -Math.PI / 6; // Angle down slightly
  group.add(leftSleeve);
  
  const rightSleeve = createSleeveMesh(bodyMaterial);
  rightSleeve.position.set(0.7, 0.4, 0);
  rightSleeve.rotation.z = Math.PI / 6;
  group.add(rightSleeve);
  
  // === COLLAR: Simple crew neck ===
  const collar = createCrewNeck(trimMaterial);
  group.add(collar);
  
  // === ACCENT: Horizontal chest stripe ===
  const stripe = createChestStripe(trimMaterial);
  group.add(stripe);
  
  return group;
}

/**
 * Creates torso with proper shirt proportions
 */
function createTorsoMesh(material) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];
  
  // Define shirt outline: shoulders wider, tapers to hem
  const rows = 16;
  const cols = 24;
  
  for (let row = 0; row < rows; row++) {
    const v = row / (rows - 1); // 0 to 1, top to bottom
    const y = 0.8 - v * 1.6; // Top at 0.8, bottom at -0.8
    
    // Width profile: narrow at neck, wide at shoulders, tapers to hem
    let width;
    if (v < 0.1) {
      // Neck area - narrow
      width = 0.25;
    } else if (v < 0.3) {
      // Shoulders - widest
      width = 0.55 + (v - 0.1) * 1.5;
    } else if (v < 0.5) {
      // Upper torso
      width = 0.85 - (v - 0.3) * 0.5;
    } else {
      // Lower torso - slight taper
      width = 0.75 - (v - 0.5) * 0.2;
    }
    
    // Create ring of vertices
    for (let col = 0; col < cols; col++) {
      const u = col / cols;
      const angle = u * Math.PI * 2;
      
      // Add depth (front to back)
      const depth = Math.sin(angle) * 0.15;
      const x = Math.cos(angle) * width;
      const z = depth;
      
      vertices.push(x, y, z);
    }
  }
  
  // Create faces
  for (let row = 0; row < rows - 1; row++) {
    for (let col = 0; col < cols; col++) {
      const a = row * cols + col;
      const b = row * cols + ((col + 1) % cols);
      const c = (row + 1) * cols + ((col + 1) % cols);
      const d = (row + 1) * cols + col;
      
      indices.push(a, b, c);
      indices.push(a, c, d);
    }
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  
  return new THREE.Mesh(geometry, material);
}

/**
 * Creates a short sleeve
 */
function createSleeveMesh(material) {
  const geometry = new THREE.CylinderGeometry(
    0.14,  // top radius
    0.12,  // bottom radius
    0.3,   // height
    16,    // segments
    4
  );
  
  geometry.rotateZ(Math.PI / 2); // Horizontal
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

/**
 * Creates crew neck opening
 */
function createCrewNeck(material) {
  const geometry = new THREE.TorusGeometry(0.18, 0.012, 12, 24);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = 0.75;
  return mesh;
}

/**
 * Creates chest stripe detail
 */
function createChestStripe(material) {
  const geometry = new THREE.TorusGeometry(0.6, 0.01, 8, 32, Math.PI * 1.8);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = 0.2;
  return mesh;
}

/**
 * Generate a random garment color palette
 */
export function generateColorPalette() {
  const palettes = [
    { main: '#16a629', accent: '#ffffff' }, // Atelier brand green
    { main: '#2c3e50', accent: '#ecf0f1' }, // Navy & white
    { main: '#c0392b', accent: '#ffffff' }, // Deep red & white
    { main: '#8e44ad', accent: '#ecf0f1' }, // Purple & light
    { main: '#2980b9', accent: '#ffffff' }, // Royal blue & white
    { main: '#27ae60', accent: '#f39c12' }, // Green & gold
    { main: '#d35400', accent: '#ecf0f1' }, // Orange & cream
    { main: '#34495e', accent: '#95a5a6' }, // Dark slate & silver
  ];
  
  return palettes[Math.floor(Math.random() * palettes.length)];
}

/**
 * Get the dominant color from a garment (for background crossfade)
 */
export function getGarmentDominantColor(garment) {
  // Get the main torso mesh material color
  const torsoMesh = garment.children.find(child => child.type === 'Mesh');
  if (torsoMesh && torsoMesh.material) {
    return torsoMesh.material.color;
  }
  return new THREE.Color('#16a629');
}
