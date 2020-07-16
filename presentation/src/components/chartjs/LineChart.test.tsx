import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import LineChart from './LineChart';
import { Line } from 'react-chartjs-2';

let wrapper: ShallowWrapper;

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
const counter = 10;

beforeEach(() => {
    wrapper = shallow(
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

        />
    );
});

describe('LineChart.test.jsx', () => {
    it('renders one react-chartjs <Line /> component', () => {
        expect(wrapper.find(Line)).toHaveLength(1);
    });
    it('stores the correct labels', () => {
        expect(wrapper.find(Line).props().data.labels).toEqual(labels);
    });
    it('stores the correct label', () => {
        expect(wrapper.find(Line).props().data.datasets[0].label).toEqual(
            label
        );
    });
    it('stores the correct backgroundColor', () => {
        expect(
            wrapper.find(Line).props().data.datasets[0].backgroundColor
        ).toEqual(backgroundColor);
    });
    it('stores the correct borderColor', () => {
        expect(
            wrapper.find(Line).props().data.datasets[0].pointBackgroundColor
        ).toEqual(pointBackgroundColor);
    });
    it('stores the correct pointBorderWidth', () => {
        expect(
            wrapper.find(Line).props().data.datasets[0].pointBorderWidth
        ).toEqual(pointBorderWidth);
    });
    it('stores the correct pointHoverRadius', () => {
        expect(
            wrapper.find(Line).props().data.datasets[0].pointHoverRadius
        ).toEqual(pointHoverRadius);
    });
    it('stores the correct data', () => {
        expect(wrapper.find(Line).props().data.datasets[0].data).toEqual(data);
    });
});
