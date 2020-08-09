import React, { ReactElement } from 'react';
import { Bar } from 'react-chartjs-2';

type ChartProps = {
    label: string;
    type: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    hoverBackgroundColor?: string;
    hoverBorderColor?: string;
    pointBorderColor?: string;
    pointBackgroundColor?: string;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;
};

type Props = {
    labels: string[];
    firstChart: ChartProps;
    secondChart: ChartProps;
};

const MixedChart: React.FC<Props> = (props: Props): ReactElement => {
    const data = {
        datasets: [
            {
                label: props.firstChart.label,
                type: props.firstChart.type,
                data: props.firstChart.data,
                fill: props.firstChart.fill,
                borderColor: props.firstChart.borderColor,
                backgroundColor: props.firstChart.backgroundColor,
                hoverBackgroundColor:
                    props.firstChart.hoverBackgroundColor || '',
                hoverBorderColor: props.firstChart.pointHoverBorderColor || '',
                pointBorderColor: props.firstChart.pointBackgroundColor || '',
                pointBackgroundColor:
                    props.firstChart.pointBackgroundColor || '',
                pointHoverBackgroundColor:
                    props.firstChart.pointHoverBackgroundColor,
                pointHoverBorderColor:
                    props.firstChart.pointHoverBorderColor || '',
                yAxisID: 'y-axis-1',
            },
            {
                label: props.secondChart.label,
                type: props.secondChart.type,
                data: props.secondChart.data,
                fill: props.secondChart.fill,
                borderColor: props.secondChart.borderColor,
                backgroundColor: props.secondChart.backgroundColor,
                hoverBackgroundColor:
                    props.secondChart.hoverBackgroundColor || '',
                hoverBorderColor: props.secondChart.pointHoverBorderColor || '',
                pointBorderColor: props.secondChart.pointBorderColor || '',
                pointBackgroundColor:
                    props.secondChart.pointBackgroundColor || '',
                pointHoverBackgroundColor:
                    props.secondChart.pointHoverBackgroundColor,
                pointHoverBorderColor: props.secondChart.pointHoverBorderColor,
                yAxisID: 'y-axis-2',
            },
        ],
    };
    const options = {
        responsive: true,
        labels: props.labels,
        tooltips: {
            mode: 'label',
        },
        elements: {
            line: {
                fill: false,
            },
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false,
                    },

                    labels: props.labels,
                },
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false,
                    },
                    labels: {
                        show: true,
                    },
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false,
                    },
                    labels: {
                        show: true,
                    },
                },
            ],
        },
    };

    return <Bar data={data} options={options} />;
};

export default MixedChart;
