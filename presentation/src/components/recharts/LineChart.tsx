import {
    CartesianGrid,
    Line,
    LineChart as Chart,
    ResponsiveContainer,
    YAxis,
    XAxis,
} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactElement } from 'react';

const { Col } = require('react-bootstrap');

type Props = {
    title: string;
    data: any;
    yLabelConfig: any;
    xLabelConfig: any;
    stroke: string;
};

const LineChart: React.FC<Props> = ({
    title,
    data,
    yLabelConfig,
    xLabelConfig,
    stroke,
}: Props): ReactElement => {
    return (
        <ResponsiveContainer width={400} height="80%">
            <div className="content">
                <Col xs={8}>
                    <div className="numbers">
                        <p>{title}</p>
                    </div>
                </Col>
                {!data ? (
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                ) : (
                    <Chart width={350} height={300} data={data}>
                        <XAxis label={xLabelConfig} dataKey="name" />
                        <YAxis label={yLabelConfig} dataKey="value" />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line
                            strokeWidth={3}
                            type="monotone"
                            dataKey="value"
                            stroke={stroke}
                        />
                    </Chart>
                )}
            </div>
        </ResponsiveContainer>
    );
};

export default LineChart;
