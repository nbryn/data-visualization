import {Card, CardContent} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';

import {ChartjsPieData} from '../../store/datamodels/Chartjs';
import PieChart from '../../components/chartjs/PieChart';
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
    const classes = useStyles();

    const {data, labels}: ChartjsPieData = useSelector<RootState, ChartjsPieData>((state) => state.chartjs[dataType]);

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                {data.length === 0 ? (
                    <CircularProgress className={classes.spinner} />
                ) : (
                    <PieChart
                        title={title}
                        data={data}
                        labels={labels}
                        backgroundColor={backgroundColor}
                        hoverBackgroundColor={hoverBackgroundColor}
                    />
                )}
            </CardContent>
        </Card>
    );
};
