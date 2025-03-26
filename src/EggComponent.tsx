import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

import * as THREE from 'three';

function Model() {
  const gltf = useGLTF('/test.gltf');
  const mesh = gltf.nodes['mesh0']; // 메쉬 이름을 정확하게 입력
  const geometry = mesh.geometry;

  useEffect(() => {
    if (!geometry || !geometry.attributes.position) return;

    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < vertexCount; i++) {
      const y = positionAttr.getY(i);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    // 색상 배열 생성
    const colors = new Float32Array(vertexCount * 3); // RGB per vertex

    for (let i = 0; i < vertexCount; i++) {
      const y = positionAttr.getY(i);

      const t = (y - minY) / (maxY - minY);

      const r = t;
      const g = 0;
      const b = 1 - t;

      colors[i * 3 + 0] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    // color attribute 등록
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 재질이 색상 기반을 쓸 수 있도록 설정
    mesh.material.vertexColors = true;
  }, [geometry, mesh]);

  return <primitive object={gltf.scene} />;
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Model2() {
  const gltf = useGLTF('/test.gltf');
  const mesh = gltf.nodes['mesh0'];
  const geometry = mesh.geometry;
  const colorAttrRef = useRef<THREE.BufferAttribute | null>(null);
  const minYRef = useRef<number>(0);
  const maxYRef = useRef<number>(1);

  useEffect(() => {
    if (!geometry || !geometry.attributes.position) return;

    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < vertexCount; i++) {
      const y = positionAttr.getY(i);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    minYRef.current = minY;
    maxYRef.current = maxY;

    const colors = new Float32Array(vertexCount * 3);
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', colorAttr);
    mesh.material.vertexColors = true;

    colorAttrRef.current = colorAttr;
  }, [geometry, mesh]);

  useFrame(({ clock }) => {
    const colorAttr = colorAttrRef.current;
    if (!colorAttr || !geometry.attributes.position) return;

    const time = clock.elapsedTime;
    const position = geometry.attributes.position;
    const vertexCount = position.count;

    for (let i = 0; i < vertexCount; i++) {
      const y = position.getY(i);

      // 애니메이션 효과: 시간 + y 위치로 파형 만들기
      const t = (Math.sin(y * 2 + time * 2) + 1) / 2; // 0 ~ 1로 정규화

      const r = t;
      const g = 0;
      const b = 1 - t;

      colorAttr.setXYZ(i, r, g, b);
    }

    colorAttr.needsUpdate = true;
  });

  return <primitive object={gltf.scene} />;
}
export const EggComponent = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Model2 />
      </Suspense>
      <OrbitControls />
    </>
  );
};
