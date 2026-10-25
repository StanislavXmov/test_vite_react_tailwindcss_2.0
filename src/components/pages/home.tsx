import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function RotatingCube() {
	const meshRef = useRef<Mesh>(null);

	useFrame((_, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.2;
		meshRef.current.rotation.y += delta * 0.4;
	});

	return (
		<mesh ref={meshRef} position={[0, 1.25, 0]} castShadow>
			<boxGeometry args={[1.5, 1.5, 1.5]} />
			<meshStandardMaterial color="#818cf8" roughness={0.35} metalness={0.15} />
		</mesh>
	);
}

export function Home() {
	return (
		<div className="relative h-dvh w-full">
			<Canvas
				shadows
				dpr={[1, 2]}
				camera={{ position: [5, 4, 6], fov: 45 }}
				fallback={
					<p className="p-6">Для отображения 3D-сцены требуется WebGL.</p>
				}
			>
				<color attach="background" args={["#111827"]} />
				<ambientLight intensity={0.6} />
				<directionalLight
					position={[5, 8, 5]}
					intensity={2}
					castShadow
					shadow-mapSize={[1024, 1024]}
				/>
				<RotatingCube />
				<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<planeGeometry args={[20, 20]} />
					<meshStandardMaterial color="#1f2937" roughness={0.9} />
				</mesh>
				<gridHelper
					args={[20, 20, "#475569", "#334155"]}
					position={[0, 0.01, 0]}
				/>
				<OrbitControls
					makeDefault
					target={[0, 1, 0]}
					minDistance={3}
					maxDistance={15}
					maxPolarAngle={Math.PI / 2 - 0.05}
				/>
			</Canvas>
			<p className="pointer-events-none absolute bottom-6 inset-x-0 text-center text-sm text-slate-400">
				Drag to rotate the camera · Scroll to zoom
			</p>
		</div>
	);
}
