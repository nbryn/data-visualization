import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChartjsData } from '../../store/datamodels/Chartjs';
import { Interval, resolveInterval } from './interval';
import BarChart from '../../components/chartjs/BarChart';
import { RootState } from '../../store/index';

type DataType = string;

export type Props = {
    title: string;
    dataTypes: DataType[];
}

export const ChartjsBarChartContainer: React.FC<Props> = ({title, dataTypes}: Props): ReactElement => {
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
        <Card>
            {loading ? (
                <CircularProgress />
            ) : (
                <CardContent>
                    <BarChart
                        updateInterval={handleChangeInterval}
                        labels={chartData.labels}
                        label={title}
                        backgroundColor="rgba(207,0,15,1)"
                        borderColor="rgba(207,0,15,1)"
                        borderWidth={3}
                        hoverBackgroundColor="rgba(207,0,15,1)"
                        hoverBorderColor="rgba(207,0,15,1)"
                        data={chartData.data}
                        counter={chartData.counter}
                        currentInterval={period}
                    />
                </CardContent>
            )}
        </Card>
    );
};

