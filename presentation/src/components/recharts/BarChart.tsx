import { BarChart as BChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
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
        width: 485,
        left: -200,
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
            <div className={classes.title}>
                <p>{title}</p>
            </div>
            {data.length === 0 ? (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ) : (
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
            )}
        </>
    );
};

export default BarChart;
