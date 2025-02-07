import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';
import { useTheme } from './ThemeContext/ThemeContext';

// 2D Stars Component
const Stars2D = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        size: Math.random() < 0.3 ? 2 : 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: `${Math.random() * 3 + 2}s`,
        initialOpacity: Math.random() * 0.5 + 0.2
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.initialOpacity,
            animationDuration: star.animationDuration,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
          }}
        />
      ))}
    </div>
  );
};

// 3D StarField Component
function StarField() {
  const ref = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Particles Component
function Particles({ count = 1000 }) {
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let theta = Math.random() * Math.PI * 2;
      let r = 0.5 + Math.random() * 1.5;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  });
  
  const ref = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.z += delta * 0.1;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Combined Stars Component
const Stars = () => {
  const { darkMode } = useTheme();

  if (!darkMode) return null;

  return (
    <>
      <Stars2D />
      <div className="fixed inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 1.5] }}
          style={{ 
            background: 'transparent'
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Particles count={2000} />
            <StarField />
          </Suspense>
          <fogExp2 attach="fog" color="#020207" density={0.3} />
        </Canvas>
      </div>
    </>
  );
};

export default Stars;