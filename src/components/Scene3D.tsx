
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Stars, Cloud } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated Bird Component
function Bird({ position }: { position: [number, number, number] }) {
  const birdRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (birdRef.current) {
      birdRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10;
      birdRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 2 + position[1];
      birdRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={birdRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#002540" />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.2]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.2]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>
    </group>
  );
}

// 3D Person Holding Form
function Person3D() {
  const personRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (personRef.current) {
      personRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      personRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - 2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={personRef} position={[-8, -2, -3]} scale={1.5}>
        {/* Head */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 2, 16]} />
          <meshStandardMaterial color="#002540" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-1, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 1.5, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[1, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 1.5, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        
        {/* Form in hand */}
        <mesh position={[1.2, 0.8, 0.3]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 1.2, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.3, -1.5, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 1.5, 8]} />
          <meshStandardMaterial color="#002540" />
        </mesh>
        <mesh position={[0.3, -1.5, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 1.5, 8]} />
          <meshStandardMaterial color="#002540" />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Geometric Shapes
function FloatingShapes() {
  const shapesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={shapesRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[6, 3, -2]}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#0066cc" transparent opacity={0.6} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-6, -1, -1]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#002540" transparent opacity={0.4} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[4, -3, -3]}>
          <tetrahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#0099ff" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

// Main 3D Scene
export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Stars radius={300} depth={60} count={1000} factor={7} />
        
        <Person3D />
        <FloatingShapes />
        
        <Bird position={[5, 4, 2]} />
        <Bird position={[-3, 6, 1]} />
        <Bird position={[8, 2, -1]} />
        
        <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} />
        
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.5}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            position={[0, 6, -5]}
            size={1}
            height={0.2}
          >
            Welcome
            <meshStandardMaterial color="#002540" />
          </Text3D>
        </Float>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
