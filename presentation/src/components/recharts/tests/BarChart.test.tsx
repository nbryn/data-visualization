import React from 'react';
import {render, screen} from '@testing-library/react';

import BarChart from '../BarChart';
import {ChartData} from '../../../store/datamodels/General';

const title = 'BarChartTitle2345';
const dataMock = [
    {name: 'January', value: 50},
    {name: 'February', value: 22350},
    {name: 'March', value: 232},
];
const xLabelConfig = 'test';
const yLabelConfig = 'barchart';
const color = 'red';

const renderBarChart = (data?: ChartData[]) =>
    render(
        <BarChart
          title={title}
          data={data || dataMock}
          xLabelConfig={xLabelConfig}
          yLabelConfig={yLabelConfig}
          color={color}
        />
    );

  
describe('BarChart.test.jsx', () => {
    it('shows a spinner when loading ', () => {
        renderBarChart([]);

        expect(screen.queryByRole('progressbar')).toBeTruthy();
    })
    it('does not show a spinner when loading is finished', () => {
        renderBarChart();

        expect(screen.queryByRole('progressbar')).toBeFalsy();
    })
    // it('shows a chart when not loading ', () => {
    //     renderBarChart();

    //     expect(screen.getByText('reponsive-container')).toBeTruthy();
    // })
    it('has the correct title', () => {
        renderBarChart();

        expect(screen.getByText(title)).toBeTruthy();
    })
})