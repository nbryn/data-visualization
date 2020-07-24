import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTotalUsers } from "../../redux/actions/UserActions";
import { getCurrentTime } from "../../util/Date";
import KPICard from "../../components/kpi/KPICard";
import { RootState } from "../../redux/store";

export const UserTotalKPIContainer: React.FC = (): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const totalUsers: number = useSelector<RootState, number>(
    (state) => state.userStats.usersTotal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalUsers());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon="pe-7s-user text-warning"
      statsText="Total Users"
      statsValue={totalUsers}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};
