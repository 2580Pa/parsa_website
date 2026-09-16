import * as THREE from 'three';

/**
 * Creates realistic 3D garment meshes with fabric-like materials
 * Focuses on soft appearance with proper lighting, texture, and geometry
 */

// Create a fabric-like material with subtle texture and proper lighting response
function createFabricMaterial(color, roughness = 0.8, normalStrength = 0.3) {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: roughness,
    metalness: 0.05,
    envMapIntensity: 0.4,
    side: THREE.DoubleSide
  });

  // Add subtle fabric normal map for texture
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Create fabric weave pattern
  const imageData = ctx.createImageData(512, 512);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const x = (i / 4) % 512;
    const y = Math.floor((i / 4) / 512);
    const noise = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 10;
    const weave = Math.sin(x * 0.2) * Math.sin(y * 0.2) * 5;
    const value = 128 + noise + weave;
    
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = 255;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  
  const normalTexture = new THREE.CanvasTexture(canvas);
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.repeat.set(4, 4);
  material.normalMap = normalTexture;
  material.normalScale = new THREE.Vector2(normalStrength, normalStrength);
  
  return material;
}

// Create polo shirt geometry with realistic draping
function createPoloGeometry() {
  const group = new THREE.Group();
  
  // Body - curved to show dimension
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.5, 0.8);
  bodyShape.quadraticCurveTo(-0.55, 0.4, -0.5, 0);
  bodyShape.quadraticCurveTo(-0.48, -0.6, -0.4, -0.8);
  bodyShape.lineTo(0.4, -0.8);
  bodyShape.quadraticCurveTo(0.48, -0.6, 0.5, 0);
  bodyShape.quadraticCurveTo(0.55, 0.4, 0.5, 0.8);
  bodyShape.lineTo(-0.5, 0.8);
  
  const extrudeSettings = {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 24
  };
  
  const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  bodyGeometry.center();
  
  return bodyGeometry;
}

// Create sweater geometry with more volume and knit texture
function createSweaterGeometry() {
  const group = new THREE.Group();
  
  // Sweater body - boxier shape with ribbing
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.6, 0.85);
  bodyShape.quadraticCurveTo(-0.65, 0.5, -0.62, 0);
  bodyShape.quadraticCurveTo(-0.6, -0.5, -0.5, -0.85);
  bodyShape.lineTo(0.5, -0.85);
  bodyShape.quadraticCurveTo(0.6, -0.5, 0.62, 0);
  bodyShape.quadraticCurveTo(0.65, 0.5, 0.6, 0.85);
  bodyShape.lineTo(-0.6, 0.85);
  
  const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4,
    curveSegments: 32
  };
  
  const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  bodyGeometry.center();
  
  return bodyGeometry;
}

// Create t-shirt geometry - simpler, closer fit
function createTeeGeometry() {
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.45, 0.75);
  bodyShape.quadraticCurveTo(-0.5, 0.4, -0.48, 0);
  bodyShape.quadraticCurveTo(-0.46, -0.5, -0.38, -0.75);
  bodyShape.lineTo(0.38, -0.75);
  bodyShape.quadraticCurveTo(0.46, -0.5, 0.48, 0);
  bodyShape.quadraticCurveTo(0.5, 0.4, 0.45, 0.75);
  bodyShape.lineTo(-0.45, 0.75);
  
  const extrudeSettings = {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 20
  };
  
  const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  bodyGeometry.center();
  
  return bodyGeometry;
}

// Add sleeves with proper rotation and draping
function addSleeves(group, garment, material) {
  const sleeveLength = garment.type === 'sweater' ? 0.7 : 
                       garment.type === 'polo' ? 0.35 : 0.25;
  const sleeveWidth = garment.type === 'sweater' ? 0.28 : 0.25;
  
  // Left sleeve
  const leftSleeveGeometry = new THREE.CylinderGeometry(0.12, 0.14, sleeveLength, 16, 4);
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material);
  leftSleeve.position.set(-0.45, 0.35, 0);
  leftSleeve.rotation.z = Math.PI / 2 + 0.3;
  leftSleeve.rotation.y = -0.2;
  group.add(leftSleeve);
  
  // Right sleeve
  const rightSleeveGeometry = new THREE.CylinderGeometry(0.12, 0.14, sleeveLength, 16, 4);
  const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material);
  rightSleeve.position.set(0.45, 0.35, 0);
  rightSleeve.rotation.z = -Math.PI / 2 - 0.3;
  rightSleeve.rotation.y = 0.2;
  group.add(rightSleeve);
}

