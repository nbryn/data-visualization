import {
    BarChart as BChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { ChartData } from '../../store/datamodels/General';

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

type Props = {
    title: string;
    data: ChartData[];
    xLabelConfig: any;
    yLabelConfig: any;
    color: string;
};

const BarChart: React.FC<Props> = ({
    title,
    data,
    xLabelConfig,
    yLabelConfig,
    color,
}: Props): ReactElement => {
    const classes = useStyles();
    return (
        <>
            <p className={classes.title}>{title}</p>

            {data.length === 0 ? (
                <CircularProgress className={classes.spinner} />
            ) : (
                <ResponsiveContainer width="99%" aspect={1.6}>
                    <BChart
                        width={450}
                        height={300}
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
                        <Bar dataKey="value" fill={color} />
                    </BChart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default BarChart;
