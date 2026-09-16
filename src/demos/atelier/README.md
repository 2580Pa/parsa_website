# Atelier - Premium Clothing Demo

A sophisticated e-commerce demonstration featuring realistic 3D garment visualization powered by Three.js.

## Features

### Visual Quality
- **Realistic Fabric Materials**: Garments use PBR materials with proper roughness, metalness, and normal maps to simulate fabric texture
- **Soft Lighting**: Multi-light studio setup with ambient, key, fill, and rim lights for professional appearance
- **Pastel Backgrounds**: Each garment has a complementary pastel studio color that makes the clothing pop
- **High-Quality Renders**: Garments fill 70-80% of their tiles with proper proportions

### 3D Garment Types
- **Polo Shirts**: Extruded geometry with collars, sleeves, and pattern overlays
- **Sweaters**: Volumetric knit appearance with thicker geometry and softer materials  
- **T-Shirts**: Clean, fitted silhouettes with subtle fabric texture

### Interaction
- **Hero Scene**: Auto-rotating featured garment with smooth transitions every 3.5 seconds
- **Gallery Grid**: Mosaic of all garments with hover effects and pastel tile backgrounds
- **Product Pages**: Mouse-interactive 3D viewer that rotates with cursor movement
- **Shopping Cart**: Full cart functionality with quantity controls and totals

### Technical Highlights
- Three.js WebGL rendering with proper tone mapping (ACESFilmic)
- Offscreen thumbnail baking for gallery performance
- Fabric normal maps generated procedurally for weave texture
- ExtrudeGeometry with bevels for realistic garment volume
- DoubleSide materials to show garment depth
- Responsive design with mobile support

## File Structure

```
src/demos/atelier/
├── Atelier.jsx          # Main app component with routing and cart
├── HeroScene.jsx        # Animated hero with featured garment
├── Gallery.jsx          # Grid view of all garments
├── ProductPage.jsx      # Individual product detail view
├── garmentFactory.js    # 3D mesh creation with realistic materials
├── garmentThumbs.js     # Thumbnail generation from 3D renders
├── data.js              # Garment product catalog
├── Atelier.module.css   # All styles
└── main.jsx            # React entry point
```

## Design Philosophy

Inspired by Lacoste Members Experience, this demo focuses on:

1. **Soft, Realistic Appearance**: No flat planes or box geometry - everything has volume and proper bevels
2. **Bright, Inviting Colors**: Lifted color palette to avoid dark voids
3. **Studio Quality**: Professional lighting setup for each garment
4. **Tactile Materials**: Fabric-like roughness and subtle texture variation
5. **Generous Sizing**: Garments are large and prominent in their frames

## Color Palette

- **Accent Green**: `#16a629` (used sparingly for CTAs)
- **Backgrounds**: Pastel variants matched to each garment
- **Garments**: Carefully curated colors with lifted shadows for visibility

## Performance

- Thumbnails are baked once and cached with version keys
- Gallery uses static images for fast scrolling
- Hero scene uses RAF-based animation for smooth 60fps
- Proper disposal of Three.js resources on unmount

## Browser Support

- Modern browsers with WebGL support
- Tested on Chrome, Firefox, Safari
- Responsive down to 320px mobile screens
