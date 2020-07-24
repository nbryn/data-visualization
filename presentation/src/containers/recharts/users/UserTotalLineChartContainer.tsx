import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersLastYear } from "../../../redux/actions/UserActions";
import LineChart from "../../../components/recharts/LineChart";
import { RootState } from "../../../redux/store";

export const UserTotalLineChartContainer: React.FC = (): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state.userStats.usersLastYear
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersLastYear(false));
  }, []);

  const yLabelConfig = {
    value: "Users",
    angle: -90,
    position: "insideLeft",
  };
  const xLabelConfig = { value: "Months", position: "center", dy: 10 };

  return (
    <div className="card-graph card-stats">
      <LineChart
        title="Total Users"
        data={data}
        xLabel={xLabelConfig}
        yLabel={yLabelConfig}
        stroke="#ff0000"
      />
    </div>
  );
};
