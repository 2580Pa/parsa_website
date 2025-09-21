import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AutoScroll = ({ children, sections }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionIndex) => {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    const targetSection = sections[sectionIndex];
    if (targetSection?.current) {
      targetSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  // Mouse wheel navigation
  useEffect(() => {
    let wheelTimeout;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          scrollToSection(currentSection + 1);
        } else {
          scrollToSection(currentSection - 1);
        }
      }, 50);
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [currentSection, isScrolling]);

  // Touch navigation
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (isScrolling) return;
      
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          scrollToSection(currentSection + 1);
        } else {
          scrollToSection(currentSection - 1);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isScrolling]);

  return (
    <div ref={containerRef} className="auto-scroll-container">
      {/* Section Navigator */}
      <motion.div 
        className="section-navigator"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="nav-dots">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`nav-dot ${currentSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: currentSection === index ? 1.1 : 1,
                backgroundColor: currentSection === index 
                  ? 'rgba(139, 92, 246, 1)' 
                  : 'rgba(139, 92, 246, 0.1)'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="dot-number">{index}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-arrow-down"></div>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="scroll-progress"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: ((currentSection + 1) / sections.length) * 100 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="progress-bar"></div>
      </motion.div>

      {/* Content with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AutoScroll;
