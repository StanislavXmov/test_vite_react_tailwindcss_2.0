import { Html, OrbitControls, Outlines } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { Component, Suspense, useEffect, useMemo, useRef } from "react";
import type { Mesh, Texture } from "three";
import { DataTexture, NearestFilter, RedFormat } from "three";
import { ToonModel } from "../3d/toon-model";

// Place the future file in public/models/ and set e.g. "/models/model.glb".
const MODEL_URL: string | null = "/models/block.glb";

class ModelErrorBoundary extends Component<
	{ children: ReactNode },
	{ failed: boolean }
> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	render() {
		if (this.state.failed) {
			return (
				<Html center>
					<p className="w-64 rounded bg-slate-900 p-4 text-center text-sm text-red-300">
						Не удалось загрузить GLB. Проверьте файл и путь к модели.
					</p>
				</Html>
			);
		}
		return this.props.children;
	}
}

function RotatingCube({ gradientMap }: { gradientMap: Texture }) {
	const meshRef = useRef<Mesh>(null);

	useFrame((_, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.2;
		meshRef.current.rotation.y += delta * 0.4;
	});

	return (
		<mesh ref={meshRef} position={[0, 1.25, 0]} castShadow>
			<boxGeometry args={[1.5, 1.5, 1.5]} />
			<meshToonMaterial color="#818cf8" gradientMap={gradientMap} />
			<Outlines color="#080c14" thickness={3} toneMapped={false} />
		</mesh>
	);
}

export function Home() {
	const gradientMap = useMemo(() => {
		const texture = new DataTexture(
			new Uint8Array([40, 100, 175, 255]),
			4,
			1,
			RedFormat,
		);
		texture.minFilter = NearestFilter;
		texture.magFilter = NearestFilter;
		texture.generateMipmaps = false;
		texture.needsUpdate = true;
		return texture;
	}, []);

	useEffect(() => () => gradientMap.dispose(), [gradientMap]);

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
				<ambientLight intensity={0.25} />
				<directionalLight
					position={[5, 8, 5]}
					intensity={1.5}
					castShadow
					shadow-mapSize={[2048, 2048]}
					// Offset shadow samples from the surface to prevent self-shadow stripes.
					shadow-bias={-0.0002}
					shadow-normalBias={0.03}
					shadow-camera-near={0.5}
					shadow-camera-far={25}
					shadow-camera-left={-4}
					shadow-camera-right={4}
					shadow-camera-top={4}
					shadow-camera-bottom={-4}
				/>
				{MODEL_URL ? (
					<ModelErrorBoundary key={MODEL_URL}>
						<Suspense
							fallback={
								<Html center>
									<p className="whitespace-nowrap text-sm text-slate-300">
										Загрузка модели…
									</p>
								</Html>
							}
						>
							<ToonModel
								url={MODEL_URL}
								gradientMap={gradientMap}
								outlineColor="#080c14"
								outlineThickness={3}
							/>
						</Suspense>
					</ModelErrorBoundary>
				) : (
					<RotatingCube gradientMap={gradientMap} />
				)}
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
