import {BarChart as BChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';

import {ChartProps} from './types';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: -50,
        marginBottom: 10,
    },
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

const BarChart: React.FC<ChartProps> = ({
    title,
    data,
    xLabelConfig,
    yLabelConfig,
    strokeColor,
    height,
}: ChartProps): ReactElement => {
    const classes = useStyles();
    return (
        <div>
            <p className={classes.title}>{title}</p>

            {data.length === 0 ? (
                <CircularProgress className={classes.spinner} />
            ) : (
                <ResponsiveContainer width="99%" height={height || '99%'} aspect={1.6}>
                    <BChart
                        test-id="barChart"
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis label={xLabelConfig} dataKey="name" />
                        <YAxis label={yLabelConfig} />
                        <Tooltip />
                        <Bar maxBarSize={22} dataKey="value" fill={strokeColor} />
                    </BChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default BarChart;
