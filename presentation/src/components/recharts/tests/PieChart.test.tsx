import React from 'react';
import {render, screen} from '@testing-library/react';

import PieChart from '../PieChart';
import {ChartData} from '../../../store/datamodels/General';

const title = 'PiceChartTitle3322';
const data = [
    {name: 'DK', value: 36598},
    {name: 'SWE', value: 123458},
    {name: 'NO', value: 98574},
];

const colors = ['red', 'blue'];
const height = 200;

const renderPieChart = (newData?: ChartData[]) =>
    render(
        <PieChart
            title={title}
            data={newData || data}
            colors={colors}
            height={height}
        />
    );

describe('LineChart.test.jsx', () => {
    describe('spinner is working', () => {
        it('shows a spinner when loading', () => {
            renderPieChart([]);

            expect(screen.queryByRole('progressbar')).toBeTruthy();
        });
        it('does not show a spinner when loading is finished', () => {
            renderPieChart();

            expect(screen.queryByRole('progressbar')).toBeFalsy();
        });
    });
    describe('chart is rendering correctly', () => {
        // it('chart is showing the correct data for the first data entry', () => {
        //     renderPieChart();

        //     expect(screen.getByText(data[0].name)).toBeTruthy();
        // });
        // it('chart is showing the correct data for the second data entry', () => {
        //     renderPieChart();

        //     expect(screen.getByText(data[1].name)).toBeTruthy();
        // });
        // it('chart is showing the correct data for the third data entry', () => {
        //     renderPieChart();

        //     expect(screen.getByText(data[2].name)).toBeTruthy();
        // });
        it('has the correct title', () => {
            renderPieChart();

            expect(screen.getByText(title)).toBeTruthy();
        });
    });
});
