import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTotalMeetings } from "../../redux/actions/MeetingActions";
import { getCurrentTime } from "../../util/Date";
import KPICard from "../../components/kpi/KPICard";
import { RootState } from "../../redux/store";

export const MeetingTotalKPIContainer: React.FC = (): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const totalMeetings: number = useSelector<RootState, number>(
    (state) => state.meetingStats.meetingsTotal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalMeetings());
    setLastUpdate(getCurrentTime());
  }, []);

  return (
    <KPICard
      bigIcon="pe-7s-graph1 text-danger"
      statsText="Total Meetings"
      statsValue={totalMeetings}
      statsIcon="fa fa-refresh"
      statsIconText={`Last Update: ${lastUpdate}`}
    />
  );
};
