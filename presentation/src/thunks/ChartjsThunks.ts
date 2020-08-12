import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchGroupsLastMonth,
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
    const genderData: ServerDto[] = await fetchUserGenderData();

    const groupsLastMonth: LastMonthDto[] = await fetchGroupsLastMonth();
    const groupsLastYear: LastYearDto[] = await fetchGroupsLastYear();

    const usersLastMonthLineChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth,
        true
    );
    const usersLastMonthBarChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        usersLastMonth,
        false
    );

    result.usersLastMonthLineChart = usersLastMonthLineChart;
    result.usersLastWeekLineChart = usersLastMonthLineChart.lastWeek;

    result.usersLastMonthBarChart = usersLastMonthBarChart;
    result.usersLastWeekBarChart = usersLastMonthBarChart.lastWeek;
    result.usersLastYearBarChart = DataMappingService.mapChartjsLastYearData(
        usersLastYear,
        false
    );

    result.usersLastYearLineChart = DataMappingService.mapChartjsLastYearData(
        usersLastYear,
        true
    );

    result.genderData = DataMappingService.mapChartjsPieChartData(genderData);

    const groupsLastMonthLineChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        groupsLastMonth,
        true
    );
    const groupsLastMonthBarChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
        groupsLastMonth,
        false
    );

    result.groupsLastMonthLineChart = groupsLastMonthLineChart;
    result.groupsLastWeekLineChart = groupsLastMonthLineChart.lastWeek;

    result.groupsLastMonthBarChart = groupsLastMonthBarChart;
    result.groupsLastWeekBarChart = groupsLastMonthBarChart.lastWeek;
    result.groupsLastYearBarChart = DataMappingService.mapChartjsLastYearData(
        groupsLastYear,
        false
    );

    result.groupsLastYearLineChart = DataMappingService.mapChartjsLastYearData(
        groupsLastYear,
        true
    );

    dispatch(setChartjsData(result));
};
