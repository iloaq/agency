"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const HERO_MODEL_URL = "/sputnik.glb";

function HeroModel({ scroll }: { scroll: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const baseScaleRef = useRef(1);

  // Source: https://docs.pmnd.rs/drei/loaders/gltf-use-gltf
  const gltf = useGLTF(HERO_MODEL_URL);

  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Base framing for "media card" state (before scroll takeover)
  const baseX = 1.35;
  const baseY = -0.08;

  useEffect(() => {
    // Remove "background shell" from this GLB (it is the *huge* object with extreme scale).
    // We detect it by world-space size, not by triangles count.
    const meshes: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) meshes.push(mesh);
    });

    scene.updateWorldMatrix(true, true);

    const diags = meshes.map((m) => {
      const b = new THREE.Box3().setFromObject(m);
      const s = new THREE.Vector3();
      b.getSize(s);
      return s.length();
    });

    const minDiag = Math.min(...diags.filter((d) => Number.isFinite(d) && d > 0));
    const toRemove: THREE.Object3D[] = [];
    meshes.forEach((m, i) => {
      const d = diags[i] ?? 0;
      // Anything massively larger than the smallest mesh is treated as "shell".
      if (minDiag > 0 && d > minDiag * 6) toRemove.push(m);
    });
    toRemove.forEach((obj) => obj.parent?.remove(obj));

    // Fit model bounds after pruning.
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    scene.position.sub(center);

    const radius = Math.max(0.0000001, size.length() * 0.1);

    // Comfortable base framing.
    const targetRadius = 1.25;
    const s = targetRadius / radius;
    const g = groupRef.current;
    if (g) {
      baseScaleRef.current = s;
      g.scale.setScalar(s);
      // Initial angle to avoid "flat plate" read.
      g.rotation.set(-0.18, -0.75, 0.12);
      g.position.set(baseX, baseY, 0);
    }

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      // Avoid breaking skinned meshes if any exist.
      if ((mesh as unknown as { isSkinnedMesh?: boolean }).isSkinnedMesh) return;
      // Preserve original PBR, but tune for tech-luxury.
      const mat = mesh.material;
      const apply = (m: THREE.Material) => {
        const mm = m as unknown as THREE.MeshStandardMaterial;
        if ((mm as unknown as { isMeshStandardMaterial?: boolean }).isMeshStandardMaterial) {
          // Subtle "premium metal" grading (keep textures if present).
          mm.metalness = Math.min(1, Math.max(0, (mm.metalness ?? 0.3) + 0.25));
          mm.roughness = Math.min(1, Math.max(0, (mm.roughness ?? 0.6) - 0.25));
          mm.envMapIntensity = 1.35;
          mm.emissive = mm.emissive ?? new THREE.Color("#000000");
          mm.emissive.add(new THREE.Color("#00AEEF").multiplyScalar(0.06));
          mm.needsUpdate = true;
        }
        m.side = THREE.DoubleSide;
      };
      if (Array.isArray(mat)) {
        mesh.material = mat.map((m) => {
          const c = m.clone();
          apply(c);
          return c;
        });
      } else {
        const c = mat.clone();
        apply(c);
        mesh.material = c;
      }

      // Ensure normals exist (some exports omit them).
      if (!mesh.geometry.attributes.normal) {
        mesh.geometry.computeVertexNormals();
      }
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    });

    return () => {};
  }, [scene]);

  useFrame((state, delta) => {
    const s = scroll.get(); // 0..1 (Lenis progress)
    const g = groupRef.current;
    if (g) {
      const t = state.clock.elapsedTime;
      // Scroll narrative: idle micro-motion -> scale/translate to background until end.
      // We keep changes subtle (premium), but noticeable.
      // Source: https://threejs.org/docs/#api/en/math/MathUtils.smoothstep
      const p = THREE.MathUtils.smoothstep(s, 0.06, 0.85);

      // "Media card" pose
      // Source: https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe
      const idleRx = -0.16 + state.pointer.y * 0.10 + t * 0.02;
      const idleRy = -0.75 + state.pointer.x * 0.16 + t * 0.06;
      const idleX = baseX + state.pointer.x * 0.14;
      const idleY = baseY + state.pointer.y * 0.07;
      const idleZ = -0.10;
      const idleScale = 1.0; // multiplier over fitted base scale

      // "Background system" pose (fills the scene, keeps moving)
      const bgRx = -0.24 + t * 0.02;
      const bgRy = -0.25 + t * 0.08;
      const bgX = -0.45; // move left on scroll
      const bgY = 0.06;
      const bgZ = -0.85;
      const bgScale = 1.35; // keep size stable (small growth only)

      const targetRy = THREE.MathUtils.lerp(idleRy, bgRy, p);
      const targetRx = THREE.MathUtils.lerp(idleRx, bgRx, p);
      const targetX = THREE.MathUtils.lerp(idleX, bgX, p);
      const targetY = THREE.MathUtils.lerp(idleY, bgY, p);
      const targetZ = THREE.MathUtils.lerp(idleZ, bgZ, p);
      const targetScale = THREE.MathUtils.lerp(idleScale, bgScale, p);

      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRy, 0.08);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRx, 0.08);
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.08);
      g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.08);
      g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, 0.08);
      // Apply scale as multiplier over the fitted base scale (prevents huge jumps).
      const baseScale = baseScaleRef.current || 1;
      const absTargetScale = baseScale * targetScale;
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, absTargetScale, 0.08));
    }
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export function LabHeroCanvas({ scroll }: { scroll: MotionValue<number> }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <Canvas
      // Source: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0.15, 0.0, 6.6], fov: 34 }}
      onCreated={({ gl }) => {
        // Source: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setClearColor
        gl.setClearColor(new THREE.Color("#00090C"), 1);
      }}
    >
      {/* Background comes from renderer clearColor (dark base) */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 2]} intensity={0.35} />
      <directionalLight position={[-2, 1, -2]} intensity={0.25} />
      <pointLight position={[2.6, 0.5, 2]} intensity={0.6} color="#00AEEF" />
      <pointLight position={[-2.4, -0.2, 1.6]} intensity={0.45} color="#09E9D4" />
      {/* Source: https://docs.pmnd.rs/drei/staging/environment */}
      <Environment preset="city" environmentIntensity={0.85} />
      <Suspense fallback={null}>
        <HeroModel scroll={scroll} />
      </Suspense>
    </Canvas>
  );
}

