import { Outlines, useGLTF } from "@react-three/drei";
import { createPortal } from "@react-three/fiber";
import { Fragment, useEffect, useMemo } from "react";
import type { Texture } from "three";
import {
	Box3,
	Color,
	type Material,
	Mesh,
	MeshToonMaterial,
	Vector3,
} from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";

type ToonModelProps = {
	url: string;
	gradientMap: Texture;
	height?: number;
	outline?: boolean;
	outlineColor?: string;
	outlineThickness?: number;
};

export function ToonModel({
	url,
	gradientMap,
	height = 2.5,
	outline = true,
	outlineColor = "#080c14",
	outlineThickness = 3,
}: ToonModelProps) {
	const { scene } = useGLTF(url);
	const { model, materials, meshes, scale, position } = useMemo(() => {
		// Clone skeletons too, and leave the cached GLTF and its materials untouched.
		const model = clone(scene);
		const materials = new Map<Material, MeshToonMaterial>();
		const meshes: Mesh[] = [];

		function toToon(source: Material) {
			const cached = materials.get(source);
			if (cached) return cached;

			const original = source as Material & {
				color?: Color;
				map?: Texture | null;
				alphaMap?: Texture | null;
				normalMap?: Texture | null;
				emissive?: Color;
				emissiveMap?: Texture | null;
				emissiveIntensity?: number;
			};
			const material = new MeshToonMaterial({
				color: original.color ?? new Color("#818cf8"),
				map: original.map ?? null,
				alphaMap: original.alphaMap ?? null,
				normalMap: original.normalMap ?? null,
				emissive: original.emissive ?? new Color(0),
				emissiveMap: original.emissiveMap ?? null,
				emissiveIntensity: original.emissiveIntensity ?? 1,
				gradientMap,
				transparent: source.transparent,
				opacity: source.opacity,
				alphaTest: source.alphaTest,
				side: source.side,
				depthWrite: source.depthWrite,
			});
			materials.set(source, material);
			return material;
		}

		model.traverse((object) => {
			if (!(object instanceof Mesh)) return;
			meshes.push(object);
			object.castShadow = true;
			object.receiveShadow = true;
			object.material = Array.isArray(object.material)
				? object.material.map(toToon)
				: toToon(object.material);
		});

		// Wrap the source transform so arbitrary model sizes land on the floor.
		const bounds = new Box3().setFromObject(model);
		const center = bounds.getCenter(new Vector3());
		const size = bounds.getSize(new Vector3());
		const scale = height / (size.y || 1);
		return {
			model,
			materials,
			meshes,
			scale,
			position: [-center.x, -bounds.min.y, -center.z] as const,
		};
	}, [scene, gradientMap, height]);

	useEffect(
		() => () => {
			for (const material of materials.values()) material.dispose();
		},
		[materials],
	);

	return (
		<group scale={scale} dispose={null}>
			<group position={[...position]}>
				<primitive object={model} />
				{outline &&
					meshes.map((mesh) => (
						<Fragment key={mesh.uuid}>
							{createPortal(
								<Outlines
									color={outlineColor}
									thickness={outlineThickness}
									toneMapped={false}
								/>,
								mesh,
							)}
						</Fragment>
					))}
			</group>
		</group>
	);
}
