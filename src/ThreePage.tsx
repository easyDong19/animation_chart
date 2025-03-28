import { EggJsonTestComponent } from '@/EggJsonTest';
import { EggTest, EggWrapper } from '@/EggObjComponent';
import { Canvas } from '@react-three/fiber';

export const ThreePage = () => {
  return (
    <div className='flex flex-row gap-5'>
      <EggWrapper modelPath='/egg.obj' />
      <EggTest />
      <EggJsonTestComponent />
    </div>
  );
};
