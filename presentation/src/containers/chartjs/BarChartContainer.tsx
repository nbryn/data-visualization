import {Card, CardContent} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsData} from '../../store/datamodels/Chartjs';
import {Interval, resolveInterval} from './interval';
import BarChart from '../../components/chartjs/BarChart';
import {RootState} from '../../store/index';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: 5,
        marginBottom: 15,
    },
    spinner: {
        margin: 125,
        marginLeft: 200,
    },
}));

export type Props = {
    title: string;
    color: string;
    dataTypes: string[];
};

export const ChartjsBarChartContainer: React.FC<Props> = ({title, color, dataTypes}: Props): ReactElement => {
    const classes = useStyles();
    const {WEEK, MONTH, YEAR} = Interval;

    const [period, setPeriod] = useState<Interval>(YEAR);
    const [chartData, setChartData] = useState<ChartjsData>({
        labels: [],
        counter: 0,
        data: [],
    });

    const usersLastWeek: ChartjsData = useSelector<RootState, ChartjsData>((state) => state.chartjs[dataTypes[0]]);

    const usersLastMonth: ChartjsData = useSelector<RootState, ChartjsData>((state) => state.chartjs[dataTypes[1]]);

    const usersLastYear: ChartjsData = useSelector<RootState, ChartjsData>((state) => state.chartjs[dataTypes[2]]);

    const handleChangeInterval = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const interval: Interval = resolveInterval(event.target.value);

        if (interval === WEEK) {
            updateData(WEEK, usersLastWeek);
        } else if (interval === MONTH) {
            updateData(MONTH, usersLastMonth);
        } else {
            updateData(YEAR, usersLastYear);
        }
    };

    const updateData = (interval: Interval, chartData: ChartjsData): void => {
        setPeriod(interval);
        setChartData({
            counter: chartData.counter,
            data: chartData.data,
            labels: chartData.labels,
        });
    };

    useEffect(() => {
        updateData(YEAR, usersLastYear);
    }, [usersLastYear, YEAR]);

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                {usersLastYear.data.length === 0 ? (
                    <CircularProgress className={classes.spinner} />
                ) : (
                    <BarChart
                        updateInterval={handleChangeInterval}
                        labels={chartData.labels}
                        label={title}
                        backgroundColor={color}
                        borderColor={color}
                        borderWidth={3}
                        hoverBackgroundColor={color}
                        hoverBorderColor={color}
                        data={chartData.data}
                        counter={chartData.counter}
                        currentInterval={period}
                    />
                )}
            </CardContent>
        </Card>
    );
};
