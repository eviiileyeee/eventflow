// BackgroundScene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Waves from "./Waves";

const BackgroundScene = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#C0D0DF] to-[#9CB3D7] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Waves />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;