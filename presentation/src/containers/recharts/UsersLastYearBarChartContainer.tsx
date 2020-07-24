import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../../components/recharts/BarChart";
import { fetchUsersLastYear } from "../../redux/actions/UserActions";
import { RootState } from "../../redux/store";

export const UserLastYearBarChartContainer: React.FC = (): ReactElement => {
  const usersLastYear: any = useSelector<RootState, any>(
    (state) => state.userStats.usersLastYear
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersLastYear(false));
  });

  const yLabelConfig = {
    value: "Users",
    angle: -90,
    position: "insideLeft",
  };
  const xLabelConfig = { value: "Months", position: "center", dy: 10 };

  return (
    <div className="card-circle card-stats">
      <BarChart
        title="Users Last Year"
        data={usersLastYear}
        yLabel={yLabelConfig}
        xLabel={xLabelConfig}
        color="#ff0000"
      />
    </div>
  );
};