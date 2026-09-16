import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { buildSoftGarment, getGarmentDominantColor } from './garmentFactory';

/**
 * Hero scene with floating 3D garment, mouse follow, drag interaction,
 * and background color crossfade based on dominant garment color.
 */
export default function HeroScene({ onColorChange, currentGarment }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const garmentRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // === SCENE SETUP ===
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // === LIGHTING ===
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
    
    // === GARMENT ===
    const garment = buildSoftGarment('#16a629', '#ffffff');
    garmentRef.current = garment;
    scene.add(garment);
    
    // Initial gentle rotation
    garment.rotation.y = 0.2;
    garment.rotation.x = 0.1;
    
    // Notify parent of dominant color for background
    const dominantColor = getGarmentDominantColor(garment);
    if (onColorChange) {
      onColorChange(dominantColor.getStyle());
    }
    
    // === ANIMATION LOOP ===
    let time = 0;
    
    function animate() {
      requestAnimationFrame(animate);
      time += 0.016;
      
      if (garmentRef.current) {
        // Gentle floating motion
        garmentRef.current.position.y = Math.sin(time * 0.8) * 0.1;
        
        // Subtle breathing scale
        const breathe = 1 + Math.sin(time * 1.2) * 0.02;
        garmentRef.current.scale.setScalar(1.2 * breathe);
        
        // Mouse follow with spring physics
        if (!isDraggingRef.current) {
          targetRotationRef.current.y = mouseRef.current.x * 0.5;
          targetRotationRef.current.x = -mouseRef.current.y * 0.3;
        }
        
        // Smooth interpolation to target rotation
        garmentRef.current.rotation.y += (targetRotationRef.current.y - garmentRef.current.rotation.y) * 0.05;
        garmentRef.current.rotation.x += (targetRotationRef.current.x - garmentRef.current.rotation.x) * 0.05;
        
        // Continuous slow spin when not interacting
        if (!isDraggingRef.current && Math.abs(mouseRef.current.x) < 0.1) {
          garmentRef.current.rotation.y += 0.005;
        }
      }
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // === MOUSE INTERACTION ===
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    
    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    
    const canvas = renderer.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    // === TOUCH INTERACTION ===
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = mountRef.current.getBoundingClientRect();
        mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };
    
    const handleTouchStart = () => {
      isDraggingRef.current = true;
    };
    
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
    
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    // === RESIZE HANDLER ===
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // === CLEANUP ===
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [currentGarment]);
  
  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
    />
  );
}
