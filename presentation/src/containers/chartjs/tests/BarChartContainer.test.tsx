import * as redux from 'react-redux';
import {createStore} from 'redux';
import React from 'react';

import {ChartjsValues} from '../../../store/datamodels/types';
import {ChartjsBarChartContainer} from '../BarChartContainer';
import {render, screen} from '../../../test-utils';
import {setChartjsData} from '../../../store/datamodels/Chartjs';

const useSelectorSpy = jest.spyOn(redux, 'useSelector');

const title = 'TestTitle';
const color = 'red';

const mockStore = createStore(() => ({
   chartjs: {
      usersLastWeekBarChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
      usersLastMonthBarChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
      usersLastYearBarChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
   },
}));

afterEach(() => {
   jest.clearAllMocks();
});

const renderBarChartContainer = (store?: any) =>
   render(
      <ChartjsBarChartContainer
         title={title}
         color={color}
         data={[
            ChartjsValues.UsersLastYearBarChart,
            ChartjsValues.UsersLastMonthBarChart,
            ChartjsValues.UsersLastYearBarChart,
         ]}
      />,
      {store}
   );

describe('BarChartContainer.test.jsx', () => {
   it('useSelector is called on mount', () => {
      renderBarChartContainer();

      expect(useSelectorSpy).toHaveBeenCalled();
   });
   it('renders a progressbar on mount', () => {
      renderBarChartContainer();

      expect(screen.getByRole('progressbar')).toBeTruthy();
   });
   it('progress bar is not rendered when store is updated', () => {
      renderBarChartContainer(mockStore);

      mockStore.dispatch(
         // @ts-ignore
         setChartjsData({
            usersLastWeekBarChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 1, 2],
               counter: 3,
            },
            usersLastMonthBarChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 1, 2],
               counter: 3,
            },
            usersLastYearBarChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 2, 2],
               counter: 4,
            },
         })
      );

      expect(screen.queryByRole('progressbar')).toBeFalsy();
   });
});
