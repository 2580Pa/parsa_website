import * as THREE from 'three';

/**
 * Creates a soft, volumetric polo/tunic garment with proper thickness and fabric feel.
 * No flat planes or cardboard look - this builds a proper 3D mesh with volume.
 */

export function buildSoftGarment(color = '#16a629', accentColor = '#ffffff') {
  const group = new THREE.Group();
  
  // === 1. TORSO: Create volumetric body with front and back panels ===
  const torsoGeometry = createTorsoGeometry();
  
  // Use MeshPhysicalMaterial for realistic fabric rendering
  const fabricMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.7,
    metalness: 0.0,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    clearcoat: 0.1,
    clearcoatRoughness: 0.4,
    side: THREE.DoubleSide,
  });
  
  const torsoMesh = new THREE.Mesh(torsoGeometry, fabricMaterial);
  group.add(torsoMesh);
  
  // === 2. COLLAR: Clean polo collar with volume ===
  const collar = createCollar(accentColor);
  group.add(collar);
  
  // === 3. SLEEVES: Proper short sleeves with thickness ===
  const leftSleeve = createSleeve(color, accentColor);
  leftSleeve.position.set(-0.65, 0.25, 0);
  leftSleeve.rotation.z = 0.15;
  group.add(leftSleeve);
  
  const rightSleeve = createSleeve(color, accentColor);
  rightSleeve.position.set(0.65, 0.25, 0);
  rightSleeve.rotation.z = -0.15;
  rightSleeve.scale.x = -1; // Mirror
  group.add(rightSleeve);
  
  // === 4. ACCENT DETAILS: Two-tone design panel ===
  const accentPanel = createAccentPanel(accentColor);
  group.add(accentPanel);
  
  // Center and scale appropriately
  group.scale.setScalar(1.2);
  group.position.y = -0.2;
  
  return group;
}

/**
 * Creates the main torso geometry with proper volume (extruded shape, not flat plane)
 */
function createTorsoGeometry() {
  // Define torso shape outline
  const torsoShape = new THREE.Shape();
  
  // Start from bottom center, draw half silhouette
  torsoShape.moveTo(0, -1.0);
  torsoShape.lineTo(0.5, -0.95);
  torsoShape.lineTo(0.65, -0.5);
  torsoShape.lineTo(0.65, 0);
  torsoShape.lineTo(0.6, 0.3);
  torsoShape.lineTo(0.45, 0.5);
  
  // Shoulder/neck area
  torsoShape.lineTo(0.25, 0.65);
  torsoShape.lineTo(0.15, 0.75);
  
  // Neck opening (V-neck)
  torsoShape.bezierCurveTo(
    0.08, 0.8,
    0.02, 0.82,
    0, 0.85
  );
  
  // Mirror to other side
  torsoShape.bezierCurveTo(
    -0.02, 0.82,
    -0.08, 0.8,
    -0.15, 0.75
  );
  torsoShape.lineTo(-0.25, 0.65);
  torsoShape.lineTo(-0.45, 0.5);
  torsoShape.lineTo(-0.6, 0.3);
  torsoShape.lineTo(-0.65, 0);
  torsoShape.lineTo(-0.65, -0.5);
  torsoShape.lineTo(-0.5, -0.95);
  torsoShape.lineTo(0, -1.0);
  
  // Extrude to give thickness (front to back depth)
  const extrudeSettings = {
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
    steps: 2,
    curveSegments: 24
  };
  
  const geometry = new THREE.ExtrudeGeometry(torsoShape, extrudeSettings);
  
  // Center the extrusion (shift it back so it's centered on Z-axis)
  geometry.translate(0, 0, -0.175);
  
  // Compute normals for smooth shading
  geometry.computeVertexNormals();
  
  return geometry;
}

/**
 * Creates a polo-style collar with thickness
 */
function createCollar(color) {
  const collarGroup = new THREE.Group();
  
  const collarMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.8,
    metalness: 0.0,
    sheen: 0.3,
    side: THREE.DoubleSide,
  });
  
  // Left collar flap
  const collarShape = new THREE.Shape();
  collarShape.moveTo(0, 0);
  collarShape.lineTo(0.15, 0.05);
  collarShape.lineTo(0.12, 0.15);
  collarShape.lineTo(0.02, 0.12);
  collarShape.lineTo(0, 0);
  
  const collarGeometry = new THREE.ExtrudeGeometry(collarShape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  
  const leftCollar = new THREE.Mesh(collarGeometry, collarMaterial);
  leftCollar.position.set(0.02, 0.7, 0.15);
  leftCollar.rotation.x = -0.3;
  collarGroup.add(leftCollar);
  
  // Right collar flap (mirrored)
  const rightCollar = leftCollar.clone();
  rightCollar.scale.x = -1;
  rightCollar.position.x = -0.02;
  collarGroup.add(rightCollar);
  
  return collarGroup;
}

/**
 * Creates a proper short sleeve with volume (tapered cylinder)
 */
function createSleeve(mainColor, trimColor) {
  const sleeveGroup = new THREE.Group();
  
  // Main sleeve body - tapered tube
  const sleeveGeometry = new THREE.CylinderGeometry(
    0.08,  // top radius
    0.11,  // bottom radius (slightly wider)
    0.25,  // height
    16,    // radial segments
    4,     // height segments
    false  // open ended
  );
  
  const sleeveMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(mainColor),
    roughness: 0.7,
    metalness: 0.0,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
  });
  
  const sleeveMesh = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
  sleeveMesh.rotation.z = Math.PI / 2; // Rotate to horizontal
  sleeveGroup.add(sleeveMesh);
  
  // Sleeve trim/cuff
  const cuffGeometry = new THREE.TorusGeometry(0.11, 0.015, 8, 16);
  const cuffMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(trimColor),
    roughness: 0.8,
  });
  
  const cuff = new THREE.Mesh(cuffGeometry, cuffMaterial);
  cuff.rotation.y = Math.PI / 2;
  cuff.position.x = -0.125;
  sleeveGroup.add(cuff);
  
  return sleeveGroup;
}

/**
 * Creates a diagonal accent panel for two-tone design
 */
function createAccentPanel(color) {
  const panelShape = new THREE.Shape();
  
  // Diagonal stripe across chest
  panelShape.moveTo(-0.3, 0.6);
  panelShape.lineTo(0.3, 0.4);
  panelShape.lineTo(0.35, 0.5);
  panelShape.lineTo(-0.25, 0.7);
  panelShape.lineTo(-0.3, 0.6);
  
  const panelGeometry = new THREE.ExtrudeGeometry(panelShape, {
    depth: 0.005,
    bevelEnabled: false
  });
  
  const panelMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.75,
    metalness: 0.0,
    sheen: 0.4,
  });
  
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.z = 0.18; // Slightly in front of torso
  
  return panel;
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
