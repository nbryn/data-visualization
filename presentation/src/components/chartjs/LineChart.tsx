import CircularProgress from '@material-ui/core/CircularProgress';
import {Line} from 'react-chartjs-2';
import {makeStyles} from '@material-ui/core/styles';
import {MenuItem} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import {LineChart as Chart, LineChartDataset} from './types';
import {Interval, resolveInterval} from '../../containers/chartjs/types';
import TextField from '../form/TextField';

interface Props extends LineChartDataset {
   labels: string[];
   currentInterval: Interval;
   updateInterval: (interval: Interval) => void;
}

const useStyles = makeStyles((theme) => ({
   dropdown: {
      width: 100,
      float: 'right',
      marginTop: theme.spacing(-1),
   },
   counter: {
      marginTop: -10,
      marginBottom: 45,
      width: '20%',
      float: 'left',
   },
}));

const LineChart: React.FC<Props> = (props: Props) => {
   const classes = useStyles();
   const [chart, setChart] = useState<Chart>({
      labels: props.labels,
      datasets: [
         {
            label: props.label,
            fill: props.fill,
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            pointBorderColor: props.pointBorderColor,
            pointBackgroundColor: props.pointBackgroundColor,
            pointBorderWidth: props.pointBorderWidth,
            pointHoverRadius: props.pointHoverRadius,
            pointHoverBackgroundColor: props.pointHoverBackgroundColor,
            pointHoverBorderColor: props.pointHoverBorderColor,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.data,
            counter: props.counter,
         },
      ],
   });

   const {WEEK, MONTH, YEAR} = Interval;

   useEffect(() => {
      setChart({
         labels: props.labels,
         datasets: [{...chart.datasets[0], data: props.data}],
      });
   }, [props.data]);

   return (
      <>
         {props.data.length === 0 && <CircularProgress />}
         {props.data.length > 0 && (
            <>
               <div className={classes.counter}>
                  <h5>
                     Last {props.currentInterval}: {props.counter}
                  </h5>
               </div>

               <div className={classes.dropdown}>
                  <TextField
                     id="interval"
                     label="Interval"
                     size="small"
                     value={props.currentInterval}
                     select
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        props.updateInterval(resolveInterval(event.target.value))
                     }
                  >
                     <MenuItem
                        key="Week"
                        value="Week"
                        disabled={props.currentInterval === WEEK ? true : false}
                     >
                        Last Week
                     </MenuItem>
                     <MenuItem
                        key="Month"
                        value="Month"
                        disabled={props.currentInterval === MONTH ? true : false}
                     >
                        Last Month
                     </MenuItem>
                     <MenuItem
                        key="Year"
                        value="Year"
                        disabled={props.currentInterval === YEAR ? true : false}
                     >
                        Last Year
                     </MenuItem>
                  </TextField>
               </div>
               <Line data={chart} />
            </>
         )}
      </>
   );
};

export default LineChart;
