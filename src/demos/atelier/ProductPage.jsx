import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createGarmentMesh, createGarmentEnvironment, animateGarment } from './garmentFactory';
import styles from './Atelier.module.css';

/**
 * Individual product page with detailed 3D view
 */
export function ProductPage({ garment, onAddToCart, onBack }) {
  const mountRef = useRef(null);
  const [quantity, setQuantity] = React.useState(1);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      35,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4);
    
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
    
    // Setup environment
    createGarmentEnvironment(scene, garment.studioColor);
    
    // Create garment
    const garmentMesh = createGarmentMesh(garment);
    scene.add(garmentMesh);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    const handleMouseMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
    };
    
    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    // Animation loop
    let time = 0;
    let animationId;
    
    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 16;
      
      // Smooth camera rotation following mouse
      garmentMesh.rotation.y += (targetRotationY - garmentMesh.rotation.y) * 0.05;
      garmentMesh.rotation.x += (targetRotationX - garmentMesh.rotation.x) * 0.05;
      
      // Subtle floating
      garmentMesh.position.y = Math.sin(time * 0.001) * 0.05;
      
      renderer.render(scene, camera);
    }
    animate();
    
    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
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
  }, [garment]);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(garment);
    }
  };
  
  return (
    <div className={styles.productPage}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back to Gallery
      </button>
      
      <div className={styles.productContent}>
        <div className={styles.productViewer}>
          <div ref={mountRef} className={styles.productCanvas} />
          <p className={styles.viewerHint}>Move your mouse to rotate</p>
        </div>
        
        <div className={styles.productDetails}>
          <h1>{garment.name}</h1>
          <p className={styles.productPrice}>${garment.price}</p>
          
          <div className={styles.productDescription}>
            <h3>Description</h3>
            <p>
              Premium {garment.type} crafted with attention to detail.
              Features a {garment.pattern} pattern and is made from
              high-quality materials for comfort and durability.
            </p>
          </div>
          
          <div className={styles.productColors}>
            <h3>Colors</h3>
            <div className={styles.colorSwatches}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: garment.colors.primary }}
                title="Primary"
              />
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: garment.colors.secondary }}
                title="Secondary"
              />
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: garment.colors.accent }}
                title="Accent"
              />
            </div>
          </div>
          
          <div className={styles.productQuantity}>
            <label>Quantity</label>
            <div className={styles.quantityControls}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>
          
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            Add to Bag • ${garment.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
}
