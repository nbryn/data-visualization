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
import * as DataMappingService from '../services/DataMappingService';
import {ChartjsLastMonthData, ChartjsState, setChartjsData} from '../store/datamodels/Chartjs';
import {LastMonthDTO, LastYearDTO, ServerDTO} from '../services/requests/DTOs';
import {RootState} from '../store/index';

export const updateChartjsData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: ChartjsState = {} as ChartjsState;

   result.usersTotal = await fetchTotalUsers();
   result.teamsTotal = await fetchTotalTeams();
   result.matchTotal = await fetchTotalMatches();
   result.meetingTotal = await fetchTotalMeetings();

   const usersLastMonth: LastMonthDTO[] = await fetchUsersLastMonth();
   const usersLastYear: LastYearDTO[] = await fetchUsersLastYear();
   const genderData: ServerDTO[] = await fetchUserGenderData();

   const teamsLastMonth: LastMonthDTO[] = await fetchTeamsLastMonth();
   const teamsLastYear: LastYearDTO[] = await fetchTeamsLastYear();

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
   result.usersLastYearBarChart = DataMappingService.mapChartjsLastYearData(usersLastYear, false);

   result.usersLastYearLineChart = DataMappingService.mapChartjsLastYearData(usersLastYear, true);

   result.genderData = DataMappingService.mapChartjsPieChartData(genderData);

   const teamsLastMonthLineChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
      teamsLastMonth,
      true
   );
   const teamsLastMonthBarChart: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(
      teamsLastMonth,
      false
   );

   result.teamsLastMonthLineChart = teamsLastMonthLineChart;
   result.teamsLastWeekLineChart = teamsLastMonthLineChart.lastWeek;

   result.teamsLastMonthBarChart = teamsLastMonthBarChart;
   result.teamsLastWeekBarChart = teamsLastMonthBarChart.lastWeek;
   result.teamsLastYearBarChart = DataMappingService.mapChartjsLastYearData(teamsLastYear, false);

   result.teamsLastYearLineChart = DataMappingService.mapChartjsLastYearData(teamsLastYear, true);

   dispatch(setChartjsData(result));
};
