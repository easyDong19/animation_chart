import { EggTest } from '@/EggObjComponent';
import { Canvas } from '@react-three/fiber';

export const ThreePage = () => {
  return (
    <div>
      <div className='w-[800px] h-[800px] bg-gray-400'>
        <Canvas
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
          camera={{ position: [100, 100, 0] }}
        >
          <EggTest />
        </Canvas>
      </div>
    </div>
  );
};
