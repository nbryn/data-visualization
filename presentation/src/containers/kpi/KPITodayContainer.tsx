import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Data} from '../../store/datamodels/types';
import {getCurrentTime} from '../../util/Date';
import KPICard from '../../components/kpi/KPICard';
import {RootState} from '../../store/index';

type Props = {
   data: Data;
   dateData: string;
   icon: string;
};

export const KPITodayContainer: React.FC<Props> = ({data, dateData, icon}: Props): ReactElement => {
   const [lastUpdate, setLastUpdate] = useState<string>('');
   const count: number = useSelector<RootState, number>((state) => state[data.model][data.modelData]);

   const date: string = useSelector<RootState, string>((state) => state[data.model][dateData]);

   useEffect(() => {
      setLastUpdate(getCurrentTime());
   }, []);

   return (
      <KPICard
         valueIcon={icon}
         text={`Today: ${date}`}
         value={count}
         updateIcon="fa fa-refresh"
         updateIconText={`Last Update: ${lastUpdate}`}
      />
   );
};
