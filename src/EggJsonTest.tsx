import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import heartData from '@/data/heart_model_data.json';
import { OrbitControls, Html } from '@react-three/drei';

function jetColor(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));

  let r = 0,
    g = 0,
    b = 0;

  if (t < 0.125) {
    b = 143 + (t / 0.125) * (255 - 143);
  } else if (t < 0.25) {
    b = 255;
  } else if (t < 0.375) {
    g = ((t - 0.25) / 0.125) * 255;
    b = 255;
  } else if (t < 0.5) {
    g = 255;
    b = 255 - ((t - 0.375) / 0.125) * 128;
  } else if (t < 0.625) {
    r = ((t - 0.5) / 0.125) * 127;
    g = 255;
  } else if (t < 0.75) {
    r = 127 + ((t - 0.625) / 0.125) * 128;
    g = 255;
  } else if (t < 0.875) {
    r = 255;
    g = 255 - ((t - 0.75) / 0.125) * 128;
  } else {
    r = 255;
    g = 127 - ((t - 0.875) / 0.125) * 127;
  }

  return [r / 255, g / 255, b / 255];
}

export const EggJsonTestComponent = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hoveredColorValue, setHoveredColorValue] = useState<number | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState<
    [number, number, number] | null
  >(null);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = heartData.heart.vertices.flat();
    const indices = heartData.heart.faces.flat();
    const positionAttr = new THREE.Float32BufferAttribute(vertices, 3);
    const colors = new Float32Array(heartData.heart.vertices.length * 3);
    const attr = new THREE.BufferAttribute(colors, 3);

    geom.setAttribute('position', positionAttr);
    geom.setAttribute('color', attr);
    geom.setIndex(indices);
    geom.computeVertexNormals();

    for (let i = 0; i < heartData.heart.vertices.length; i++) {
      const [r, g, b] = jetColor(heartData.heart.colors[i]);
      attr.setXYZ(i, r, g, b);
    }

    attr.needsUpdate = true;
    return geom;
  }, []);

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    const face = e.face;
    if (!face) return;

    const idx = e.face.a; // 삼각형의 첫 번째 정점 인덱스
    const colorValue = heartData.heart.colors[idx];
    setHoveredColorValue(colorValue);

    const vertex = geometry.attributes.position.array.slice(
      idx * 3,
      idx * 3 + 3
    );
    setHoverPosition([vertex[0], vertex[1], vertex[2]]);
  };

  return (
    <div className='w-full'>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [100, 100, 0] }}
      >
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />

        <mesh
          geometry={geometry}
          ref={meshRef}
          onPointerMove={handlePointerMove}
        >
          <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
        </mesh>

        {hoveredColorValue !== null && hoverPosition && (
          <Html position={hoverPosition}>
            <div className='p-1 text-xs text-black bg-white rounded shadow'>
              value: {hoveredColorValue.toFixed(3)}
            </div>
          </Html>
        )}

        <OrbitControls />
      </Canvas>
    </div>
  );
};
