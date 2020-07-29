import React, { ReactElement } from 'react';
import {
    Cell,
    PieChart as PieChartt,
    Pie,
    ResponsiveContainer,
} from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';

const { Col } = require('react-bootstrap');

type Props = {
    title: string;
    data: any;
    colors: string[];
};

const PieChart: React.FC<Props> = ({
    title,
    data,
    colors,
}: Props): ReactElement => {
    const renderLabel = (entry: any) => {
        return entry.name;
    };

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
                    <PieChartt width={350} height={300}>
                        <Pie
                            label={renderLabel}
                            dataKey="value"
                            nameKey="name"
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                        >
                            {data.map((entry: any, index: number) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                />
                            ))}
                        </Pie>
                    </PieChartt>
                )}
            </div>
        </ResponsiveContainer>
    );
};

export default PieChart;
