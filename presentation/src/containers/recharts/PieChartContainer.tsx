import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PieChart from '../../components/recharts/PieChart';
import { RootState } from '../../redux/store';

type Props = {
  title: string;
  fetchData: Function;
  statsType: string;
  dataType: string;
  colors: string[];
};

export const PieChartContainer: React.FC<Props> = ({
  title,
  fetchData,
  statsType,
  dataType,
  colors
}: Props): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state[statsType][dataType]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="card-circle card-stats">
      <PieChart title={title} data={data} colors={colors} />
    </div>
  );
};
