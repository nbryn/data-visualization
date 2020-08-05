import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import {ChartData} from '../../store/datamodels/General';
import PieChart from '../../components/recharts/PieChart';
import { RootState } from '../../store/index';

type Props = {
  title: string;
  statsType: string;
  dataType: string;
  colors: string[];
};

export const PieChartContainer: React.FC<Props> = ({
  title,
  statsType,
  dataType,
  colors
}: Props): ReactElement => {
  const data: ChartData[] = useSelector<RootState, ChartData[]>(
    (state) => state[statsType][dataType]
  );

  return (
    <div className="card-circle card-stats">
      <PieChart title={title} data={data} colors={colors} />
    </div>
  );
};
