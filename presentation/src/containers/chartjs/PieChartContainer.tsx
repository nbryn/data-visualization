import {Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsValues} from '../../store/datamodels/types';
import {ChartjsPieData} from '../../store/datamodels/Chartjs';
import PieChart from '../../components/chartjs/PieChart';
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
   title: string;
   dataType: ChartjsValues;
   backgroundColor: string[];
   hoverBackgroundColor: string[];
};

export const ChartjsPieChartContainer: React.FC<Props> = ({
   title,
   dataType,
   backgroundColor,
   hoverBackgroundColor,
}: Props): ReactElement => {
   const classes = useStyles();

   const {data, labels}: ChartjsPieData = useSelector<RootState, ChartjsPieData>(
      (state) => state.chartjs[dataType] as ChartjsPieData
   );

   return (
      <Card className={classes.wrapper}>
         <CardContent className={classes.content}>
            <PieChart
               title={title}
               data={data}
               labels={labels}
               backgroundColor={backgroundColor}
               hoverBackgroundColor={hoverBackgroundColor}
            />
         </CardContent>
      </Card>
   );
};
