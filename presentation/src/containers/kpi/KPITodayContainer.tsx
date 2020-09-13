import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getCurrentTime} from '../../util/Date';
import KPICard from '../../components/kpi/KPICard';
import {RootState} from '../../store/index';

type Props = {
   statsType: string;
   countData: string;
   dateData: string;
   icon: string;
};

export const KPITodayContainer: React.FC<Props> = ({statsType, countData, dateData, icon}: Props): ReactElement => {
   const [lastUpdate, setLastUpdate] = useState<string>('');
   const count: any = useSelector<RootState, number>((state) => state[statsType][countData]);

   const date: string = useSelector<RootState, string>((state) => state[statsType][dateData]);

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
