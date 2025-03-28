import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import heartData from '@/data/heart_model_data.json';
import { OrbitControls } from '@react-three/drei';

function jetColor(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));

  let r = 0,
    g = 0,
    b = 0;

  if (t < 0.125) {
    r = 0;
    g = 0;
    b = 143 + (t / 0.125) * (255 - 143);
  } else if (t < 0.25) {
    r = 0;
    g = 0;
    b = 255;
  } else if (t < 0.375) {
    r = 0;
    g = ((t - 0.25) / 0.125) * 255;
    b = 255;
  } else if (t < 0.5) {
    r = 0;
    g = 255;
    b = 255 - ((t - 0.375) / 0.125) * 128;
  } else if (t < 0.625) {
    r = ((t - 0.5) / 0.125) * 127;
    g = 255;
    b = 0;
  } else if (t < 0.75) {
    r = 127 + ((t - 0.625) / 0.125) * 128;
    g = 255;
    b = 0;
  } else if (t < 0.875) {
    r = 255;
    g = 255 - ((t - 0.75) / 0.125) * 128;
    b = 0;
  } else {
    r = 255;
    g = 127 - ((t - 0.875) / 0.125) * 127;
    b = 0;
  }

  return [r / 255, g / 255, b / 255];
}

export const EggJsonTestComponent = () => {
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
    console.log(heartData.heart.colors);

    for (let i = 0; i < heartData.heart.vertices.length; i++) {
      const [r, g, b] = jetColor(heartData.heart.colors[i]);
      attr.setXYZ(i, r, g, b);
    }
    attr.needsUpdate = true;
    return geom;
  }, []);

  return (
    <div className='w-full '>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [100, 100, 0] }}
      >
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <mesh geometry={geometry}>
          <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};
