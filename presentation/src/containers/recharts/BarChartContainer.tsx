import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BarChart from '../../components/recharts/BarChart';
import { fetchGroupsLastMonth } from '../../redux/actions/GroupActions';
import { RootState } from '../../redux/store';

type Props = {
  title: string;
  fetchData: Function;
  statsType: string;
  dataType: string;
  xLabel: string;
  yLabel: string;
  color: string;
  css?: string;
};

export const BarChartContainer: React.FC<Props> = ({
  title,
  fetchData,
  statsType,
  dataType,
  xLabel,
  yLabel,
  color,
  css
}: Props): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state[statsType][dataType]
  );

  console.log(data);

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
    <div className={css || "card-circle card-stats"}>
      <BarChart
        title={title}
        data={data}
        yLabel={yLabelConfig}
        xLabel={xLabelConfig}
        color={color}
      />
    </div>
  );
};
