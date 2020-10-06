import {Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsValues} from '../../store/datamodels/types';
import {ChartjsData} from '../../store/datamodels/Chartjs';
import MixedChart from '../../components/chartjs/MixedChart';
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

type Props = {
   firstDataType: ChartjsValues;
   firstChartTitle: string;
   secondDataType: ChartjsValues;
   secondChartTitle: string;
};

export const ChartjsMixedChartContainer: React.FC<Props> = ({
   firstDataType,
   firstChartTitle,
   secondDataType,
   secondChartTitle,
}: Props): ReactElement => {
   const classes = useStyles();

   const firstChartData: ChartjsData = useSelector<RootState, ChartjsData>(
      (state) => state.chartjs[firstDataType] as ChartjsData
   );
   const secondChartData: ChartjsData = useSelector<RootState, ChartjsData>(
      (state) => state.chartjs[secondDataType] as ChartjsData
   );

   return (
      <Card className={classes.wrapper}>
         <CardContent className={classes.content}>
            <MixedChart
               labels={firstChartData.labels}
               firstChart={{
                  label: firstChartTitle,
                  type: 'line',
                  data: firstChartData.data,
                  fill: false,
                  borderColor: '#008000',
                  backgroundColor: '#008000',
                  pointBorderColor: '#008000',
                  pointBackgroundColor: '#008000',
                  pointHoverBackgroundColor: '#008000',
                  pointHoverBorderColor: '#008000',
               }}
               secondChart={{
                  label: secondChartTitle,
                  type: 'line',
                  data: secondChartData.data,
                  fill: false,
                  backgroundColor: '#0000ff',
                  borderColor: '#ff0000',
                  pointBorderColor: '#ff0000',
                  pointBackgroundColor: '#ff0000',
                  pointHoverBackgroundColor: '#ff0000',
                  pointHoverBorderColor: '#ff0000',
               }}
            />
         </CardContent>
      </Card>
   );
};
