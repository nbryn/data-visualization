import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTotalGroups } from "../../redux/actions/GroupActions";
import { getCurrentTime } from "../../util/Date";
import KPICard from "../../components/kpi/KPICard";
import { RootState } from "../../redux/store";

export const GroupTotalKPIContainer: React.FC = (): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const totalGroups: number = useSelector<RootState, number>(
    (state) => state.groupStats.groupsTotal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalGroups());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon="pe-7s-users text-info"
      statsText="Total Groups"
      statsValue={totalGroups}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};

