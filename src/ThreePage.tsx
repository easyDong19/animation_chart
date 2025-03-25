import { EggComponent } from '@/EggComponent';
import { Canvas } from '@react-three/fiber';

export const ThreePage = () => {
  return (
    <div>
      <div className='w-[1500px] min-h-screen'>
        <Canvas>
          <EggComponent />
        </Canvas>
      </div>
    </div>
  );
};
