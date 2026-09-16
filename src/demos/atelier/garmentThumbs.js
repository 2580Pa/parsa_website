import * as THREE from 'three';
import { createGarmentMesh, createGarmentEnvironment } from './garmentFactory';

/**
 * Generate thumbnail images for garments
 * Uses offscreen rendering to bake 3D garments into 2D images
 */

const THUMB_SIZE = 800;
const CACHE_VERSION = 'v2'; // Bump to invalidate old thumbnails

// Cache for generated thumbnails
const thumbnailCache = new Map();

/**
 * Bake a garment into a thumbnail image
 */
export async function bakeGarmentThumbnail(garment) {
  const cacheKey = `${garment.id}-${CACHE_VERSION}`;
  
  // Check cache first
  if (thumbnailCache.has(cacheKey)) {
    return thumbnailCache.get(cacheKey);
  }
  
  // Create offscreen scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 4);
  camera.lookAt(0, 0, 0);
  
  // Setup lighting and background
  createGarmentEnvironment(scene, garment.studioColor);
  
  // Create garment mesh
  const garmentMesh = createGarmentMesh(garment);
  scene.add(garmentMesh);
  
  // Create offscreen renderer
  const canvas = document.createElement('canvas');
  canvas.width = THUMB_SIZE;
  canvas.height = THUMB_SIZE;
  
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true
  });
  renderer.setSize(THUMB_SIZE, THUMB_SIZE);
  renderer.setPixelRatio(2);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  
  // Render
  renderer.render(scene, camera);
  
  // Convert to data URL
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  
  // Cleanup
  renderer.dispose();
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(mat => mat.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });
  
  // Cache result
  thumbnailCache.set(cacheKey, dataUrl);
  
  return dataUrl;
}

/**
 * Preload all garment thumbnails
 */
export async function preloadGarmentThumbnails(garments, onProgress) {
  const total = garments.length;
  let loaded = 0;
  
  for (const garment of garments) {
    await bakeGarmentThumbnail(garment);
    loaded++;
    if (onProgress) {
      onProgress(loaded / total);
    }
  }
}

/**
 * Clear thumbnail cache
 */
export function clearThumbnailCache() {
  thumbnailCache.clear();
}
