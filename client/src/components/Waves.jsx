// Waves.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Waves = () => {
  const meshRef = useRef();
  const numWaves = 10;
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4;
    }
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {[...Array(numWaves)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.3, 0]}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#9CB3D7" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

export default Waves;
