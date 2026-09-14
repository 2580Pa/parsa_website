// Three.js Hero Background Scene
(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('Three.js scene disabled: user prefers reduced motion');
        return;
    }

    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const canvas = document.getElementById('hero-canvas');
    const heroSection = document.getElementById('home');
    
    if (!canvas || !heroSection) {
        console.warn('Hero canvas or section not found');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: window.innerWidth > 768 // Disable antialiasing on mobile for performance
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

    // Create particle system
    const particleCount = window.innerWidth < 768 ? 50 : 100; // Fewer particles on mobile
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 100;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 100;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;

        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle material with purple gradient
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: window.innerWidth < 768 ? 0.8 : 1.2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add subtle geometric shapes
    const geometryCount = window.innerWidth < 768 ? 3 : 5;
    const geometries = [];

    for (let i = 0; i < geometryCount; i++) {
        const geometry = new THREE.OctahedronGeometry(2, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
        );
        
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        geometries.push({
            mesh: mesh,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.005
            }
        });

        scene.add(mesh);
    }

    // Intersection Observer to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });

    observer.observe(heroSection);

    // Animation loop
    let animationFrameId;

    function animate() {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        // Animate particles
        const positions = particles.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            positions[i3] += particleVelocities[i].x;
            positions[i3 + 1] += particleVelocities[i].y;
            positions[i3 + 2] += particleVelocities[i].z;

            // Boundary check and wrap around
            if (Math.abs(positions[i3]) > 50) particleVelocities[i].x *= -1;
            if (Math.abs(positions[i3 + 1]) > 50) particleVelocities[i].y *= -1;
            if (Math.abs(positions[i3 + 2]) > 25) particleVelocities[i].z *= -1;
        }
        particles.attributes.position.needsUpdate = true;

        // Rotate geometries
        geometries.forEach(({ mesh, rotationSpeed }) => {
            mesh.rotation.x += rotationSpeed.x;
            mesh.rotation.y += rotationSpeed.y;
            mesh.rotation.z += rotationSpeed.z;
        });

        // Gentle camera movement
        camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
        camera.position.y = Math.cos(Date.now() * 0.00015) * 2;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        observer.disconnect();
        window.removeEventListener('resize', onWindowResize);
        
        // Dispose Three.js resources
        particles.dispose();
        particleMaterial.dispose();
        geometries.forEach(({ mesh }) => {
            mesh.geometry.dispose();
            mesh.material.dispose();
        });
        renderer.dispose();
    });

    // Mouse interaction - subtle parallax effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        if (window.innerWidth > 768) { // Only on desktop
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
        }
    });

})();
