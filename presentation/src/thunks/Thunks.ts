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
   AccountViewDTO,
   MatchViewDTO,
} from '../services/requests';
import * as DTOConverterService from '../services/DTOConverterService';
import {ChartData} from '../store/datamodels/General';
import {fetchAccountData} from '../services/requests/account/AccountViewDataRequest';
import {fetchMatchViewData} from '../services/requests/match/MatchViewDataRequest';
import {fetchMatchesPerCountry} from '../services/requests/match/MatchesPerCountryRequest';
import {AccountState, setAccountViewData} from '../store/datamodels/Account';
import {loginUser, logoutUser} from '../store/datamodels/General';
import {MatchState, setMatchViewData} from '../store/datamodels/Match';
import {RootState} from '../store/index';
import {removeTokenFromLocalStorage, setTokenInLocalStorage} from '../util/Token';
import {ServerDTO, UserDTO} from '../services/requests/DTOs';

import {MainState, setMainViewData} from '../store/datamodels/Main';
import {UserContextValue} from '../store/UserContext';

export const updateMatchViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const result: MatchState = {} as MatchState;

   const matchViewData: MatchViewDTO = await fetchMatchViewData();
   const matchCountryData: ServerDTO[] = await fetchMatchesPerCountry();

   const {
      matchTotal,
      matchesLastMonth,
      matchesLastYear,
      matchesPerTeam,
      meetingsPerMatch,
   } = matchViewData;

   const {todayCount, todayDate} = DTOConverterService.mapDataForToday(matchesLastMonth);

   result.totalData = matchTotal;
   result.todayCount = todayCount;
   result.todayDate = todayDate;

   result.lastMonthCount = DTOConverterService.getTotalNumberInPeriod(matchesLastMonth);
   result.lastYearCount = DTOConverterService.getTotalNumberInPeriod(matchesLastYear);

   const lastYearChartData = DTOConverterService.mapLastYearData(matchesLastYear);
   result.lastYearBarChartData = lastYearChartData[0];
   result.lastYearData = lastYearChartData[1];
   result.lastMonthBarChartData = DTOConverterService.mapLastMonthData(matchesLastMonth);

   result.perTeamData = DTOConverterService.mapGeneralChartData(matchesPerTeam);
   result.perCountryData = DTOConverterService.mapGeneralChartData(matchCountryData);
   result.meetingsPerMatchData = DTOConverterService.mapGeneralChartData(meetingsPerMatch);

   dispatch(setMatchViewData(result));
};

export const updateAccountViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
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

   const eventsLastYearChartData = DTOConverterService.mapLastYearData(eventsLastYear);

   result.eventsLastYearBarChartData = eventsLastYearChartData[0];
   result.eventsLastYearLineChartData = eventsLastYearChartData[1];
   result.eventsLastMonthData = DTOConverterService.mapLastMonthData(eventsLastMonth);

   result.currencyData = DTOConverterService.mapGeneralChartData(currencyData);
   result.meetingsPerTeam = DTOConverterService.mapGeneralChartData(meetingData);
   result.teamDollarEventData = DTOConverterService.mapGeneralChartData(teamDollarEventData);

   dispatch(setAccountViewData(result));
};

export const updateMainViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const result: MainState = {} as MainState;

   result.usersTotal = await fetchTotalUsers();
   result.teamsTotal = await fetchTotalTeams();
   result.matchTotal = await fetchTotalMatches();
   result.meetingTotal = await fetchTotalMeetings();

   const usersLastYear = await fetchUsersLastYear();

   const usersLastYearChartData: Array<ChartData[]> = DTOConverterService.mapLastYearData(usersLastYear);

   result.usersLastYearBarChartData = usersLastYearChartData[0];
   result.usersLastYearLineChartData = usersLastYearChartData[1];

   const teamsLastYear = await fetchTeamsLastYear();
   result.teamsLastYearData = DTOConverterService.mapLastYearData(teamsLastYear)[1];

   const matchesLastYear = await fetchMatchesLastYear();
   result.matchesLastYearData = DTOConverterService.mapLastYearData(matchesLastYear)[1];

   const teamsLastMonth = await fetchTeamsLastMonth();
   result.teamsLastMonthData = DTOConverterService.mapLastMonthData(teamsLastMonth);

   const userGenderStats = await fetchUserGenderData();
   result.userGenderStats = DTOConverterService.mapGeneralChartData(userGenderStats);

   dispatch(setMainViewData(result));
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
