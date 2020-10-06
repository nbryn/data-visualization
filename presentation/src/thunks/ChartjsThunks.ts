import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {
   fetchTeamsLastMonth,
   fetchTeamsLastYear,
   fetchTotalTeams,
   fetchTotalMatches,
   fetchTotalMeetings,
   fetchTotalUsers,
   fetchUserGenderData,
   fetchUsersLastYear,
   fetchUsersLastMonth,
} from '../services/requests';
import * as DTOConverterService from '../services/DTOConverterService';
import {ChartjsLastMonthData, ChartjsState, setChartjsData} from '../store/datamodels/Chartjs';
import {LastMonthDTO, LastYearDTO, ServerDTO} from '../services/requests/DTOs';
import {RootState} from '../store/index';

export const updateChartjsData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const result: ChartjsState = {} as ChartjsState;

   await updateChartjsUserData(result);

   result.teamsTotal = await fetchTotalTeams();
   result.matchTotal = await fetchTotalMatches();
   result.meetingTotal = await fetchTotalMeetings();

   const genderData: ServerDTO[] = await fetchUserGenderData();

   const teamsLastMonth: LastMonthDTO[] = await fetchTeamsLastMonth();
   const teamsLastYear: LastYearDTO[] = await fetchTeamsLastYear();

   result.genderData = DTOConverterService.mapChartjsPieChartData(genderData);

   const teamsLastMonthChartData: ChartjsLastMonthData = DTOConverterService.mapChartjsLastMonthData(
      teamsLastMonth
   );

   result.teamsLastMonthLineChart = teamsLastMonthChartData.lastMonth;
   result.teamsLastMonthLineChart.data = teamsLastMonthChartData.aggregateData;
   result.teamsLastWeekLineChart = teamsLastMonthChartData.lastWeek;
   result.teamsLastWeekLineChart.data = teamsLastMonthChartData.aggregateDataWeek!;

   result.teamsLastMonthBarChart = teamsLastMonthChartData.lastMonth;
   result.teamsLastWeekBarChart = teamsLastMonthChartData.lastWeek;

   const teamsLastYearChartData = DTOConverterService.mapChartjsLastYearData(teamsLastYear);

   result.teamsLastYearBarChart = teamsLastYearChartData;
   result.teamsLastYearLineChart = teamsLastYearChartData;
   result.teamsLastYearLineChart.data = teamsLastYearChartData.aggregateData!;

   dispatch(setChartjsData(result));
};

const updateChartjsUserData = async (chartjsData: ChartjsState) => {
   chartjsData.usersTotal = await fetchTotalUsers();

   const usersLastMonth: LastMonthDTO[] = await fetchUsersLastMonth();
   const usersLastYear: LastYearDTO[] = await fetchUsersLastYear();

   const usersLastMonthChartData: ChartjsLastMonthData = DTOConverterService.mapChartjsLastMonthData(
      usersLastMonth
   );

   chartjsData.usersLastMonthLineChart = usersLastMonthChartData.lastMonth;
   chartjsData.usersLastMonthLineChart.data = usersLastMonthChartData.aggregateData;
   chartjsData.usersLastWeekLineChart = usersLastMonthChartData.lastWeek;
   chartjsData.usersLastWeekLineChart.data = usersLastMonthChartData.aggregateDataWeek!;

   chartjsData.usersLastMonthBarChart = usersLastMonthChartData.lastMonth;
   chartjsData.usersLastWeekBarChart = usersLastMonthChartData.lastWeek;

   const usersLastYearChartData = DTOConverterService.mapChartjsLastYearData(usersLastYear);

   chartjsData.usersLastYearBarChart = usersLastYearChartData;
   chartjsData.usersLastYearLineChart = usersLastYearChartData;
   chartjsData.usersLastYearLineChart.data = usersLastYearChartData.aggregateData!;
};
