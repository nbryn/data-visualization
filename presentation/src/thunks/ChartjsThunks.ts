import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchGroupsLastYear,
    fetchTotalGroups,
    fetchTotalMeetings,
    fetchTotalShares,
    fetchTotalUsers,
    fetchUserGenderData,
    fetchUsersLastYear,
    fetchUsersLastMonth,
} from '../services/requests';
import { RootState } from '../store/index';

import {
    ChartjsLastMonthData,
    ChartjsState,
    setChartjsData,
} from '../store/datamodels/Chartjs';
import { LastMonthDto, LastYearDto, ServerDto } from '../services/requests/Dto';


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
    const groupsLastYear: LastYearDto[] = await fetchGroupsLastYear();
    const genderData: ServerDto[] = await fetchUserGenderData();

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

    result.usersLastYearLineChart = DataMappingService.mapChartjsLastYearData(
        usersLastYear, true
    );
    result.groupsLastYearLineChart = DataMappingService.mapChartjsLastYearData(groupsLastYear, true);

    result.usersLastYearBarChart = DataMappingService.mapChartjsLastYearData(usersLastYear, false);

    result.genderData = DataMappingService.mapChartjsPieChartData(genderData);

    dispatch(setChartjsData(result));
}

