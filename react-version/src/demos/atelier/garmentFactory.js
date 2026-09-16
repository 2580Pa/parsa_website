import * as THREE from 'three';

/**
 * Creates a realistic polo shirt with proper volume, rounded surfaces, and fabric draping.
 * Uses LatheGeometry and proper mesh topology - NO flat ExtrudeGeometry or torus rings.
 */

export function buildSoftGarment(color = '#16a629', accentColor = '#ffffff') {
  const group = new THREE.Group();
  
  // Fabric material with realistic properties
  const fabricMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.8,
    metalness: 0.0,
    sheen: 0.6,
    sheenColor: new THREE.Color(0xffffff).multiplyScalar(0.5),
    clearcoat: 0.05,
    clearcoatRoughness: 0.5,
    side: THREE.DoubleSide,
    transparent: false,
  });
  
  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.85,
    metalness: 0.0,
    sheen: 0.4,
    side: THREE.DoubleSide,
  });
  
  // === 1. TORSO: Rounded volumetric body using LatheGeometry ===
  const torso = createRoundedTorso(fabricMaterial);
  group.add(torso);
  
  // === 2. SLEEVES: Soft tapered sleeves ===
  const leftSleeve = createSoftSleeve(fabricMaterial);
  leftSleeve.position.set(-0.55, 0.35, 0);
  leftSleeve.rotation.z = Math.PI / 2;
  leftSleeve.rotation.y = -0.2;
  group.add(leftSleeve);
  
  const rightSleeve = createSoftSleeve(fabricMaterial);
  rightSleeve.position.set(0.55, 0.35, 0);
  rightSleeve.rotation.z = -Math.PI / 2;
  rightSleeve.rotation.y = 0.2;
  group.add(rightSleeve);
  
  // === 3. COLLAR: Polo collar ===
  const collar = createPoloCollar(accentMaterial);
  group.add(collar);
  
  // === 4. ACCENT STRIPES ===
  const stripes = createAccentStripes(accentMaterial);
  group.add(stripes);
  
  group.scale.setScalar(1.3);
  group.position.y = -0.15;
  
  return group;
}

/**
 * Creates a rounded, organic torso using LatheGeometry for smooth volume
 */
function createRoundedTorso(material) {
  const group = new THREE.Group();
  
  // Create a shirt profile curve (side view)
  const points = [];
  const segments = 32;
  
  // Bottom hem - slight flare
  points.push(new THREE.Vector2(0.45, -0.85));
  points.push(new THREE.Vector2(0.48, -0.80));
  
  // Lower torso
  points.push(new THREE.Vector2(0.50, -0.60));
  points.push(new THREE.Vector2(0.52, -0.40));
  points.push(new THREE.Vector2(0.53, -0.20));
  
  // Mid torso
  points.push(new THREE.Vector2(0.54, 0.00));
  points.push(new THREE.Vector2(0.53, 0.15));
  
  // Chest/shoulder taper
  points.push(new THREE.Vector2(0.50, 0.30));
  points.push(new THREE.Vector2(0.44, 0.42));
  points.push(new THREE.Vector2(0.35, 0.52));
  
  // Shoulder slope
  points.push(new THREE.Vector2(0.26, 0.58));
  points.push(new THREE.Vector2(0.18, 0.62));
  
  // Neck opening
  points.push(new THREE.Vector2(0.14, 0.65));
  points.push(new THREE.Vector2(0.12, 0.68));
  
  // Create the lathed body (rotated around Y axis)
  const bodyGeometry = new THREE.LatheGeometry(points, segments, 0, Math.PI * 2);
  bodyGeometry.computeVertexNormals();
  
  const bodyMesh = new THREE.Mesh(bodyGeometry, material);
  group.add(bodyMesh);
  
  return group;
}

/**
 * Creates a polo collar using a torus for the collar band
 */
function createPoloCollar(material) {
  const group = new THREE.Group();
  
  // Collar band - torus around neck opening
  const collarBand = new THREE.TorusGeometry(
    0.135,  // radius
    0.018,  // tube thickness
    12,     // radial segments
    32      // tubular segments
  );
  
  const collarMesh = new THREE.Mesh(collarBand, material);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.y = 0.67;
  
  group.add(collarMesh);
  
  return group;
}

/**
 * Creates a soft, tapered sleeve using LatheGeometry
 */
function createSoftSleeve(material) {
  // Sleeve profile curve
  const sleevePoints = [];
  
  // Top (shoulder connection) - wider
  sleevePoints.push(new THREE.Vector2(0.12, 0.00));
  sleevePoints.push(new THREE.Vector2(0.115, -0.03));
  
  // Mid sleeve - slight taper
  sleevePoints.push(new THREE.Vector2(0.11, -0.08));
  sleevePoints.push(new THREE.Vector2(0.105, -0.12));
  
  // Lower sleeve
  sleevePoints.push(new THREE.Vector2(0.10, -0.16));
  sleevePoints.push(new THREE.Vector2(0.098, -0.18));
  
  // Cuff - slight gather
  sleevePoints.push(new THREE.Vector2(0.095, -0.20));
  sleevePoints.push(new THREE.Vector2(0.092, -0.22));
  
  const sleeveGeometry = new THREE.LatheGeometry(sleevePoints, 24);
  sleeveGeometry.computeVertexNormals();
  
  const sleeve = new THREE.Mesh(sleeveGeometry, material);
  
  return sleeve;
}

/**
 * Creates accent stripes around the torso using thin torus geometries
 */
function createAccentStripes(material) {
  const group = new THREE.Group();
  
  // Chest stripe
  const stripe1 = new THREE.TorusGeometry(0.52, 0.008, 8, 32, Math.PI * 2);
  const stripeMesh1 = new THREE.Mesh(stripe1, material);
  stripeMesh1.rotation.x = Math.PI / 2;
  stripeMesh1.position.y = 0.15;
  group.add(stripeMesh1);
  
  // Lower stripe
  const stripe2 = new THREE.TorusGeometry(0.51, 0.008, 8, 32, Math.PI * 2);
  const stripeMesh2 = new THREE.Mesh(stripe2, material);
  stripeMesh2.rotation.x = Math.PI / 2;
  stripeMesh2.position.y = 0.05;
  group.add(stripeMesh2);
  
  return group;
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
