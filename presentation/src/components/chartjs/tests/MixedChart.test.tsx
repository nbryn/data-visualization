import React from 'react';
import {render, screen} from '@testing-library/react';

import MixedChart, {ChartProps} from '../MixedChart';

jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
}));

const labels = ['January', 'February'];

const chartProps: ChartProps = {
    type: 'Line',
    label: 'Users',
    fill: true,
    backgroundColor: 'rgba(75,192,192,1)',
    borderColor: 'rgba(75,192,192,2)',
    pointHoverBorderColor: 'rgba(75,192,192,2)',
    pointBorderColor: 'rgba(75,192,192,2)',
    pointHoverBackgroundColor: 'rgba(75,192,192,2)',
    pointBackgroundColor: 'rgba(75,192,192,3)',
    data: [2, 3, 4, 5, 6, 7],
};
const renderMixedChart = () => render(<MixedChart labels={labels} firstChart={chartProps} secondChart={chartProps} />);

describe('MixedChart.test.jsx', () => {
    describe('displays the correct information', () => {
        it('label is correct', () => {
            renderMixedChart();

            expect(screen.getByText(chartProps.label + " and " + chartProps.label)).toBeTruthy();
        });
    });
});
