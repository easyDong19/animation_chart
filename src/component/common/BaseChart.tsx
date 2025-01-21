import { ReactNode } from 'react';
import { getChildOfType } from '../../util/getChildOfType';
import Slider from './Slider';

type WrapperType = {
  children: ReactNode;
};

type HeaderType = {
  title: string;
  isBtn: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
};
const Header = ({ title, isBtn, start, stop, reset }: HeaderType) => {
  return (
    <div className='flex justify-between mb-6'>
      <div className='text-3xl font-bold'>{title}</div>
      {isBtn && (
        <div className='flex gap-4 '>
          <button
            className='px-5 border rounded-lg border-slate-400'
            onClick={start}
          >
            Play
          </button>
          <button
            className='px-5 border rounded-lg border-slate-400'
            onClick={stop}
          >
            stop
          </button>
          <button
            className='px-5 border rounded-lg border-slate-400'
            onClick={reset}
          >
            reset
          </button>
        </div>
      )}
    </div>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return <div className='w-full h-full'>{children}</div>;
};

const Footer = ({ children }: { children: ReactNode }) => {
  const slider = getChildOfType(children, Slider);
  return <div>{slider}</div>;
};
const BaseChartMain = ({ children }: WrapperType) => {
  const header = getChildOfType(children, Header);
  const content = getChildOfType(children, Content);
  const footer = getChildOfType(children, Footer);

  return (
    <div className='w-3/4 h-full shadow-lg'>
      {/* 헤더 컴포넌트 */}
      {header}

      <div className='flex-col w-full h-full p-4 bg-white border rounded-lg border-slate-400'>
        <div className='w-full h-3/4'>{content}</div>
        <div className='flex items-center justify-between w-full'>
          <div>설명서</div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export const BaseChart = Object.assign(BaseChartMain, {
  header: Header,
  content: Content,
  footer: Footer,
});
