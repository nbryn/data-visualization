import React from 'react';
import {render, screen} from '@testing-library/react';

import PieChart from '../PieChart';

jest.mock('react-chartjs-2', () => ({
    Pie: () => null,
}));

const title = 'This is a mock title';
const labels = ['January', 'February'];
const backgroundColor = ['rgba(75,192,192,1)', 'rgba(75,192,192,1)'];
const hoverBackgroundColor = ['rgba(75,192,192,1)', 'rgba(75,192,192,1)'];
const data = [2, 3, 4, 5, 6, 7];

const renderPieChart = () =>
    render(
        <PieChart
            title={title}
            data={data}
            labels={labels}
            backgroundColor={backgroundColor}
            hoverBackgroundColor={hoverBackgroundColor}
        />
    );

describe('PieChart.test.jsx', () => {
    describe('displays the correct information', () => {
        it('title is correct', () => {
            renderPieChart();

            expect(screen.getByText(title)).toBeTruthy();
        });
    });
});