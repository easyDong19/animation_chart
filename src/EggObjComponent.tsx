import { useEffect, useRef, Suspense, useState } from 'react';
import { useLoader, useFrame, useThree, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import raw_data from '@/data/feature_data_Rounding.json';

export const EggTest = () => {
  const pivotRef = useRef<THREE.Group>(null);

  return (
    <div className='w-[800px] h-[800px] bg-gray-400'>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [100, 100, 0] }}
      >
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <group ref={pivotRef} position={[2, 0, 0]} name='basis'>
          <EggObjModel modelPath='/egg2.obj' />
        </group>
        <PivotControls pivotRef={pivotRef} />
      </Canvas>
    </div>
  );
};

export function EggWrapper({ modelPath }: { modelPath: string }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const pivotRef = useRef<THREE.Group>(null);

  return (
    <div className='w-[800px] h-[800px] bg-gray-400 relative'>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [100, 100, 0] }}
      >
        <directionalLight position={[5, 5, 5]} />
        <IndexEggObjModel modelPath={modelPath} isAnimating={isAnimating} />
      </Canvas>

      <div className='absolute z-10 top-2 left-2'>
        <button
          onClick={() => setIsAnimating((prev) => !prev)}
          className='px-4 py-2 bg-white rounded shadow'
        >
          {isAnimating ? '정지' : '애니메이션 시작'}
        </button>
      </div>
    </div>
  );
}

export function IndexEggObjModel({
  modelPath,
  isAnimating,
}: {
  modelPath: string;
  isAnimating: boolean;
}) {
  const obj = useLoader(OBJLoader, modelPath);
  const geometry = obj.children[0].geometry as THREE.BufferGeometry;
  const mesh = obj.children[0] as THREE.Mesh;
  const positionAttr = geometry.attributes.position;
  const vertexCount = positionAttr.count;
  const colorAttrRef = useRef<THREE.BufferAttribute | null>(null);
  const pivotRef = useRef<THREE.Group>(null);

  mesh.material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    const center = new THREE.Vector3();

    const box = new THREE.Box3().setFromObject(obj);
    box.getCenter(center);
    obj.position.sub(center);

    const colors = new Float32Array(vertexCount * 3);
    const attr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', attr);
    colorAttrRef.current = attr;
  }, [geometry, positionAttr, vertexCount]);

  useFrame(({ clock }) => {
    if (!isAnimating) return;

    const colorAttr = colorAttrRef.current;
    if (!colorAttr) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < vertexCount; i++) {
      const y = positionAttr.getY(i);
      const t = (Math.sin(y * 2 + time * 2) + 1) / 2;

      const r = t;
      const g = 0;
      const b = 1 - t;

      colorAttr.setXYZ(i, r, g, b);
    }

    colorAttr.needsUpdate = true;
  });

  return (
    <>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />

      <group ref={pivotRef} position={[2, 0, 0]} name='basis'>
        {/* 🔹 원래 메쉬 */}
        <primitive object={obj} />
      </group>

      <PivotControls pivotRef={pivotRef} />
    </>
  );
}

/**
 * 임시로 렌더링할 데이터 생성(feature_data_Rounding.json)
 * @param faceCount : 모델의 면 갯수
 */
function generateHeatMapData(faceCount: number) {
  const heatmapData = [];
  const totalData = generateTotalData();

  for (let i = 0; i < 460; i++) {
    const parsingData = totalData[i].flat();
    const concatData = parsingData.concat(parsingData.slice(0, 151));
    heatmapData.push(concatData);
  }

  console.log(heatmapData);
  //   let min = Infinity;
  //   let max = -Infinity;

  // //   for (const row of heatmapData) {
  // //     for (const val of row) {
  // //       if (val < min) min = val;
  // //       if (val > max) max = val;
  // //     }
  // //   }
  // //   console.log(min);
  // //   console.log(max);

  // 히트맵 색깔 지정을 위해 정규화
  const normalizedData = heatmapData.map((row) => {
    let min = Infinity;
    let max = -Infinity;

    for (const val of row) {
      if (val < min) min = val;
      if (val > max) max = val;
    }

    return row.map((val) => (val - min) / (max - min));
  });

  console.log(normalizedData);
  const rgbArray = normalizedData.map((row) => row.map((val) => jetColor(val)));

  return rgbArray;
}

const generateTotalData = (size: number = 21, series_length: number = 460) => {
  const totalData = [];

  for (let s = 0; s < series_length; s++) {
    const data = [];
    for (let i = 0; i < size; i++) {
      const jData = [];

      for (let j = 0; j < size; j++) {
        jData.push(raw_data[i]['Bz'][j][s]);
      }
      data.push(jData);
    }
    totalData.push(data);
  }

  console.log(totalData);

  return totalData;
};

/**
 * value를 Jet 히트맵 컬러(rgb) 배열로 바꿈
 * 이때 value는 0~1 범위로 정규화한 값을 줘야됨
 */
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

// non-index로 정점 중복 안함
function EggObjModel({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath);
  const geometry = obj.children[0].geometry as THREE.BufferGeometry;
  const mesh = obj.children[0] as THREE.Mesh;

  const positionAttr = geometry.attributes.position;
  const vertexCount = positionAttr.count;
  const faceCount = vertexCount / 3;

  const colorData = generateHeatMapData(faceCount);
  const seriesRef = useRef(0);
  const colorAttrRef = useRef<THREE.BufferAttribute | null>(null);

  mesh.material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const center = new THREE.Vector3();
    box.getCenter(center);
    obj.position.sub(center);

    const colors = new Float32Array(vertexCount * 3);
    const attr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', attr);
    colorAttrRef.current = attr;
  }, [obj]);

  //   useFrame(() => {
  //     const attr = colorAttrRef.current;
  //     if (!attr) return;

  //     const series = seriesRef.current;
  //     const colors = attr.array as Float32Array;

  //     for (let i = 0; i < faceCount; i++) {
  //       const [r, g, b] = colorData[series][i];
  //       for (let j = 0; j < 3; j++) {
  //         const idx = (i * 3 + j) * 3;
  //         colors[idx + 0] = r;
  //         colors[idx + 1] = g;
  //         colors[idx + 2] = b;
  //       }
  //     }

  //     attr.needsUpdate = true;

  //     seriesRef.current = (series + 1) % colorData.length;
  //   });

  useFrame(() => {
    const attr = colorAttrRef.current;
    if (!attr) return;

    const series = seriesRef.current;

    for (let i = 0; i < vertexCount; i++) {
      const [r, g, b] = colorData[series][i % faceCount];

      attr.setXYZ(i, r, g, b);
    }

    attr.needsUpdate = true;

    seriesRef.current = (series + 1) % colorData.length;
  });

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

  // OrbitControls가 마운트 된 이후 controls ref에 객체 주입되면 pivot 좌표로 할당
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
