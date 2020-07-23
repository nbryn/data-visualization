import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTotalShares } from "../../redux/actions/FinanceActions";
import { getCurrentTime } from "../../util/Date";
import KPICard from "../../components/kpi/KPICard";
import { RootState } from "../../redux/store";

export const TotalSharesKPIContainer: React.FC = (): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const totalShares: number = useSelector<RootState, number>(
    (state) => state.financeStats.sharesTotal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalShares());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon="pe-7s-wallet text-success"
      statsText="Total Shares"
      statsValue={totalShares}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};
