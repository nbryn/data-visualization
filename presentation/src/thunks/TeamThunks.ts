import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {
   fetchDataForTeam,
   fetchTeamsPerCountry,
   fetchTeamsPerOrg,
   fetchTeamViewData,
   fetchTeamsByOrg,
   TeamDTO,
   TeamViewDTO,
} from '../services/requests';
import {
   TeamData,
   TeamDataProp,
   TeamState,
   setTeamViewData,
   setTeamSearchData,
   setOrgTeamData,
} from '../store/datamodels/Team';
import * as DTOConverterService from '../services/DTOConverterService';
import {ChartData} from '../store/datamodels/General';
import {RootState} from '../store/index';
import {ServerDTO} from '../services/requests/DTOs';

export const updateTeamViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const result: TeamState = {} as TeamState;

   const TeamData: TeamViewDTO = await fetchTeamViewData();
   const teamsPerCountryData: ServerDTO[] = await fetchTeamsPerCountry();
   const teamsPerOrgData: ServerDTO[] = await fetchTeamsPerOrg();

   const {teamCount, teamSize, teamsLastMonth, teamsLastYear} = TeamData;

   const {todayDate, todayCount} = DTOConverterService.mapDataForToday(teamsLastMonth);

   result.total = teamCount;
   result.todayCount = todayCount;
   result.todayDate = todayDate;
   result.lastMonthCount = DTOConverterService.getTotalNumberInPeriod(teamsLastMonth);
   result.lastYearCount = DTOConverterService.getTotalNumberInPeriod(teamsLastYear);

   const lastYearChartData: Array<ChartData[]> = DTOConverterService.mapLastYearData(teamsLastYear);

   result.lastYearBarChartData = lastYearChartData[0];
   result.lastYearLineChartData = lastYearChartData[1];

   result.lastMonthBarChartData = DTOConverterService.mapLastMonthData(teamsLastMonth);

   result.perCountryData = DTOConverterService.mapGeneralChartData(teamsPerCountryData);
   result.perOrgData = DTOConverterService.mapGeneralChartData(teamsPerOrgData);
   result.teamSizeStats = DTOConverterService.mapGeneralChartData(teamSize);

   dispatch(setTeamViewData(result));
};

export const updateTeamSearchData = (
   team: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const dto: TeamDTO = await fetchDataForTeam(team);

   const TeamData: TeamDataProp = DTOConverterService.mapTeamSearchData(dto);

   dispatch(setTeamSearchData(TeamData));
};

export const updateOrgTeamData = (
   org: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const dto: TeamDTO[] = await fetchTeamsByOrg(org);

   const teamData: TeamData[] = DTOConverterService.mapOrgTeamData(dto);

   console.log(teamData);

   dispatch(setOrgTeamData(teamData));
};
