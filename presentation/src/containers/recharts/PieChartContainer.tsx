import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ChartData } from '../../store/datamodels/General';
import PieChart from '../../components/recharts/PieChart';
import { RootState } from '../../store/index';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: 5,
        marginBottom: 10,
    },
}));

type Props = {
    title: string;
    statsType: string;
    dataType: string;
    colors: string[];
};

export const PieChartContainer: React.FC<Props> = ({
    title,
    statsType,
    dataType,
    colors,
}: Props): ReactElement => {
    const classes = useStyles();

    const data: ChartData[] = useSelector<RootState, ChartData[]>(
        (state) => state[statsType][dataType]
    );

    return (
        <div className={classes.wrapper}>
            <Card>
                <CardContent>
                    <PieChart title={title} data={data} colors={colors} />
                </CardContent>
            </Card>
        </div>
    );
};
