import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {fetchUserGenderStats} from "../../redux/actions/UserActions";
import PieChart from "../../components/recharts/PieChart";
import { RootState } from "../../redux/store";

export const UserGenderPieChartContainer: React.FC = (): ReactElement => {
  const genderStats: any = useSelector<RootState, any>(
    (state) => state.userStats.genderStats
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserGenderStats());
  }, []);

  return (
    <div className="card-circle card-stats">
      <PieChart
        title="Gender Distribution"
        data={genderStats}
        colors={["#1828E8", "#228b22"]}
      />
    </div>
  );
};
