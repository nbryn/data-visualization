import * as redux from 'react-redux';
import {createStore} from 'redux';
import React from 'react';

import {ChartjsData} from '../../../store/datamodels/types';
import {ChartjsMixedChartContainer} from '../MixedChartContainer';
import {render, screen} from '../../../test-utils';
import {setChartjsData} from '../../../store/datamodels/Chartjs';

const useSelectorSpy = jest.spyOn(redux, 'useSelector');

const firstTitle = 'TestTitle';
const secondTitle = 'TesterTitle';
const firstDataType = ChartjsData.UsersLastYearLineChart;
const secondDataType = ChartjsData.TeamsLastYearLineChart;

const mockStore = createStore(() => ({
   chartjs: {
      groupsLastYearLineChart: {
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

const renderMixedChartContainer = (store?: any) =>
   render(
      <ChartjsMixedChartContainer
         firstChartTitle={firstTitle}
         firstDataType={firstDataType}
         secondChartTitle={secondTitle}
         secondDataType={secondDataType}
      />,
      {store}
   );

describe('LineChartContainer.test.jsx', () => {
   it('useSelector is called on mount', () => {
      renderMixedChartContainer();

      expect(useSelectorSpy).toHaveBeenCalled();
   });
   it('renders a progressbar on mount', () => {
      renderMixedChartContainer();

      expect(screen.getByRole('progressbar')).toBeTruthy();
   });
   it('progress bar is not rendered when store is updated', () => {
      renderMixedChartContainer(mockStore);

      mockStore.dispatch(
         // @ts-ignore
         setChartjsData({
            teamsLastYearLineChart: {
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
