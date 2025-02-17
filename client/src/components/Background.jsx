import React, { useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

const FloatingImages = () => {
  const groupRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;

    const images = [
      "/images/image1.jpg",
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.jpg",
      "/images/image5.jpg",
    ];

    images.forEach((imgSrc, index) => {
      const texture = new THREE.TextureLoader().load(imgSrc);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const geometry = new THREE.PlaneGeometry(3, 2);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        Math.random() * -3
      );

      if (groupRef.current) {
        groupRef.current.add(mesh);
      }
    });
  }, [camera]);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        x: mouse.y * 0.2,
        y: mouse.x * 0.2,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  });

  return <group ref={groupRef} />;
};

const Background = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <FloatingImages />
    </Canvas>
  );
};

export default Background;
