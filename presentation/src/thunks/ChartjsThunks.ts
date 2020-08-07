import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchUsersLastYear,
    fetchUsersLastMonth,
} from '../services/requests';
import { RootState } from '../store/index';

import {
    ChartjsLastMonthData,
    ChartjsState,
    setChartjsData,
} from '../store/datamodels/Chartjs';
import { LastMonthDto, LastYearDto } from '../services/requests/Dto';


export const updateChartjsData = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const result: ChartjsState = {} as ChartjsState;

    const usersLastMonth: LastMonthDto[] = await fetchUsersLastMonth();
    const usersLastYear: LastYearDto[] = await fetchUsersLastYear();

    const lastMonthAggregate: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth, true
    );

    result.usersLastMonthLineChart = lastMonthAggregate;
    result.usersLastWeekLineChart = lastMonthAggregate.lastWeek;

    const lastMonthNoAggregate: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth, false
    );

    result.usersLastMonthBarChart = lastMonthNoAggregate;
    result.usersLastWeekBarChart = lastMonthNoAggregate.lastWeek;

    result.usersLastYearLineChart = DataMappingService.mapChartjsLastYearData(
        usersLastYear, true
    );
    result.usersLastYearBarChart = DataMappingService.mapChartjsLastYearData(usersLastYear, false);

    dispatch(setChartjsData(result));
}

