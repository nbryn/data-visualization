import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as UserThunks from '../../thunks/UserThunks';

import { ChartData } from './types';

import { Interval, resolveInterval } from './interval';
import LineChart from '../../components/chartjs/LineChart';
import { RootState } from '../../store/index';

const UserLineChartContainer: React.FC = (): ReactElement => {
  const { WEEK, MONTH, YEAR } = Interval;

  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Interval>(YEAR);

  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    counter: 0,
    data: []
  });

  const usersLastWeek = useSelector<RootState, any>(
    (state) => state.users.chartjsLastWeek
  );

  const usersLastMonth = useSelector<RootState, any>(
    (state) => state.users.chartjsLastMonth
  );

  const usersLastYear = useSelector<RootState, any>(
    (state) => state.users.chartjsLastYear
  );

  console.log(usersLastWeek);

  const dispatch = useDispatch();

  const handleChangeInterval = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const interval: Interval = resolveInterval(event.target.value);
    setLoading(true);

    if (interval === WEEK) {
      updateData(WEEK, usersLastWeek);
    } else if (interval === MONTH) {
      updateData(MONTH, usersLastMonth);
    } else {
      updateData(YEAR, usersLastYear);
    }
    setLoading(false);
  };

  const updateData = (interval: Interval, chartData: any): void => {
    setPeriod(interval);
    setLabels(chartData.labels);
    setChartData({ counter: chartData.counter, data: chartData.data });
  };

  useEffect(() => {
    dispatch(UserThunks.fetchUsersLastMonthChartjs());
    dispatch(UserThunks.fetchUsersLastYearChartjs());
  }, []);

  useEffect(() => {
    updateData(YEAR, usersLastYear);

    setLoading(false);
  }, [usersLastYear, YEAR]);

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

export default UserLineChartContainer;
