import { Pie } from 'react-chartjs-2';
import React from 'react';

import { PieChart as Chart, PieChartDataset } from './types';

const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
    ],
};

interface Props extends PieChartDataset {
    title: string;
    labels: string[];
}

const PieChart: React.FC<Props> = (props: Props) => {
    const chart: Chart = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: props.backgroundColor,
                hoverBackgroundColor: props.hoverBackgroundColor,
            },
        ],
    };

    return (
        <div>
            <Pie
                data={chart}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    );
};

export default PieChart;
