import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import BarChart from './BarChart';
import { Bar } from 'react-chartjs-2';

let wrapper: ShallowWrapper;

const updateIntervalMock = jest.fn();
const labels = ['2017', '2018', '2019', '2020'];
const label = "NGO's";
const backgroundColor = 'rgba(75,192,192,1)';
const borderWidth = 3;
const borderColor = 'rgba(75,192,192,3)';
const hoverBackgroundColor = 'rgba(75,192,192,3)';
const hoverBorderColor = 'rgba(75,192,192,4)';
const data = [2, 3, 4, 5, 6, 7];
const counter = 10;

beforeEach(() => {
    wrapper = shallow(
        <BarChart
            updateInterval={updateIntervalMock}
            labels={labels}
            label={label}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderWidth={borderWidth}
            hoverBackgroundColor={hoverBackgroundColor}
            hoverBorderColor={hoverBorderColor}
            data={data}
            counter={counter}
        />
    );
});

describe('BarChart.test.jsx', () => {
    it('renders one react-chartjs <HorizontalBar /> component', () => {
        expect(wrapper.find(Bar)).toHaveLength(1);
    });
    it('stores the correct labels', () => {
        expect(wrapper.find(Bar).props().data.labels).toEqual(labels);
    });
    it('stores the correct label', () => {
        expect(wrapper.find(Bar).props().data.datasets[0].label).toEqual(
            "NGO's"
        );
    });
    it('stores the correct backgroundColor', () => {
        expect(
            wrapper.find(Bar).props().data.datasets[0].backgroundColor
        ).toEqual(backgroundColor);
    });
    it('stores the correct borderWidth', () => {
        expect(wrapper.find(Bar).props().data.datasets[0].borderWidth).toEqual(
            borderWidth
        );
    });
    it('stores the correct hoverBackGroundColor', () => {
        expect(
            wrapper.find(Bar).props().data.datasets[0].hoverBackgroundColor
        ).toEqual(hoverBackgroundColor);
    });
    it('stores the correct hoverBorderColor', () => {
        expect(
            wrapper.find(Bar).props().data.datasets[0].hoverBorderColor
        ).toEqual(hoverBorderColor);
    });
    it('stores the correct data', () => {
        expect(wrapper.find(Bar).props().data.datasets[0].data).toEqual(data);
    });
});