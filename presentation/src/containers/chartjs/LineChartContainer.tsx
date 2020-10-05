import {Card, CardContent} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsData} from '../../store/datamodels/types';
import {ChartjsData as ChartjsChartData} from '../../store/datamodels/Chartjs';
import {Interval, resolveInterval} from './types';
import LineChart from '../../components/chartjs/LineChart';
import {RootState} from '../../store/index';

const useStyles = makeStyles((theme) => ({
   wrapper: {
      marginTop: 5,
      marginBottom: 15,
   },
   spinner: {
      margin: 125,
      marginLeft: 200,
   },
}));

type Props = {
   title: string;
   data: ChartjsData[];
   color: string;
};

export const ChartjsLineChartContainer: React.FC<Props> = ({title, data, color}: Props): ReactElement => {
   const classes = useStyles();
   const {WEEK, MONTH, YEAR} = Interval;

   const [period, setPeriod] = useState<Interval>(YEAR);
   const [chartData, setChartData] = useState<ChartjsChartData>({
      labels: [],
      counter: 0,
      data: [],
   });

   const lastWeek = useSelector<RootState, ChartjsChartData>((state) => state.chartjs[data[0]]);

   const lastMonth = useSelector<RootState, ChartjsChartData>((state) => state.chartjs[data[1]]);

   const lastYear = useSelector<RootState, ChartjsChartData>((state) => state.chartjs[data[2]]);

   const handleChangeInterval = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const interval: Interval = resolveInterval(event.target.value);

      if (interval === WEEK) {
         updateData(WEEK, lastWeek);
      } else if (interval === MONTH) {
         updateData(MONTH, lastMonth);
      } else {
         updateData(YEAR, lastYear);
      }
   };

   const updateData = (interval: Interval, chartData: ChartjsChartData): void => {
      setPeriod(interval);

      setChartData({
         counter: chartData.counter,
         data: chartData.data,
         labels: chartData.labels,
      });
   };

   useEffect(() => {
      updateData(YEAR, lastYear);
   }, [lastYear, YEAR]);

   return (
      <Card className={classes.wrapper}>
         <CardContent>
            {chartData.data.length === 0 ? (
               <CircularProgress className={classes.spinner} />
            ) : (
               <LineChart
                  updateInterval={handleChangeInterval}
                  labels={chartData!.labels}
                  label={title}
                  fill={false}
                  backgroundColor={color}
                  borderColor={color}
                  pointBorderColor={color}
                  pointBackgroundColor={color}
                  pointHoverBackgroundColor={color}
                  pointHoverBorderColor={color}
                  pointBorderWidth={3}
                  pointHoverRadius={2}
                  data={chartData!.data}
                  counter={chartData!.counter}
                  currentInterval={period}
               />
            )}
         </CardContent>
      </Card>
   );
};
