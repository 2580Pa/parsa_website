import React, { useEffect, useState, useRef } from 'react';
import { bakeGarmentThumbnail } from './garmentThumbs';
import styles from './Atelier.module.css';

/**
 * Gallery grid component showing all garments
 */
export function Gallery({ garments, onAddToCart, onViewProduct }) {
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Generate all thumbnails
    async function generateThumbnails() {
      const thumbs = {};
      
      for (const garment of garments) {
        const thumb = await bakeGarmentThumbnail(garment);
        thumbs[garment.id] = thumb;
      }
      
      setThumbnails(thumbs);
      setLoading(false);
    }
    
    generateThumbnails();
  }, [garments]);
  
  // Track mouse position for hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleAddToCart = (garment, e) => {
    e.stopPropagation();
    onAddToCart(garment);
    
    // Visual feedback
    const button = e.target;
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  };
  
  if (loading) {
    return (
      <div className={styles.galleryLoading}>
        <div className={styles.spinner}></div>
        <p>Preparing garments...</p>
      </div>
    );
  }
  
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeader}>
        <h2>Collection</h2>
        <p>{garments.length} Items</p>
      </div>
      
      <div className={styles.galleryGrid}>
        {garments.map((garment) => (
          <div
            key={garment.id}
            className={styles.galleryItem}
            style={{ backgroundColor: garment.studioColor }}
            onMouseEnter={() => setHoveredId(garment.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onViewProduct(garment)}
          >
            <div className={styles.garmentThumb}>
              {thumbnails[garment.id] && (
                <img
                  src={thumbnails[garment.id]}
                  alt={garment.name}
                  className={hoveredId === garment.id ? styles.thumbHovered : ''}
                />
              )}
            </div>
            
            <div className={styles.garmentInfo}>
              <h3>{garment.name}</h3>
              <p className={styles.garmentType}>{garment.type}</p>
              <div className={styles.garmentFooter}>
                <span className={styles.price}>${garment.price}</span>
                <button
                  className={styles.addButton}
                  onClick={(e) => handleAddToCart(garment, e)}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
