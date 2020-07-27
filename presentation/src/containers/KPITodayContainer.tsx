import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentTime } from '../util/Date';
import KPICard from '../components/kpi/KPICard';
import { RootState } from '../redux/store';

type Props = {
  title: string;
  fetchData: Function;
  statsType: string;
  countData: string;
  dateData: string;
  icon: string;
};

const KPITodayContainer: React.FC<Props> = ({
  fetchData,
  statsType,
  countData,
  dateData,
  icon
}: Props): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  let count: any = useSelector<RootState, number>(
    (state) => state[statsType][countData]
  );

  let date: string = useSelector<RootState, string>(
    (state) => state[statsType][dateData]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon={icon}
      statsText={date}
      statsValue={count}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};

export default KPITodayContainer;