// Add collar for polos
function addCollar(group, garment, material) {
  const collarGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.16);
  const collar = new THREE.Mesh(collarGeometry, material);
  collar.position.set(0, 0.8, 0.05);
  collar.rotation.x = 0.2;
  group.add(collar);
  
  // Collar tips
  const tipGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.02);
  const leftTip = new THREE.Mesh(tipGeometry, material);
  leftTip.position.set(-0.12, 0.8, 0.12);
  leftTip.rotation.x = 0.3;
  leftTip.rotation.z = -0.2;
  group.add(leftTip);
  
  const rightTip = leftTip.clone();
  rightTip.position.set(0.12, 0.8, 0.12);
  rightTip.rotation.z = 0.2;
  group.add(rightTip);
}

// Add pattern/design overlay
function addPatternOverlay(group, garment) {
  if (!garment.pattern || garment.pattern === 'solid') return;
  
  const overlayMaterial = createFabricMaterial(
    garment.colors.secondary,
    0.85,
    0.2
  );
  overlayMaterial.transparent = true;
  overlayMaterial.opacity = 0.9;
  
  // Create pattern geometry based on type
  if (garment.pattern.includes('stripe') || garment.pattern.includes('diagonal')) {
    // Diagonal stripe pattern
    for (let i = 0; i < 5; i++) {
      const stripeGeometry = new THREE.PlaneGeometry(0.08, 1.2);
      const stripe = new THREE.Mesh(stripeGeometry, overlayMaterial);
      stripe.position.set(-0.3 + i * 0.15, 0, 0.08);
      stripe.rotation.z = garment.pattern.includes('diagonal') ? 0.5 : 0;
      group.add(stripe);
    }
  } else if (garment.pattern.includes('checkered')) {
    // Checkered pattern
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) % 2 === 0) {
          const checkGeometry = new THREE.PlaneGeometry(0.2, 0.2);
          const check = new THREE.Mesh(checkGeometry, overlayMaterial);
          check.position.set(-0.2 + i * 0.2, -0.3 + j * 0.3, 0.08);
          group.add(check);
        }
      }
    }
  } else if (garment.pattern.includes('vertical')) {
    // Vertical blocks
    const blockGeometry = new THREE.PlaneGeometry(0.25, 0.9);
    const leftBlock = new THREE.Mesh(blockGeometry, overlayMaterial);
    leftBlock.position.set(-0.2, 0, 0.08);
    group.add(leftBlock);
  }
}

/**
 * Main factory function to create a garment mesh
 */
export function createGarmentMesh(garment) {
  const group = new THREE.Group();
  
  // Create primary material
  const primaryMaterial = createFabricMaterial(
    garment.colors.primary,
    garment.type === 'sweater' ? 0.9 : 0.8,
    garment.type === 'sweater' ? 0.5 : 0.3
  );
  
  // Create body geometry based on type
  let bodyGeometry;
  if (garment.type === 'polo') {
    bodyGeometry = createPoloGeometry();
  } else if (garment.type === 'sweater') {
    bodyGeometry = createSweaterGeometry();
  } else {
    bodyGeometry = createTeeGeometry();
  }
  
  const body = new THREE.Mesh(bodyGeometry, primaryMaterial);
  group.add(body);
  
  // Add sleeves
  addSleeves(group, garment, primaryMaterial);
  
  // Add collar for polos
  if (garment.type === 'polo') {
    const collarMaterial = createFabricMaterial(garment.colors.accent, 0.75, 0.25);
    addCollar(group, garment, collarMaterial);
  }
  
  // Add pattern overlay
  addPatternOverlay(group, garment);
  
  // Position and scale for nice 3/4 view
  group.rotation.x = 0.15;
  group.rotation.y = 0.25;
  group.scale.setScalar(1.2);
  
  return group;
}

/**
 * Create environment for proper fabric lighting
 */
export function createGarmentEnvironment(scene, studioColor) {
  // Soft ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  // Key light - soft, from above and front
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(2, 3, 3);
  scene.add(keyLight);
  
  // Fill light - softer, from side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-2, 1, 2);
  scene.add(fillLight);
  
  // Rim light - subtle highlight on edges
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
  rimLight.position.set(0, 1, -2);
  scene.add(rimLight);
  
  // Studio background
  if (studioColor) {
    scene.background = new THREE.Color(studioColor);
  }
}

/**
 * Animate garment with subtle floating motion
 */
export function animateGarment(garment, time) {
  garment.rotation.y += 0.003;
  garment.position.y = Math.sin(time * 0.001) * 0.05;
  
  // Subtle breathing effect
  const breathe = 1 + Math.sin(time * 0.002) * 0.02;
  garment.scale.setScalar(1.2 * breathe);
}
