import * as redux from 'react-redux';
import {createStore} from 'redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import {ChartjsBarChartContainer} from '../BarChartContainer';
import {setChartjsData} from '../../../store/datamodels/Chartjs';

const useSelectorSpy = jest.spyOn(redux, 'useSelector');

const title = 'TestTitle';
const color = 'red';

afterEach(() => {
   jest.clearAllMocks();
});

describe('BarChartContainer.test.jsx', () => {
   it('useSelector is called on mount', () => {
      render(
         <ChartjsBarChartContainer
            title={title}
            color={color}
            dataTypes={['usersLastYearBarChart', 'usersLastMonthBarChart', 'usersLastYearBarChart']}
         />
      );

      expect(useSelectorSpy).toHaveBeenCalled();
   });
   it('renders a progressbar on mount', () => {
      render(
         <ChartjsBarChartContainer
            title={title}
            color={color}
            dataTypes={['usersLastWeekBarChart', 'usersLastMonthBarChart', 'usersLastYearBarChart']}
         />
      );

      expect(screen.getByRole('progressbar')).toBeTruthy();
   });
   it('progress bar is not rendered when store is updated', () => {
      const store = createStore(() => ({
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
      render(
         <ChartjsBarChartContainer
            title={title}
            color={color}
            dataTypes={['usersLastWeekBarChart', 'usersLastMonthBarChart', 'usersLastYearBarChart']}
         />,
         // @ts-ignore
         {store}
      );

      store.dispatch(
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
