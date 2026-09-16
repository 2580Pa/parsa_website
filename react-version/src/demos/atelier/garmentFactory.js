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
 * Creates a t-shirt using basic boxes for clear shirt silhouette
 */
function createTShirt(bodyMaterial, trimMaterial) {
  const group = new THREE.Group();
  
  // Main torso - rectangular, shirt-like proportions
  const torsoGeometry = new THREE.BoxGeometry(1.2, 1.4, 0.3);
  const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
  torso.position.y = -0.1;
  group.add(torso);
  
  // Left sleeve - clearly extending from shoulder
  const sleeveGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.25);
  const leftSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
  leftSleeve.position.set(-0.8, 0.4, 0);
  group.add(leftSleeve);
  
  // Right sleeve
  const rightSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
  rightSleeve.position.set(0.8, 0.4, 0);
  group.add(rightSleeve);
  
  // Neck opening
  const neckGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.32);
  const neck = new THREE.Mesh(neckGeometry, trimMaterial);
  neck.position.y = 0.65;
  group.add(neck);
  
  // Chest stripe
  const stripeGeometry = new THREE.BoxGeometry(1.15, 0.08, 0.31);
  const stripe = new THREE.Mesh(stripeGeometry, trimMaterial);
  stripe.position.set(0, 0.2, 0);
  group.add(stripe);
  
  return group;
}

// Simple box-based t-shirt construction removed - all logic moved to createTShirt()

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
