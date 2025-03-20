import { CamChart } from '@/component/dyChart/chart/components/CamChart';
import { useCamChart } from '@/component/dyChart/chart/hook/useCamChart';
import raw_data from '@/data/feature_data_Rounding.json';

export const RealCamTestPage = () => {
  const { plotRef, data, layoutConfig, defaultConfig } = useCamChart(
    raw_data,
    21,
    461
  );
  return (
    <div className='w-2/4'>
      <CamChart field={{ plotRef, data, layoutConfig, defaultConfig }} />
    </div>
  );
};
