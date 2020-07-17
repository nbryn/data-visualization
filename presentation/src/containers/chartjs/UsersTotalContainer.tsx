import { Card, CardContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ChartData } from "./types";
import LineChart from "../../components/chartjs/LineChart";
import { RootState } from "../../redux/store";

const UsersTotalContainer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("Year");

  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    counter: 0,
    data: [],
  });

  const usersLastMonth = useSelector<RootState, any>(
    (state) => state.KPI.usersLastMonth
  );

  const usersLastYear = useSelector<RootState, any>(
    (state) => state.KPI.usersLastYear
  );

  const handleChangeInterval = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const interval: string = e.target.value;
    setLoading(true);
    if (interval === "Month") {
      setPeriod("Month");
    } else {
      setPeriod("Year");
    }
  };

  useEffect(() => {
    setLabels(period === "Year" ? usersLastYear.labels : usersLastMonth.labels);
    setChartData(
      period === "Year"
        ? {
            counter: usersLastYear.counter,
            data: usersLastYear.chartData,
          }
        : {
            counter: usersLastMonth.counter,
            data: usersLastMonth.chartData,
          }
    );
    setLoading(false);
  }, [period, usersLastYear, usersLastMonth]);

  return (
    <Card>
      {loading ? (
        <CircularProgress />
      ) : (
        <CardContent>
          <LineChart
            updateInterval={handleChangeInterval}
            labels={labels}
            label="Users"
            fill={false}
            backgroundColor="rgba(83, 51, 237, 1)"
            borderColor="rgba(83, 51, 237, 1)"
            pointBorderColor="rgba(83, 51, 237, 1)"
            pointBackgroundColor="rgba(83, 51, 237, 1)"
            pointHoverBackgroundColor="rgba(83, 51, 237, 1)"
            pointHoverBorderColor="rgba(83, 51, 237, 1)"
            pointBorderWidth={3}
            pointHoverRadius={2}
            data={chartData.data}
            counter={chartData.counter}
            currentInterval={period}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default UsersTotalContainer;
