import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ChartData } from '../../store/datamodels/General';
import LineChart from '../../components/recharts/LineChart';
import { RootState } from '../../store/index';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: 10,
        marginBottom: 15,
    },
}));

type Props = {
    title: string;
    statsType: string;
    dataType: string;
    xLabel: string;
    yLabel: string;
    color: string;
};

export const LineChartContainer: React.FC<Props> = ({
    title,
    statsType,
    dataType,
    xLabel,
    yLabel,
    color,
}: Props): ReactElement => {
    const classes = useStyles();
    
    const data: ChartData[] = useSelector<RootState, ChartData[]>(
        (state) => state[statsType][dataType]
    );

    const yLabelConfig = {
        value: yLabel,
        angle: -90,
        position: 'insideLeft',
    };
    const xLabelConfig = { value: xLabel, position: 'center', dy: 10 };

    return (
        <div className={classes.wrapper}>
            <Card>
                <CardContent>
                    <LineChart
                        title={title}
                        data={data}
                        xLabelConfig={xLabelConfig}
                        yLabelConfig={yLabelConfig}
                        stroke={color}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
