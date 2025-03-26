import { useEffect, useRef, Suspense } from 'react';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';

export const EggTest = () => {
  const pivotRef = useRef<THREE.Group>(null);

  return (
    <>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <group ref={pivotRef} position={[2, 0, 0]} name='basis'>
        <EggObjModel modelPath='/egg.obj' />
      </group>
      <PivotControls pivotRef={pivotRef} />
    </>
  );
};

function EggObjModel({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const center = new THREE.Vector3();
    box.getCenter(center);

    obj.position.sub(center);
  }, [obj]);

  return <primitive object={obj} />;
}

/**
 * orbitControl의 기준 좌표를 Pivot에 맞게 설정
 */
function PivotControls({
  pivotRef,
}: {
  pivotRef: React.RefObject<THREE.Object3D>;
}) {
  // OrbitControls 인스턴스 접근
  const controls = useRef<ThreeOrbitControls | null>(null);
  const { camera, gl } = useThree();

  // OrbitControls가 마운트 된 이후 controls ref에 객체 주입되면 pivot 좌표 시작
  useEffect(() => {
    if (pivotRef.current && controls.current) {
      const worldPos = new THREE.Vector3();
      pivotRef.current.getWorldPosition(worldPos);
      controls.current.target.copy(worldPos);
      controls.current.update();
    }
  }, [pivotRef]);

  return <OrbitControls ref={controls} args={[camera, gl.domElement]} />;
}

function Model() {
  const obj = useLoader(OBJLoader, '/egg.obj');
  console.log(obj);
  const meshRef = useRef<THREE.Mesh>(null);
  const colorAttrRef = useRef<THREE.BufferAttribute | null>(null);

  useEffect(() => {
    const mesh = obj.children.find(
      (child) => child.type === 'Mesh'
    ) as THREE.Mesh;
    if (!mesh) return;

    meshRef.current = mesh;
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < vertexCount; i++) {
      const y = positionAttr.getY(i);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    const colors = new Float32Array(vertexCount * 3);
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', colorAttr);
    mesh.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    colorAttrRef.current = colorAttr;
  }, [obj]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const colorAttr = colorAttrRef.current;
    if (!mesh || !colorAttr) return;

    const geometry = mesh.geometry as THREE.BufferGeometry;
    const position = geometry.attributes.position;
    const time = clock.elapsedTime;
    const vertexCount = position.count;

    for (let i = 0; i < vertexCount; i++) {
      const y = position.getY(i);
      const t = (Math.sin(y * 2 + time * 2) + 1) / 2;

      const r = t;
      const g = 0;
      const b = 1 - t;

      colorAttr.setXYZ(i, r, g, b);
    }

    colorAttr.needsUpdate = true;
  });

  return <primitive object={obj} />;
}

export const EggObjComponent = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </>
  );
};
