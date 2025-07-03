
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Cloud, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shimmer Bubble Component
function ShimmerBubble({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const bubbleRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (bubbleRef.current) {
      // Infinite floating movement
      bubbleRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 3;
      bubbleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 2;
      bubbleRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.4) * 2;
      
      // Rotation for shimmer effect
      bubbleRef.current.rotation.x += 0.01;
      bubbleRef.current.rotation.y += 0.015;
    }
    
    if (materialRef.current) {
      // Shimmer color animation
      const hue = (state.clock.elapsedTime * 0.1 + position[0] * 0.1) % 1;
      materialRef.current.color.setHSL(hue, 0.7, 0.6);
      
      // Opacity pulsing
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={bubbleRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          transparent
          opacity={0.4}
          color="#00aaff"
          emissive="#001122"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Smoke-like Particle System
function SmokeParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.position.y += Math.sin(state.clock.elapsedTime + i) * 0.02;
        mesh.rotation.z += 0.005;
        
        // Reset position for infinite loop
        if (mesh.position.y > 15) {
          mesh.position.y = -15;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 20
            ]}
            scale={0.3 + Math.random() * 0.5}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              transparent
              opacity={0.1 + Math.random() * 0.2}
              color={new THREE.Color().setHSL(0.6 + Math.random() * 0.4, 0.5, 0.7)}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

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
        
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 2, 16]} />
          <meshStandardMaterial color="#002540" />
        </mesh>
        
        <mesh position={[-1, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 1.5, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[1, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 1.5, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        
        <mesh position={[1.2, 0.8, 0.3]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 1.2, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#00aaff" />
        
        <Stars radius={300} depth={60} count={1000} factor={7} />
        
        {/* Shimmer Bubbles */}
        <ShimmerBubble position={[3, 2, -2]} scale={1.2} />
        <ShimmerBubble position={[-4, -1, 1]} scale={0.8} />
        <ShimmerBubble position={[7, -3, -4]} scale={1.5} />
        <ShimmerBubble position={[-6, 4, 2]} scale={0.9} />
        <ShimmerBubble position={[2, -4, -1]} scale={1.1} />
        <ShimmerBubble position={[-8, 1, -3]} scale={0.7} />
        
        {/* Smoke Particles */}
        <SmokeParticles />
        
        <Person3D />
        <FloatingShapes />
        
        <Bird position={[5, 4, 2]} />
        <Bird position={[-3, 6, 1]} />
        <Bird position={[8, 2, -1]} />
        
        <Cloud opacity={0.2} speed={0.3} concentrate="outside" growth={6} segments={50} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
