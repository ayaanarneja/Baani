import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleBrain = () => {
  const pointsRef = useRef();

  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Create a somewhat elongated sphere shape like a brain
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.5 + Math.random() * 0.5;
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = (r * 0.8) * Math.cos(phi); // Flatten height a bit
      let z = (r * 1.2) * Math.sin(phi) * Math.sin(theta); // Elongate depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const GlowingCore = () => {
  return (
    <Sphere args={[1.8, 64, 64]}>
      <MeshDistortMaterial
        color="#60a5fa"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
};

const Brain3D = () => {
  return (
    <div className="w-full h-full absolute right-0 top-0 pointer-events-none md:pointer-events-auto opacity-50 md:opacity-100">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        
        <group position={[3, 0, 0]}>
          <ParticleBrain />
          <GlowingCore />
        </group>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Brain3D;
