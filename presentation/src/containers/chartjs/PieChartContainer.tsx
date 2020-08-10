import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ChartjsPieData } from '../../store/datamodels/Chartjs';
import PieChart from '../../components/chartjs/PieChart';
import { RootState } from '../../store/index';

type Props = {
    title: string;
    dataType: string;
    backgroundColor: string[];
    hoverBackgroundColor: string[];
};

export const ChartjsPieChartContainer: React.FC<Props> = ({
    title,
    dataType,
    backgroundColor,
    hoverBackgroundColor,
}: Props): ReactElement => {
    const { data, labels }: ChartjsPieData = useSelector<
        RootState,
        ChartjsPieData
    >((state) => state.chartjs[dataType]);

    return (
        <Card>
            {data.length === 0 ? (
                <CircularProgress />
            ) : (
                <CardContent>
                    <PieChart
                        title={title}
                        data={data}
                        labels={labels}
                        backgroundColor={backgroundColor}
                        hoverBackgroundColor={hoverBackgroundColor}
                    />
                </CardContent>
            )}
        </Card>
    );
};
