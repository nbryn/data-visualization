import * as redux from 'react-redux';
import {createStore} from 'redux';
import React from 'react';

import {ChartjsValues} from '../../../store/datamodels/types';
import {render, screen} from '../../../test-utils';
import {ChartjsLineChartContainer} from '../LineChartContainer';
import {setChartjsData} from '../../../store/datamodels/Chartjs';

const useSelectorSpy = jest.spyOn(redux, 'useSelector');

const title = 'TestTitle';
const color = 'red';

const mockStore = createStore(() => ({
   chartjs: {
      usersLastWeekLineChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
      usersLastMonthLineChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
      usersLastYearLineChart: {
         labels: ['Feb', 'Mar', 'Apr'],
         data: [0, 1, 2],
         counter: 3,
      },
   },
}));

afterEach(() => {
   jest.clearAllMocks();
});

const renderLineChartContainer = (store?: any) =>
   render(
      <ChartjsLineChartContainer
         title={title}
         color={color}
         data={[
            ChartjsValues.UsersLastYearLineChart,
            ChartjsValues.UsersLastMonthLineChart,
            ChartjsValues.UsersLastYearLineChart,
         ]}
      />,
      {store}
   );

describe('LineChartContainer.test.jsx', () => {
   it('useSelector is called on mount', () => {
      renderLineChartContainer();

      expect(useSelectorSpy).toHaveBeenCalled();
   });
   it('renders a progressbar on mount', () => {
      renderLineChartContainer();

      expect(screen.getByRole('progressbar')).toBeTruthy();
   });
   it('progress bar is not rendered when store is updated', () => {
      renderLineChartContainer(mockStore);

      mockStore.dispatch(
         // @ts-ignore
         setChartjsData({
            usersLastWeekLineChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 1, 2],
               counter: 3,
            },
            usersLastMonthLineChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 1, 2],
               counter: 3,
            },
            usersLastYearLineChart: {
               labels: ['Feb', 'Mar', 'Apr'],
               data: [0, 2, 2],
               counter: 4,
            },
         })
      );

      expect(screen.queryByRole('progressbar')).toBeFalsy();
   });
});
