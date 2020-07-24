import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMeetingsLastYear } from "../../redux/actions/MeetingActions";
import LineChart from "../../components/recharts/LineChart";
import { RootState } from "../../redux/store";

export const MeetingTotalLineChartContainer: React.FC = (): ReactElement => {
  const data: any = useSelector<RootState, any>(
    (state) => state.meetingStats.meetingsLastYear
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeetingsLastYear());
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
        stroke="#2196f3"
      />
    </div>
  );
};
