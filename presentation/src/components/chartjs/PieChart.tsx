import {makeStyles} from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';
import React from 'react';

import {PieChart as Chart, PieChartDataset} from './types';

const useStyles = makeStyles((theme) => ({
   title: {
      marginTop: -10,
      marginBottom: 58,
      width: '100%',
      textAlign: 'center',
   },
}));
interface Props extends PieChartDataset {
   title: string;
   labels: string[];
}

const PieChart: React.FC<Props> = (props: Props) => {
   const classes = useStyles();
   const chart: Chart = {
      labels: props.labels,
      datasets: [
         {
            data: props.data,
            backgroundColor: props.backgroundColor,
            hoverBackgroundColor: props.hoverBackgroundColor,
         },
      ],
   };

   return (
      <>
         <div className={classes.title}>
            <h5>{props.title}</h5>
         </div>
         <Pie
            data={chart}
            options={{
               responsive: true,
               maintainAspectRatio: true,
            }}
         />
      </>
   );
};

export default PieChart;
