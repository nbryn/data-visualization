import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getCurrentTime} from '../../util/Date';
import KPICard from '../../components/kpi/KPICard';
import {RootState} from '../../store/index';

type Props = {
   title: string;
   fetchData?: Function;
   statsType: string;
   total: string;
   icon: string;
};

export const KPIContainer: React.FC<Props> = ({title, fetchData, statsType, total, icon}: Props): ReactElement => {
   const [lastUpdate, setLastUpdate] = useState<string>('');
   let data: any = useSelector<RootState, number>((state) => state[statsType][total]);

   const dispatch = useDispatch();

   useEffect(() => {
      if (fetchData) dispatch(fetchData());
      setLastUpdate(getCurrentTime());
   }, []);

   return (
      <KPICard
         valueIcon={icon}
         text={title}
         value={data}
         updateIcon="fa fa-refresh"
         updateIconText={`Last Update: ${lastUpdate}`}
      />
   );
};
