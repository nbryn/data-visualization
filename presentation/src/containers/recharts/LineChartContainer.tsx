import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LineChart from '../../components/recharts/LineChart';
import { RootState } from '../../redux/store';

type Props = {
  title: string;
  fetchData: Function;
  statsType: string;
  dataType: string;
  xLabel: string;
  yLabel: string;
  color: string;
};

export const LineChartContainer: React.FC<Props> = ({
  title,
  fetchData,
  statsType,
  dataType,
  xLabel,
  yLabel,
  color
}: Props): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state[statsType][dataType]
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const yLabelConfig = {
    value: yLabel,
    angle: -90,
    position: 'insideLeft'
  };
  const xLabelConfig = { value: xLabel, position: 'center', dy: 10 };

  return (
    <div className="card-graph card-stats">
      <LineChart
        title={title}
        data={data}
        xLabel={xLabelConfig}
        yLabel={yLabelConfig}
        stroke={color}
      />
    </div>
  );
};
