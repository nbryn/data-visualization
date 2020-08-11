import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChartjsData } from '../../store/datamodels/Chartjs';
import { Interval, resolveInterval } from './interval';
import LineChart from '../../components/chartjs/LineChart';
import { RootState } from '../../store/index';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: 5,
        marginBottom: 10,
    },
    spinner: {
        margin: 125,
        marginLeft: 200,
    },
}));

type Props = {
    title: string;
    dataTypes: string[];
};

export const ChartjsLineChartContainer: React.FC<Props> = ({
    title,
    dataTypes,
}: Props): ReactElement => {
    const classes = useStyles();
    const { WEEK, MONTH, YEAR } = Interval;

    const [loading, setLoading] = useState<boolean>(true);
    const [period, setPeriod] = useState<Interval>(YEAR);

    const [chartData, setChartData] = useState<ChartjsData>({
        labels: [],
        counter: 0,
        data: [],
    });

    const usersLastWeek = useSelector<RootState, ChartjsData>(
        (state) => state.chartjs[dataTypes[0]]
    );

    const usersLastMonth = useSelector<RootState, ChartjsData>(
        (state) => state.chartjs[dataTypes[1]]
    );

    const usersLastYear = useSelector<RootState, ChartjsData>(
        (state) => state.chartjs[dataTypes[2]]
    );

    const handleChangeInterval = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const interval: Interval = resolveInterval(event.target.value);
        setLoading(true);

        if (interval === WEEK) {
            updateData(WEEK, usersLastWeek);
        } else if (interval === MONTH) {
            updateData(MONTH, usersLastMonth);
        } else {
            updateData(YEAR, usersLastYear);
        }

        setLoading(false);
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

        setLoading(false);
    }, [usersLastYear, YEAR]);

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                {loading ? (
                    <CircularProgress className={classes.spinner}/>
                ) : (
                    <LineChart
                        updateInterval={handleChangeInterval}
                        labels={chartData.labels}
                        label={title}
                        fill={false}
                        backgroundColor="rgba(83, 51, 237, 1)"
                        borderColor="rgba(83, 51, 237, 1)"
                        pointBorderColor="rgba(83, 51, 237, 1)"
                        pointBackgroundColor="rgba(83, 51, 237, 1)"
                        pointHoverBackgroundColor="rgba(83, 51, 237, 1)"
                        pointHoverBorderColor="rgba(83, 51, 237, 1)"
                        pointBorderWidth={3}
                        pointHoverRadius={2}
                        data={chartData.data}
                        counter={chartData.counter}
                        currentInterval={period}
                    />
                )}
            </CardContent>
        </Card>
    );
};
