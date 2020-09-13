import * as redux from 'react-redux';
import {createStore} from 'redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import {ChartjsPieChartContainer} from '../PieChartContainer';
import {setChartjsData} from '../../../store/datamodels/Chartjs';

const useSelectorSpy = jest.spyOn(redux, 'useSelector');

const title = 'TestTitle';
const dataType = 'genderData';
const backgroundColor = ['red', 'black'];
const hoverBackgroundColor = ['red', 'black'];

const mockStore = createStore(() => ({
   chartjs: {
      genderData: {
         labels: ['Test', 'Tester'],
         data: [3, 4],
      },
   },
}));

afterEach(() => {
   jest.clearAllMocks();
});

const renderPieChartContainer = (store?: any) =>
   render(
      <ChartjsPieChartContainer
         title={title}
         dataType={dataType}
         backgroundColor={backgroundColor}
         hoverBackgroundColor={hoverBackgroundColor}
      />,
      {store}
   );

describe('LineChartContainer.test.jsx', () => {
   it('useSelector is called on mount', () => {
      renderPieChartContainer();

      expect(useSelectorSpy).toHaveBeenCalled();
   });
   it('renders a progressbar on mount', () => {
      renderPieChartContainer();

      expect(screen.getByRole('progressbar')).toBeTruthy();
   });
   it('progress bar is not rendered when store is updated', () => {
      renderPieChartContainer(mockStore);

      mockStore.dispatch(
         // @ts-ignore
         setChartjsData({
            genderData: {
               labels: ['Test', 'Tester'],
               data: [2, 6],
            },
         })
      );

      expect(screen.queryByRole('progressbar')).toBeFalsy();
   });
});
