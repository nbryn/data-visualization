import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {
   fetchTeamsLastYear,
   fetchTeamsLastMonth,
   fetchMatchesLastYear,
   fetchTotalTeams,
   fetchTotalMatches,
   fetchTotalMeetings,
   fetchUserGenderData,
   fetchTotalUsers,
   fetchUsersLastYear,
   fetchLogin,
   fetchActiveUserData,
   fetchTeamEngagementData,
   AccountViewDTO,
   MatchViewDTO,
} from '../services/requests';
import * as DataMappingService from '../services/DataMappingService';
import {fetchAccountData} from '../services/requests/account/AccountViewDataRequest';
import {fetchMatchViewData} from '../services/requests/match/MatchViewDataRequest';
import {fetchMatchesPerCountry} from '../services/requests/match/MatchesPerCountryRequest';
import {AccountState, setAccountViewData} from '../store/datamodels/Account';
import {loginUser, logoutUser, updateEngagementViewData} from '../store/datamodels/General';
import {MatchState, setMatchViewData} from '../store/datamodels/Match';
import {RootState} from '../store/index';
import {removeTokenFromLocalStorage, setTokenInLocalStorage} from '../util/Token';
import {ServerDTO, UserDTO} from '../services/requests/DTO';

import {MainState, setMainViewData} from '../store/datamodels/Main';
import {UserContextValue} from '../store/UserContext';

export const updateMatchViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: MatchState = {} as MatchState;

   const matchViewData: MatchViewDTO = await fetchMatchViewData();
   const matchCountryData: ServerDTO[] = await fetchMatchesPerCountry();

   const {matchTotal, matchesLastMonth, matchesLastYear, matchesPerTeam, meetingsPerMatch} = matchViewData;

   const {todayCount, todayDate} = DataMappingService.mapDataForToday(matchesLastMonth);

   result.totalData = matchTotal;
   result.todayCount = todayCount;
   result.todayDate = todayDate;

   result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(matchesLastMonth);
   result.lastYearCount = DataMappingService.getTotalNumberInPeriod(matchesLastYear);

   result.lastYearData = DataMappingService.mapLastYearData(matchesLastYear, true);
   result.lastMonthBarChartData = DataMappingService.mapLastMonthData(matchesLastMonth);
   result.lastYearBarChartData = DataMappingService.mapLastYearData(matchesLastYear, false);

   result.perTeamData = DataMappingService.mapGeneralChartData(matchesPerTeam);
   result.perCountryData = DataMappingService.mapGeneralChartData(matchCountryData);
   result.meetingsPerMatchData = DataMappingService.mapGeneralChartData(meetingsPerMatch);

   dispatch(setMatchViewData(result));
};

export const updateAccountViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: AccountState = {} as AccountState;

   const AccountData: AccountViewDTO = await fetchAccountData();

   const {
      meetingTotal,
      eventTotal,
      teamWithMostMeetings,
      dollarEventCount,
      currencyData,
      eventsLastMonth,
      eventsLastYear,
      meetingData,
      teamDollarEventData,
   } = AccountData;

   result.meetingTotal = meetingTotal;
   result.eventTotal = eventTotal;
   result.mostMeetings = teamWithMostMeetings;
   result.dollarEventCount = dollarEventCount;

   result.eventsLastYearLineChartData = DataMappingService.mapLastYearData(eventsLastYear, true);
   result.eventsLastMonthData = DataMappingService.mapLastMonthData(eventsLastMonth);
   result.eventsLastYearBarChartData = DataMappingService.mapLastYearData(eventsLastYear, false);

   result.currencyData = DataMappingService.mapGeneralChartData(currencyData);
   result.meetingsPerTeam = DataMappingService.mapGeneralChartData(meetingData);
   result.teamDollarEventData = DataMappingService.mapGeneralChartData(teamDollarEventData);

   dispatch(setAccountViewData(result));
};

export const updateMainViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: MainState = {} as MainState;

   result.usersTotal = await fetchTotalUsers();
   result.teamsTotal = await fetchTotalTeams();
   result.matchTotal = await fetchTotalMatches();
   result.meetingTotal = await fetchTotalMeetings();

   const usersLastYear = await fetchUsersLastYear();
   result.usersLastYearLineChartData = DataMappingService.mapLastYearData(usersLastYear, true);
   result.usersLastYearBarChartData = DataMappingService.mapLastYearData(usersLastYear, false);

   const teamsLastYear = await fetchTeamsLastYear();
   result.teamsLastYearData = DataMappingService.mapLastYearData(teamsLastYear, true);

   const matchesLastYear = await fetchMatchesLastYear();
   result.matchesLastYearData = DataMappingService.mapLastYearData(matchesLastYear, true);

   const teamsLastMonth = await fetchTeamsLastMonth();
   result.teamsLastMonthData = DataMappingService.mapLastMonthData(teamsLastMonth);

   const userGenderStats = await fetchUserGenderData();
   result.userGenderStats = DataMappingService.mapGeneralChartData(userGenderStats);

   dispatch(setMainViewData(result));
};

export const setEngagementViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const engagementData = {
      groupEngagement: null,
      userEngagement: null,
   };

   const groupData = await fetchTeamEngagementData();
   engagementData.groupEngagement = groupData.groupEngagement;

   engagementData.userEngagement = await fetchActiveUserData();

   dispatch(updateEngagementViewData(engagementData));
};

export const login = (
   username: string,
   password: string,
   userContext: UserContextValue
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const dto: UserDTO = await fetchLogin(username, password);

   const user = {
      name: dto.firstName + ' ' + dto.lastName,
      email: dto.email,
      phone: dto.phoneNumber,
      gender: dto.gender,
      token: dto.token,
   };

   userContext.setUser(user);

   setTokenInLocalStorage(dto);
   dispatch(loginUser(user));
};

export const logout = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   removeTokenFromLocalStorage();

   window.location.href = '/';

   dispatch(logoutUser());
};
