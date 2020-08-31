import React from 'react';
import {render, screen} from '@testing-library/react';

import LineChart from '../LineChart';
import {ChartData} from '../../../store/datamodels/General';
import {ChartProps} from '../types';

const mockChartProps: ChartProps = {
   title: 'LineChartTitle1122',
   data: [
      {name: 'DK', value: 36598},
      {name: 'SWE', value: 123458},
      {name: 'NO', value: 98574},
   ],
   yLabelConfig: {
      value: 'Users',
      angle: -90,
      position: 'insideLeft',
   },
   xLabelConfig: {value: 'Months', position: 'center', dy: 10},
   strokeColor: 'red',
   height: 200,
};

const {title, data, yLabelConfig, xLabelConfig, strokeColor, height} = mockChartProps;

const renderBarChart = (newData?: ChartData[]) =>
   render(
      <LineChart
         title={title}
         data={newData || data}
         xLabelConfig={xLabelConfig}
         yLabelConfig={yLabelConfig}
         strokeColor={strokeColor}
         height={height}
      />
   );

describe('LineChart.test.jsx', () => {
   describe('spinner is working', () => {
      it('shows a spinner when loading', () => {
         renderBarChart([]);

         expect(screen.queryByRole('progressbar')).toBeTruthy();
      });
      it('does not show a spinner when loading is finished', () => {
         renderBarChart();

         expect(screen.queryByRole('progressbar')).toBeFalsy();
      });
   });
   describe('chart is rendering correctly', () => {
      it('chart is showing the correct data for the first data entry', () => {
         renderBarChart();

         expect(screen.getByText(data[0].name)).toBeTruthy();
      });
      it('chart is showing the correct data for the second data entry', () => {
         renderBarChart();

         expect(screen.getByText(data[1].name)).toBeTruthy();
      });
      it('chart is showing the correct data for the third data entry', () => {
         renderBarChart();

         expect(screen.getByText(data[2].name)).toBeTruthy();
      });
      it('has the correct title', () => {
         renderBarChart();

         expect(screen.getByText(title)).toBeTruthy();
      });
   });
});
