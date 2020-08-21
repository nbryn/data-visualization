import React from 'react';
import {render, screen, fireEvent, within} from '@testing-library/react';

import {Interval} from '../../../containers/chartjs/interval';
import LineChart from '../LineChart';

jest.mock('react-chartjs-2', () => ({
    Line: () => null,
}));

const updateIntervalMock = jest.fn();
const labels = ['January', 'February'];
const label = 'Users';
const fill = true;
const backgroundColor = 'rgba(75,192,192,1)';
const borderColor = 'rgba(75,192,192,2)';
const pointHoverBorderColor = 'rgba(75,192,192,2)';
const pointBorderColor = 'rgba(75,192,192,2)';
const pointHoverBackgroundColor = 'rgba(75,192,192,2)';
const pointBackgroundColor = 'rgba(75,192,192,3)';
const pointBorderWidth = 1;
const pointHoverRadius = 2;
const data = [2, 3, 4, 5, 6, 7];
const counter = 13265487;
const {WEEK, MONTH, YEAR} = Interval;

const renderLineChart = () =>
    render(
        <LineChart
            updateInterval={updateIntervalMock}
            labels={labels}
            label={label}
            fill={fill}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            pointBorderColor={pointBorderColor}
            pointBackgroundColor={pointBackgroundColor}
            pointHoverBorderColor={pointHoverBorderColor}
            pointHoverBackgroundColor={pointHoverBackgroundColor}
            pointBorderWidth={pointBorderWidth}
            pointHoverRadius={pointHoverRadius}
            data={data}
            counter={counter}
            currentInterval={WEEK}
        />
    );

describe('BarChart.test.jsx', () => {
    it('updateInterval is called when interval changes ', () => {
        renderLineChart();

        fireEvent.mouseDown(screen.getByRole('button'));
        const listbox = within(screen.getByRole('listbox'));
        fireEvent.click(listbox.getByText(/Last Month/i));

        expect(updateIntervalMock).toHaveBeenCalled();
    });

    describe('interval setting is working correctly', () => {
        it('week option is disabled when interval = week', () => {
            renderLineChart();
            fireEvent.mouseDown(screen.getByRole('button'));

            const listbox = within(screen.getByRole('listbox'));
            const lastWeek = listbox.getByText(/Last Week/).outerHTML;

            expect(lastWeek).toContain('disabled="true');
        });
        it('month option is enabled when interval = week', () => {
            renderLineChart();
            fireEvent.mouseDown(screen.getByRole('button'));

            const listbox = within(screen.getByRole('listbox'));
            const lastWeek = listbox.getByText(/Last Month/).outerHTML;

            expect(lastWeek).toContain('disabled="false');
        });
        it('year option is enabled when interval = week', () => {
            renderLineChart();
            fireEvent.mouseDown(screen.getByRole('button'));

            const listbox = within(screen.getByRole('listbox'));
            const lastWeek = listbox.getByText(/Last Year/).outerHTML;

            expect(lastWeek).toContain('disabled="false');
        });
    });
    describe('displays the correct information', () => {
        it('counter is correct', () => {
            renderLineChart();

            expect(screen.getByText('Last Week: ' + counter.toString())).toBeTruthy();
        });
    });
});
