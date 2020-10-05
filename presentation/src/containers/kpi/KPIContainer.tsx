import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Data} from '../../store/datamodels/types';
import {getCurrentTime} from '../../util/Date';
import KPICard from '../../components/kpi/KPICard';
import {RootState} from '../../store/index';

type Props = {
   title: string;
   data: Data;
   icon: string;
};

export const KPIContainer: React.FC<Props> = ({title, data, icon}: Props): ReactElement => {
   const [lastUpdate, setLastUpdate] = useState<string>('');
   const count: number = useSelector<RootState, number>((state) => state[data.model][data.modelData]);

   useEffect(() => {
      setLastUpdate(getCurrentTime());
   }, []);

   return (
      <KPICard
         valueIcon={icon}
         text={title}
         value={count}
         updateIcon="fa fa-refresh"
         updateIconText={`Last Update: ${lastUpdate}`}
      />
   );
};
