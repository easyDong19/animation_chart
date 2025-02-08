import { useRef } from 'react';
import EcgChart from './component/protoChart/ecg/EcgChart';
import { BaseChart } from './component/common/BaseChart';
import Slider from './component/common/Slider';
import SteppedLineChart from './component/protoChart/bpm/StepLineChart';
import MagneticFieldMap from './component/protoChart/magnetic/MagneticFieldMap';
import PolarScatterChart from './component/protoChart/radar/PolarChart';
import { MagneticArrowFieldMap } from './component/protoChart/magnetic/MagneticArrowFiledMap';

function ProtoTypeChart() {
  const chartRef_line = useRef<{
    startGraph: () => void;
    stopGraph: () => void;
    resetGraph: () => void;
    changeSpeed: (newSpeed: number) => void;
  }>(null);

  const chartRef_bpm = useRef<{
    startGraph: () => void;
    stopGraph: () => void;
    resetGraph: () => void;
    changeSpeed: (newSpeed: number) => void;
  }>(null);

  return (
    <div className='w-full h-auto p-10 App '>
      <div className='mb-5 text-3xl font-bold'>애니메이션 차트 종류</div>

      <div className='flex flex-col w-full h-full gap-20'>
        <div className=''>
          <BaseChart>
            <BaseChart.header
              isBtn={true}
              title={'PQRST Signal'}
              start={() => chartRef_line.current?.startGraph()}
              stop={() => chartRef_line.current?.stopGraph()}
              reset={() => {
                chartRef_line.current?.stopGraph();
                chartRef_line.current?.resetGraph();
              }}
            />
            <BaseChart.content>
              {/* <LineChart /> */}
              <EcgChart ref={chartRef_line} />
            </BaseChart.content>
            <BaseChart.footer>
              <Slider
                changeSpeed={(newSpeed: number) =>
                  chartRef_line.current?.changeSpeed(newSpeed)
                }
              />
            </BaseChart.footer>
          </BaseChart>
        </div>

        <div className=''>
          <BaseChart>
            <BaseChart.header
              isBtn={true}
              title={'Rate'}
              start={() => chartRef_bpm.current?.startGraph()}
              stop={() => chartRef_bpm.current?.stopGraph()}
              reset={() => {
                chartRef_bpm.current?.stopGraph();
                chartRef_bpm.current?.resetGraph();
              }}
            />
            <BaseChart.content>
              <SteppedLineChart ref={chartRef_bpm} />
            </BaseChart.content>
            <BaseChart.footer>
              <Slider
                changeSpeed={(newSpeed: number) =>
                  chartRef_bpm.current?.changeSpeed(newSpeed)
                }
              />
            </BaseChart.footer>
          </BaseChart>
        </div>

        <div>
          <BaseChart>
            <BaseChart.header isBtn={false} title={'HeatMap'} />
            <BaseChart.content>
              <div className='flex flex-row gap-5'>
                <MagneticFieldMap isBlur={true} />
                <MagneticFieldMap isBlur={false} />
              </div>
            </BaseChart.content>
          </BaseChart>
        </div>

        <div>
          <BaseChart>
            <BaseChart.header isBtn={false} title={'Polar graph'} />
            <BaseChart.content>
              <PolarScatterChart />
            </BaseChart.content>
          </BaseChart>
        </div>

        <div>
          <BaseChart>
            <BaseChart.header isBtn={false} title={'magnetic arrow'} />
            <BaseChart.content>
              <MagneticArrowFieldMap />
            </BaseChart.content>
          </BaseChart>
        </div>
      </div>
    </div>
  );
}

export default ProtoTypeChart;
