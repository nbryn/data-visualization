import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentTime } from "../util/Date";
import KPICard from "../components/kpi/KPICard";
import { RootState } from "../redux/store";

type Props = {
  title: string;
  fetchData: Function;
  statsType: string;
  total: string;
  icon: string;
};

const KPIContainer: React.FC<Props> = ({
  title,
  fetchData,
  statsType,
  total,
  icon,
}: Props): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  let data: any = useSelector<RootState, number>(
    (state) => state[statsType][total]
  );

  const dispatch = useDispatch();

  if (data['shareTotal']) data = data['shareTotal'];

  useEffect(() => {
    dispatch(fetchData());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon={icon}
      statsText={title}
      statsValue={data}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};

export default KPIContainer;