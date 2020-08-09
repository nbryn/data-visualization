import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchTotalGroups,
    fetchTotalMeetings,
    fetchTotalShares,
    fetchTotalUsers,
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

    result.usersTotal = await fetchTotalUsers();
    result.groupsTotal = await fetchTotalGroups();
    result.meetingsTotal = await fetchTotalMeetings();
    result.sharesTotal = await fetchTotalShares();

    const usersLastMonth: LastMonthDto[] = await fetchUsersLastMonth();
    const usersLastYear: LastYearDto[] = await fetchUsersLastYear();

    const lastMonthLineChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth, true
    );

    result.usersLastMonthLineChart = lastMonthLineChart;
    result.usersLastWeekLineChart = lastMonthLineChart.lastWeek;

    const lastMonthBarChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth, false
    );

    result.usersLastMonthBarChart = lastMonthBarChart;
    result.usersLastWeekBarChart = lastMonthBarChart.lastWeek;

    console.log(usersLastYear);

    result.usersLastYearLineChart = DataMappingService.mapChartjsLastYearData(
        usersLastYear, true
    );

    console.log(usersLastYear);
    
    result.usersLastYearBarChart = DataMappingService.mapChartjsLastYearData(usersLastYear, false);


    dispatch(setChartjsData(result));
}

