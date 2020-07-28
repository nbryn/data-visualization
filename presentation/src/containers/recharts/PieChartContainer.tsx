import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

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
  const data: any = useSelector<RootState, any>(
    (state) => state[statsType][dataType]
  );

  return (
    <div className="card-circle card-stats">
      <PieChart title={title} data={data} colors={colors} />
    </div>
  );
};
