import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../../components/recharts/BarChart";
import { fetchGroupsLastMonth } from "../../redux/actions/GroupActions";
import { RootState } from "../../redux/store";

export const GroupLastMonthBarChartContainer: React.FC = (): ReactElement => {
  const groupsLastMonth: any = useSelector<RootState, any>(
    (state) => state.groupStats.groupsLastMonth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupsLastMonth());
  });

  const yLabelConfig = {
    value: "Groups",
    angle: -90,
    position: "insideLeft",
  };
  const xLabelConfig = { value: "Day", position: "center", dy: 10 };

  return (
    <div className="card-circle card-stats">
      <BarChart
        title="Groups Last Month"
        data={groupsLastMonth}
        yLabel={yLabelConfig}
        xLabel={xLabelConfig}
        color="#228b22"
      />
    </div>
  );
};
