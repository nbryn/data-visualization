import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

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
import {RootState} from '../store/index';
import {ServerDTO} from '../services/requests/DTOs';

export const updateTeamViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: TeamState = {} as TeamState;

   const TeamData: TeamViewDTO = await fetchTeamViewData();
   const teamsPerCountryData: ServerDTO[] = await fetchTeamsPerCountry();
   const teamsPerOrgData: ServerDTO[] = await fetchTeamsPerOrg();

   const {teamCount, teamSize, teamsLastMonth, teamsLastYear} = TeamData;

   const {todayDate, todayCount} = DataMappingService.mapDataForToday(teamsLastMonth);

   result.total = teamCount;
   result.todayCount = todayCount;
   result.todayDate = todayDate;
   result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(teamsLastMonth);
   result.lastYearCount = DataMappingService.getTotalNumberInPeriod(teamsLastYear);

   result.lastYearLineChartData = DataMappingService.mapLastYearData(teamsLastYear, true);
   result.lastYearBarChartData = DataMappingService.mapLastYearData(teamsLastYear, false);
   result.lastMonthBarChartData = DataMappingService.mapLastMonthData(teamsLastMonth);

   result.perCountryData = DataMappingService.mapGeneralChartData(teamsPerCountryData);
   result.perOrgData = DataMappingService.mapGeneralChartData(teamsPerOrgData);
   result.teamSizeStats = DataMappingService.mapGeneralChartData(teamSize);

   dispatch(setTeamViewData(result));
};

export const updateTeamSearchData = (team: string): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const dto: TeamDTO = await fetchDataForTeam(team);

   const TeamData: TeamDataProp = DataMappingService.mapTeamSearchData(dto);

   dispatch(setTeamSearchData(TeamData));
};

export const updateOrgTeamData = (org: string): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const dto: TeamDTO[] = await fetchTeamsByOrg(org);

   const teamData: TeamData[] = DataMappingService.mapOrgTeamData(dto);

   console.log(teamData);

   dispatch(setOrgTeamData(teamData));
};
