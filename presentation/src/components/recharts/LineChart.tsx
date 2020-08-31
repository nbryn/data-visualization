import {CartesianGrid, Line, LineChart as Chart, ResponsiveContainer, Tooltip, YAxis, XAxis} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';

import {ChartProps} from './types';

const useStyles = makeStyles((theme) => ({
   title: {
      marginTop: -10,
      width: '100%',
      textAlign: 'center',
   },
   spinner: {
      margin: 125,
      marginLeft: 200,
   },
}));

const LineChart: React.FC<ChartProps> = ({
   title,
   data,
   yLabelConfig,
   xLabelConfig,
   strokeColor,
   height,
}: ChartProps): ReactElement => {
   const classes = useStyles();
   return (
      <>
         <p className={classes.title}>{title}</p>

         {data.length === 0 ? (
            <CircularProgress className={classes.spinner} />
         ) : (
            <ResponsiveContainer width="99%" height={height || '99%'} aspect={1.6}>
               <Chart width={450} height={300} data={data}>
                  <XAxis label={xLabelConfig} dataKey="name" />
                  <YAxis label={yLabelConfig} dataKey="value" />
                  <Tooltip />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line strokeWidth={1} type="monotone" dataKey="value" stroke={strokeColor} />
               </Chart>
            </ResponsiveContainer>
         )}
      </>
   );
};

export default LineChart;
