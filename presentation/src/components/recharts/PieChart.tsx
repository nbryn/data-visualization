import {Cell, PieChart as Chart, Pie, ResponsiveContainer} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';

import {ChartData} from '../../store/datamodels/General';

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
    colors: string[];
    height?: number;
};

const PieChart: React.FC<Props> = ({title, data, colors, height}: Props): ReactElement => {
    const classes = useStyles();

    const renderLabel = (entry: ChartData): string => entry.name;

    return (
        <>
            <p className={classes.title}>{title}</p>

            {data.length === 0 ? (
                <CircularProgress className={classes.spinner} />
            ) : (
                <ResponsiveContainer width="99%" height={height || '99%'} aspect={1.6}>
                    <Chart width={450} height={300}>
                        <Pie
                            // @ts-ignore
                            label={renderLabel}
                            dataKey="value"
                            nameKey="name"
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                        >
                            {data.map((entry: ChartData, index: number) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))}
                        </Pie>
                    </Chart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default PieChart;
