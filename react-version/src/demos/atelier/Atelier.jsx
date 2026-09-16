import React, { useState, useEffect } from 'react';
import HeroScene from './HeroScene';
import { generateGarmentThumbnails } from './garmentThumbs';
import './Atelier.css';

/**
 * Atelier - Premium 3D garment showcase demo
 * Brand: Atelier (not Lacoste - no crocodile, no Lacoste trademarks)
 * Accent: #16a629 green
 */
export default function Atelier() {
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa');
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  useEffect(() => {
    // Generate gallery thumbnails on mount
    const thumbs = generateGarmentThumbnails(8);
    setThumbnails(thumbs);
  }, []);
  
  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  
  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    setSelectedProduct(null);
  };
  
  const handleRemoveFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="atelier-container" style={{
      background: `linear-gradient(135deg, ${backgroundColor}22, ${backgroundColor}44)`,
      transition: 'background 1.5s ease',
    }}>
      {/* HEADER */}
      <header className="atelier-header">
        <div className="header-content">
          <h1 className="brand-name">
            ATELIER
            <span className="brand-dot" style={{ color: '#16a629' }}>.</span>
          </h1>
          <nav className="nav-menu">
            <button className="nav-link">Collections</button>
            <button className="nav-link">About</button>
            <button
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              Cart ({cart.length})
            </button>
          </nav>
        </div>
      </header>
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
              Crafted for
              <br />
              <span style={{ color: '#16a629' }}>Excellence</span>
            </h2>
            <p className="hero-subtitle">
              Premium garments designed with precision.
              Experience the future of fashion in 3D.
            </p>
            <button className="cta-button">
              Explore Collection
            </button>
          </div>
          
          <div className="hero-canvas">
            <HeroScene onColorChange={handleColorChange} />
          </div>
        </div>
      </section>
      
      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <div className="gallery-header">
          <h2 className="section-title">Featured Collection</h2>
          <div className="gallery-filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Most Popular</button>
            <button className="filter-button">New Arrivals</button>
          </div>
        </div>
        
        <div className="gallery-grid">
          {thumbnails.map((thumb, index) => (
            <div
              key={thumb.id}
              className="gallery-item"
              onClick={() => handleProductClick(thumb)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={thumb.imageUrl}
                  alt={thumb.name}
                  className="thumbnail-image"
                />
                <div className="thumbnail-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>
              <div className="item-info">
                <h3 className="item-name">{thumb.name}</h3>
                <div className="item-meta">
                  <span className="item-price">${thumb.price}</span>
                  <span className="item-likes">♥ {thumb.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="create-your-own">
          <button className="create-button">
            <span>CREATE YOURS +</span>
          </button>
        </div>
      </section>
      
      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-details">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-price">${selectedProduct.price}</p>
                
                <div className="modal-description">
                  <p>
                    Premium crafted polo featuring soft, breathable fabric with
                    a modern two-tone design. Perfect for any occasion.
                  </p>
                </div>
                
                <div className="size-selector">
                  <label>Size:</label>
                  <div className="size-options">
                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="size-button">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(selectedProduct)}
                  style={{ backgroundColor: '#16a629' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CART SIDEBAR */}
      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button onClick={() => setShowCart(false)}>×</button>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.cartId} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(item.cartId)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              <button className="checkout-button" style={{ backgroundColor: '#16a629' }}>
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* FOOTER */}
      <footer className="atelier-footer">
        <p>© 2026 Atelier. Crafted with passion.</p>
      </footer>
    </div>
  );
}
