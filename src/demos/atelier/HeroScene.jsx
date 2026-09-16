import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGarmentMesh, createGarmentEnvironment, animateGarment } from './garmentFactory';
import styles from './Atelier.module.css';

/**
 * Hero scene component - displays featured garment with animation
 */
export function HeroScene({ garment, onSwap }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const garmentRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const swapTimerRef = useRef(null);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      35,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.5);
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Setup lighting and environment
    createGarmentEnvironment(scene, garment.studioColor);
    
    // Create initial garment
    const garmentMesh = createGarmentMesh(garment);
    garmentRef.current = garmentMesh;
    scene.add(garmentMesh);
    
    // Animation loop
    let time = 0;
    function animate() {
      animationRef.current = requestAnimationFrame(animate);
      time += 16;
      
      if (garmentRef.current) {
        animateGarment(garmentRef.current, time);
      }
      
      renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    
    // Auto-swap timer
    swapTimerRef.current = setInterval(() => {
      if (onSwap) onSwap();
    }, 3500);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (swapTimerRef.current) {
        clearInterval(swapTimerRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
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
    };
  }, []);
  
  // Handle garment changes with transition
  useEffect(() => {
    if (!garment || !sceneRef.current || !garmentRef.current) return;
    
    setIsTransitioning(true);
    
    // Animate out current garment
    const currentGarment = garmentRef.current;
    const fadeOut = setInterval(() => {
      currentGarment.scale.multiplyScalar(0.95);
      currentGarment.rotation.y += 0.1;
      if (currentGarment.scale.x < 0.1) {
        clearInterval(fadeOut);
        
        // Remove old garment
        sceneRef.current.remove(currentGarment);
        currentGarment.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(mat => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
        
        // Update background color
        sceneRef.current.background = new THREE.Color(garment.studioColor);
        
        // Create new garment
        const newGarment = createGarmentMesh(garment);
        newGarment.scale.setScalar(0.1);
        garmentRef.current = newGarment;
        sceneRef.current.add(newGarment);
        
        // Animate in new garment
        const fadeIn = setInterval(() => {
          newGarment.scale.multiplyScalar(1.15);
          if (newGarment.scale.x >= 1.2) {
            newGarment.scale.setScalar(1.2);
            clearInterval(fadeIn);
            setIsTransitioning(false);
          }
        }, 16);
      }
    }, 16);
  }, [garment]);
  
  return (
    <div className={styles.heroScene}>
      <div ref={mountRef} className={styles.heroCanvas} />
      <div className={styles.heroInfo}>
        <h1 className={styles.garmentName}>{garment.name}</h1>
        <p className={styles.garmentPrice}>${garment.price}</p>
        <button className={styles.heroButton}>
          Shop Now
        </button>
      </div>
    </div>
  );
}
