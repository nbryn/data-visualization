import {Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';

import {Data} from '../../store/datamodels/types';
import {ChartData} from '../../store/datamodels/General';
import PieChart from '../../components/recharts/PieChart';
import {RootState} from '../../store/index';

const useStyles = makeStyles((theme) => ({
   wrapper: {
      marginTop: 10,
      marginBottom: 15,
   },
}));

type Props = {
   title: string;
   dataType: Data;
   colors: string[];
};

export const PieChartContainer: React.FC<Props> = ({title, dataType, colors}: Props): ReactElement => {
   const classes = useStyles();

   const data: ChartData[] = useSelector<RootState, ChartData[]>(
      (state) => state[dataType.model][dataType.modelData]
   );

   return (
      <div className={classes.wrapper}>
         <Card>
            <CardContent>
               <PieChart title={title} data={data} colors={colors} />
            </CardContent>
         </Card>
      </div>
   );
};
