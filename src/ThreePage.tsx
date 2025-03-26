import { EggTest, EggWrapper } from '@/EggObjComponent';
import { Canvas } from '@react-three/fiber';

export const ThreePage = () => {
  return (
    <div className='flex flex-col gap-5'>
      <EggWrapper modelPath='/egg.obj' />
      <EggTest />
    </div>
  );
};
