import {Card, CardContent} from '@material-ui/core';
import {LabelProps} from 'recharts';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';

import BarChart from '../../components/recharts/BarChart';
import {ChartData} from '../../store/datamodels/General';
import {RootState} from '../../store/index';

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

export const BarChartContainer: React.FC<Props> = ({
    title,
    statsType,
    dataType,
    xLabel,
    yLabel,
    color,
}: Props): ReactElement => {
    const classes = useStyles();

    const data: ChartData[] = useSelector<RootState, ChartData[]>((state) => state[statsType][dataType]);

    const yLabelConfig: LabelProps = {
        value: yLabel,
        angle: -90,
        position: 'insideLeft',
    };
    const xLabelConfig: LabelProps = {value: xLabel, position: 'center', dy: 10};

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <BarChart
                    title={title}
                    data={data}
                    yLabelConfig={yLabelConfig}
                    xLabelConfig={xLabelConfig}
                    strokeColor={color}
                />
            </CardContent>
        </Card>
    );
};
