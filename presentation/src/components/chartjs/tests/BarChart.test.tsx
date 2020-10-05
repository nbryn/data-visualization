import {Bar} from 'react-chartjs-2';
import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

import BarChart from '../BarChart';
import {Interval} from '../../../containers/chartjs/types';
import TextField from '../../form/TextField';

const updateIntervalMock = jest.fn();
const labels = ['2017', '2018', '2019', '2020'];
const label = "NGO's";
const backgroundColor = 'rgba(75,192,192,1)';
const borderWidth = 3;
const borderColor = 'rgba(75,192,192,3)';
const hoverBackgroundColor = 'rgba(75,192,192,3)';
const hoverBorderColor = 'rgba(75,192,192,4)';
const dataMock = [2, 3, 4, 5, 6, 7];
const counter = 10;

const mockEvent = {
   currentTarget: {},
} as React.ChangeEvent<HTMLInputElement>;

const renderBarChart = (interval?: Interval, data?: number[]): ShallowWrapper => {
   return shallow(
      <BarChart
         updateInterval={updateIntervalMock}
         labels={labels}
         label={label}
         backgroundColor={backgroundColor}
         borderColor={borderColor}
         borderWidth={borderWidth}
         hoverBackgroundColor={hoverBackgroundColor}
         hoverBorderColor={hoverBorderColor}
         data={data || dataMock}
         counter={counter}
         currentInterval={interval || Interval.WEEK}
      />
   );
};

afterEach(() => {
   jest.clearAllMocks();
});

let wrapper: ShallowWrapper;

describe('BarChart.test.jsx', () => {
   describe('funtions are called correctly', () => {
      it('calls updateInterval', () => {
         wrapper = renderBarChart();
         wrapper.find(TextField).props().onChange!(mockEvent);

         expect(updateIntervalMock).toHaveBeenCalled();
      });
   });

   describe('interval setting is working correctly', () => {
      it('week option is disabled when interval = week', () => {
         wrapper = renderBarChart();

         const disabled = wrapper.find(TextField).childAt(0).props().disabled;

         expect(disabled).toBe(true);
      });
      it('month option is enabled when interval = week', () => {
         wrapper = renderBarChart();

         const disabled = wrapper.find(TextField).childAt(1).props().disabled;

         expect(disabled).toBe(false);
      });
      it('year option is enabled when interval = week', () => {
         wrapper = renderBarChart();

         const disabled = wrapper.find(TextField).childAt(2).props().disabled;

         expect(disabled).toBe(false);
      });
      it('month option is disabled when interval = month', () => {
         wrapper = renderBarChart(Interval.MONTH);

         const disabled = wrapper.find(TextField).childAt(1).props().disabled;

         expect(disabled).toBe(true);
      });
      it('week option is enabled when interval = month', () => {
         wrapper = renderBarChart(Interval.MONTH);

         const disabled = wrapper.find(TextField).childAt(0).props().disabled;

         expect(disabled).toBe(false);
      });
      it('year option is enabled when interval = month', () => {
         wrapper = renderBarChart(Interval.MONTH);

         const disabled = wrapper.find(TextField).childAt(2).props().disabled;

         expect(disabled).toBe(false);
      });
   });
   describe('updates when props change', () => {
      it('updates when input data changes', () => {
         wrapper = renderBarChart();

         const newData = [1, 2, 3];
         wrapper.find(Bar).props().data.datasets[0].data = newData;

         expect(wrapper.find(Bar).props().data.datasets[0].data).toEqual(newData);
      });
   });
   describe('<Bar /> receives the correct values from props', () => {
      it('renders one react-chartjs <Bar /> component', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar)).toHaveLength(1);
      });
      it('stores the correct labels', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.labels).toEqual(labels);
      });
      it('stores the correct label', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].label).toEqual("NGO's");
      });
      it('stores the correct backgroundColor', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].backgroundColor).toEqual(backgroundColor);
      });
      it('stores the correct borderWidth', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].borderWidth).toEqual(borderWidth);
      });
      it('stores the correct hoverBackGroundColor', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].hoverBackgroundColor).toEqual(
            hoverBackgroundColor
         );
      });
      it('stores the correct hoverBorderColor', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].hoverBorderColor).toEqual(hoverBorderColor);
      });
      it('stores the correct data', () => {
         wrapper = renderBarChart();

         expect(wrapper.find(Bar).props().data.datasets[0].data).toEqual(dataMock);
      });
   });
});
