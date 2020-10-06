import {Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsValues} from '../../store/datamodels/types';
import {ChartjsData} from '../../store/datamodels/Chartjs';
import {Interval} from './types';
import BarChart from '../../components/chartjs/BarChart';
import {RootState} from '../../store/index';

const useStyles = makeStyles((theme) => ({
   wrapper: {
      marginTop: 5,
      marginBottom: 15,
   },
   content: {
      textAlign: 'center',
   },
}));

export type Props = {
   title: string;
   color: string;
   data: ChartjsValues[];
};

export const ChartjsBarChartContainer: React.FC<Props> = ({title, color, data}: Props): ReactElement => {
   const classes = useStyles();
   const {WEEK, MONTH, YEAR} = Interval;

   const [period, setPeriod] = useState<Interval>(YEAR);
   const [chartData, setChartData] = useState<ChartjsData>({labels: [], data: [], counter: 0});

   const lastWeek = useSelector<RootState, ChartjsData>(
      (state) => state.chartjs[data[0]] as ChartjsData
   );

   const lastMonth = useSelector<RootState, ChartjsData>(
      (state) => state.chartjs[data[1]] as ChartjsData
   );

   const lastYear = useSelector<RootState, ChartjsData>(
      (state) => state.chartjs[data[2]] as ChartjsData
   );

   const handleChangeInterval = (interval: Interval): void => {
      setPeriod(interval);

      if (interval === WEEK) {
         setChartData(lastWeek);
      } else if (interval === MONTH) {
         setChartData(lastMonth);
      } else {
         setChartData(lastYear);
      }
   };

   useEffect(() => {
      setChartData(lastYear);
   }, [lastYear]);

   return (
      <Card className={classes.wrapper}>
         <CardContent className={classes.content}>
            <BarChart
               updateInterval={handleChangeInterval}
               labels={chartData.labels}
               label={title}
               backgroundColor={color}
               borderColor={color}
               borderWidth={3}
               hoverBackgroundColor={color}
               hoverBorderColor={color}
               data={chartData.data}
               counter={chartData.counter}
               currentInterval={period}
            />
         </CardContent>
      </Card>
   );
};
