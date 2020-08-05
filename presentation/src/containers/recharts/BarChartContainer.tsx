import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import BarChart from '../../components/recharts/BarChart';
import {ChartData} from '../../store/datamodels/General';
import { RootState } from '../../store/index';

type Props = {
  title: string;
  statsType: string;
  dataType: string;
  xLabel: string;
  yLabel: string;
  color: string;
  css?: string;
};

export const BarChartContainer: React.FC<Props> = ({
  title,
  statsType,
  dataType,
  xLabel,
  yLabel,
  color,
  css
}: Props): ReactElement => {
  const data: ChartData[] = useSelector<RootState, ChartData[]>(
    (state) => state[statsType][dataType]
  );

  const yLabelConfig = {
    value: yLabel,
    angle: -90,
    position: 'insideLeft'
  };
  const xLabelConfig = { value: xLabel, position: 'center', dy: 10 };

  return (
    <div className={css || 'card-circle card-stats'}>
      <BarChart
        title={title}
        data={data}
        yLabelConfig={yLabelConfig}
        xLabelConfig={xLabelConfig}
        color={color}
      />
    </div>
  );
};
