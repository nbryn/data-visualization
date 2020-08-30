import * as redux from 'react-redux';
import React from 'react';
import {useSelector} from 'react-redux';

import {render, screen} from '../../../test-utils';
import {ChartjsBarChartContainer} from '../BarChartContainer';

const useSelectorSpy = jest
    .spyOn(redux, 'useSelector')
    // .mockImplementation()
    // .mockReturnValue({
    //     labels: ['Jan', 'Feb'],
    //     data: [2, 3],
    //     counter: 5,
    // });

afterEach(() => {
    jest.clearAllMocks();
});

describe('BarChartContainer.test.jsx', () => {
    describe('calls the correct functions', () => {
        it('useSelector is called x6 on mount', () => {
            render(
                <ChartjsBarChartContainer
                    title="Test"
                    color="red"
                    dataTypes={['usersLastYearBarChart', 'usersLastMonthBarChart', 'usersLastYearLineChart']}
                />
            );

            expect(useSelectorSpy).toHaveBeenCalledTimes(6);
        });
    });
});
