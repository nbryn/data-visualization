import {
    CartesianGrid,
    Line,
    LineChart as Chart,
    ResponsiveContainer,
    YAxis,
    XAxis,
} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { ChartData } from '../../store/datamodels/General';

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

type Props = {
    title: string;
    data: ChartData[];
    yLabelConfig: any;
    xLabelConfig: any;
    stroke: string;
};

const LineChart: React.FC<Props> = ({
    title,
    data,
    yLabelConfig,
    xLabelConfig,
    stroke,
}: Props): ReactElement => {
    const classes = useStyles();
    return (
        <>
            <p className={classes.title}>{title}</p>

            {data.length === 0 ? (
                <CircularProgress className={classes.spinner} />
            ) : (
                <ResponsiveContainer width='99%' aspect={1.6}>
                    <Chart width={450} height={300} data={data}>
                        <XAxis label={xLabelConfig} dataKey="name" />
                        <YAxis label={yLabelConfig} dataKey="value" />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line
                            strokeWidth={3}
                            type="monotone"
                            dataKey="value"
                            stroke={stroke}
                        />
                    </Chart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default LineChart;
