import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroupsLastYear } from "../../redux/actions/GroupActions";
import LineChart from "../../components/recharts/LineChart";
import { RootState } from "../../redux/store";

export const GroupTotalLineChartContainer: React.FC = (): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state.groupStats.groupsLastYear
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupsLastYear());
  }, []);

  const yLabelConfig = {
    value: "Groups",
    angle: -90,
    position: "insideLeft",
  };
  const xLabelConfig = { value: "Months", position: "center", dy: 10 };

  return (
    <div className="card-graph card-stats">
      <LineChart
        title="Total Groups"
        data={data}
        xLabel={xLabelConfig}
        yLabel={yLabelConfig}
        stroke="#228b22"
      />
    </div>
  );
};
