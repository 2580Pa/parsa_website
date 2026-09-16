import * as THREE from 'three';
import { buildSoftGarment, generateColorPalette } from './garmentFactory';

/**
 * Generates gallery thumbnails via RTT (Render-To-Texture)
 * Each thumbnail is baked from the same garment factory
 */

let thumbnailCache = null;
let cacheVersion = 3; // Bump this to invalidate old cardboard thumbnails

export function generateGarmentThumbnails(count = 8) {
  const cacheKey = `atelier_thumbs_v${cacheVersion}_${count}`;
  
  // Check cache
  if (thumbnailCache && thumbnailCache.key === cacheKey) {
    return thumbnailCache.data;
  }
  
  const thumbnails = [];
  
  // Setup offscreen rendering
  const width = 400;
  const height = 400;
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8f9fa);
  
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 4;
  
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  
  // Lighting setup (same quality as hero)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(2, 3, 3);
  scene.add(keyLight);
  
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-2, 1, 2);
  scene.add(fillLight);
  
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
  rimLight.position.set(0, -1, -2);
  scene.add(rimLight);
  
  // Generate thumbnails with different colors and angles
  for (let i = 0; i < count; i++) {
    const palette = generateColorPalette();
    const garment = buildSoftGarment(palette.main, palette.accent);
    
    // Vary rotation for each thumbnail
    garment.rotation.y = (i * Math.PI * 2) / count + Math.PI / 4;
    garment.rotation.x = 0.1 + (i % 3) * 0.05;
    
    scene.add(garment);
    
    // Render to get image data
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');
    
    thumbnails.push({
      id: `garment-${i}`,
      imageUrl: dataURL,
      name: `Atelier Polo ${i + 1}`,
      price: 89 + (i * 10),
      colors: palette,
      likes: Math.floor(Math.random() * 400) + 100,
    });
    
    // Remove garment before next iteration
    scene.remove(garment);
    
    // Dispose geometry and materials
    garment.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
  
  // Cleanup
  renderer.dispose();
  
  // Cache results
  thumbnailCache = {
    key: cacheKey,
    data: thumbnails,
  };
  
  return thumbnails;
}

/**
 * Clear thumbnail cache (useful when garment factory changes)
 */
export function clearThumbnailCache() {
  thumbnailCache = null;
  cacheVersion++;
}
