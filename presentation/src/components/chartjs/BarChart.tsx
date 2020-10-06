import {Bar} from 'react-chartjs-2';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {MenuItem} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import {BarChart as Chart, BarChartDataset} from './types';
import {Interval, resolveInterval} from '../../containers/chartjs/types';
import TextField from '../form/TextField';

const useStyles = makeStyles((theme: any) => ({
   dropdown: {
      width: 100,
      float: 'right',
      marginTop: theme.spacing(-1),
   },
   counter: {
      marginTop: -10,
      marginBottom: 45,
      width: '40%',
      float: 'left',
   },
}));

interface Props extends BarChartDataset {
   labels: string[];
   currentInterval: Interval;
   updateInterval: (interval: Interval) => void;
}

const BarChart: React.FC<Props> = (props: Props) => {
   const classes = useStyles();
   const [chart, setChart] = useState<Chart>({
      labels: props.labels,
      datasets: [
         {
            label: props.label,
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            borderWidth: props.borderWidth,
            hoverBackgroundColor: props.hoverBackgroundColor,
            hoverBorderColor: props.hoverBorderColor,
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
               <Bar
                  data={chart}
                  options={{
                     responsive: true,
                     maintainAspectRatio: true,
                  }}
               />
            </>
         )}
      </>
   );
};

export default BarChart;
