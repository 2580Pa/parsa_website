import React, { useState, useEffect } from 'react';
import { HeroScene } from './HeroScene';
import { Gallery } from './Gallery';
import { ProductPage } from './ProductPage';
import { garments } from './data';
import styles from './Atelier.module.css';

/**
 * Main Atelier application component
 * Shop-style SPA for clothing with 3D garment visualization
 */
export default function Atelier() {
  const [currentView, setCurrentView] = useState('home');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Swap featured garment for hero
  const swapFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % garments.length);
  };
  
  // Add item to cart
  const addToCart = (garment) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === garment.id);
      if (existing) {
        return prev.map(item =>
          item.id === garment.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...garment, quantity: 1 }];
    });
    
    // Show cart briefly
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 2000);
  };
  
  // Remove from cart
  const removeFromCart = (garmentId) => {
    setCart(prev => prev.filter(item => item.id !== garmentId));
  };
  
  // Update quantity
  const updateQuantity = (garmentId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === garmentId) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };
  
  // View product details
  const viewProduct = (garment) => {
    setSelectedProduct(garment);
    setCurrentView('product');
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className={styles.atelier}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo} onClick={() => setCurrentView('home')}>
            ATELIER
          </h1>
          
          <nav className={styles.nav}>
            <button
              className={currentView === 'home' ? styles.navActive : ''}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button
              className={currentView === 'gallery' ? styles.navActive : ''}
              onClick={() => setCurrentView('gallery')}
            >
              Gallery
            </button>
          </nav>
          
          <button
            className={styles.cartButton}
            onClick={() => setCartOpen(!cartOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 2L7 6H21L19 2H9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 6L5 21H19L17 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="21" r="1" fill="currentColor"/>
              <circle cx="15" cy="21" r="1" fill="currentColor"/>
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
      </header>
      
      {/* Cart Sidebar */}
      <div className={`${styles.cartSidebar} ${cartOpen ? styles.cartOpen : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Your Bag</h2>
          <button
            className={styles.cartClose}
            onClick={() => setCartOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Your bag is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemInfo}>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className={styles.cartItemControls}>
                  <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button
                  className={styles.removeItem}
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
            <button className={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <main className={styles.main}>
        {currentView === 'home' && (
          <div className={styles.home}>
            <HeroScene
              garment={garments[featuredIndex]}
              onSwap={swapFeatured}
            />
            <div className={styles.homeFooter}>
              <button
                className={styles.viewGalleryButton}
                onClick={() => setCurrentView('gallery')}
              >
                View Collection
              </button>
            </div>
          </div>
        )}
        
        {currentView === 'gallery' && (
          <Gallery
            garments={garments}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
          />
        )}
        
        {currentView === 'product' && selectedProduct && (
          <ProductPage
            garment={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentView('gallery')}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Atelier • Crafted with care</p>
      </footer>
    </div>
  );
}
