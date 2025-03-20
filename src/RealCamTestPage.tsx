import { CamChart } from '@/component/dyChart/chart/components/CamChart';
import { useCamChart } from '@/component/dyChart/chart/hook/useCamChart';
import raw_data from '@/data/feature_data_Rounding.json';

export const RealCamTestPage = () => {
  const {
    plotRef,
    data,
    layoutConfig,
    defaultConfig,
    startUpdate,
    stopUpdate,
    resetCamChart,
    progressRef,
    changeSpeed,
    handleProgressChange,
  } = useCamChart(raw_data, 21, 460);
  return (
    <div className='w-2/4'>
      <CamChart field={{ plotRef, data, layoutConfig, defaultConfig }} />
      <div className='flex flex-row gap-4'>
        <button className='border' onClick={startUpdate}>
          업데이트 차트
        </button>
        <button className='border' onClick={stopUpdate}>
          정지
        </button>
        <button className='border' onClick={resetCamChart}>
          초기화
        </button>
        <input
          ref={progressRef}
          type='range'
          min='0'
          max='100'
          defaultValue='0'
          step='1'
          onChange={handleProgressChange}
          style={{ width: '100%' }}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <button className='border' onClick={() => changeSpeed(0.25)}>
          0.25
        </button>
        <button className='border' onClick={() => changeSpeed(0.5)}>
          0.5
        </button>
        <button className='border' onClick={() => changeSpeed(1)}>
          1
        </button>
        <button className='border' onClick={() => changeSpeed(1.5)}>
          1.5
        </button>
        <button className='border' onClick={() => changeSpeed(2)}>
          2
        </button>
      </div>
    </div>
  );
};
