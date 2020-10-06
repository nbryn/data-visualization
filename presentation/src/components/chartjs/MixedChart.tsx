import {Bar} from 'react-chartjs-2';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {ReactElement} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   title: {
      marginTop: -10,
      marginBottom: 58,
      width: '100%',
      textAlign: 'center',
   },
}));

export type ChartProps = {
   label: string;
   type: string;
   data: number[];
   fill: boolean;
   borderColor: string;
   backgroundColor: string;
   pointBorderColor: string;
   pointBackgroundColor: string;
   pointHoverBackgroundColor: string;
   pointHoverBorderColor: string;
};

type Props = {
   labels: string[];
   firstChart: ChartProps;
   secondChart: ChartProps;
};

const MixedChart: React.FC<Props> = ({firstChart, secondChart, labels}: Props): ReactElement => {
   const classes = useStyles();
   const data = {
      datasets: [
         {
            label: firstChart.label,
            type: firstChart.type,
            data: firstChart.data,
            fill: firstChart.fill,
            borderColor: firstChart.borderColor,
            backgroundColor: firstChart.backgroundColor,
            pointBorderColor: firstChart.pointBackgroundColor,
            pointBackgroundColor: firstChart.pointBackgroundColor,
            pointHoverBackgroundColor: firstChart.pointHoverBackgroundColor,
            pointHoverBorderColor: firstChart.pointHoverBorderColor,
            yAxisID: 'y-axis-1',
         },
         {
            label: secondChart.label,
            type: secondChart.type,
            data: secondChart.data,
            fill: secondChart.fill,
            borderColor: secondChart.borderColor,
            backgroundColor: secondChart.backgroundColor,
            pointBorderColor: secondChart.pointBorderColor,
            pointBackgroundColor: secondChart.pointBackgroundColor,
            pointHoverBackgroundColor: secondChart.pointHoverBackgroundColor,
            pointHoverBorderColor: secondChart.pointHoverBorderColor,
            yAxisID: 'y-axis-2',
         },
      ],
   };
   const options = {
      responsive: true,
      maintainAspectRatio: true,
      labels: labels,
      tooltips: {
         mode: 'label',
      },
      elements: {
         line: {
            fill: false,
         },
      },
      scales: {
         xAxes: [
            {
               display: true,
               gridLines: {
                  display: false,
               },

               labels: labels,
            },
         ],
         yAxes: [
            {
               type: 'linear',
               display: true,
               position: 'left',
               id: 'y-axis-1',
               gridLines: {
                  display: false,
               },
               labels: {
                  show: true,
               },
            },
            {
               type: 'linear',
               display: true,
               position: 'right',
               id: 'y-axis-2',
               gridLines: {
                  display: false,
               },
               labels: {
                  show: true,
               },
            },
         ],
      },
   };

   return (
      <>
         {firstChart.data.length === 0 && <CircularProgress />}
         {firstChart.data.length > 0 && (
            <>
               <div className={classes.title}>
                  <h5>
                     {firstChart.label} and {secondChart.label}
                  </h5>
               </div>
               <Bar data={data} options={options} />
            </>
         )}
      </>
   );
};

export default MixedChart;
