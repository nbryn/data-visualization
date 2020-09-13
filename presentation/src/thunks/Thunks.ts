import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {
   fetchGroupsLastYear,
   fetchGroupsLastMonth,
   fetchMeetingsLastYear,
   fetchTotalGroups,
   fetchTotalMeetings,
   fetchTotalShares,
   fetchUserGenderData,
   fetchTotalUsers,
   fetchUsersLastYear,
   fetchLogin,
   fetchActiveUserData,
   fetchGroupEngagementData,
   FinanceViewDto,
   MeetingViewDto,
} from '../services/requests';
import * as DataMappingService from '../services/DataMappingService';
import {fetchFinanceData} from '../services/requests/finance/FinanceViewDataRequest';
import {fetchMeetingViewData} from '../services/requests/meeting/MeetingViewDataRequest';
import {fetchMeetingsPerCountry} from '../services/requests/meeting/MeetingsPerCountryRequest';
import {FinanceState, setFinanceViewData} from '../store/datamodels/Finance';
import {loginUser, logoutUser, updateEngagementViewData} from '../store/datamodels/General';
import {MeetingState, setMeetingViewData} from '../store/datamodels/Meeting';
import {RootState} from '../store/index';
import {removeTokenFromLocalStorage, setTokenInLocalStorage} from '../util/Token';
import {ServerDto, UserDto} from '../services/requests/Dto';

import {MainState, setMainViewData} from '../store/datamodels/Main';
import {UserContextValue} from '../store/UserContext';

export const updateMeetingViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: MeetingState = {} as MeetingState;

   const meetingViewData: MeetingViewDto = await fetchMeetingViewData();
   const meetingsCountryData: ServerDto[] = await fetchMeetingsPerCountry();

   const {meetingTotal, meetingsLastMonth, meetingsLastYear, meetingsPerGroup, sharesPerMeeting} = meetingViewData;

   const {todayCount, todayDate} = DataMappingService.mapDataForToday(meetingsLastMonth);

   result.totalData = meetingTotal;
   result.todayCount = todayCount;
   result.todayDate = todayDate;

   result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(meetingsLastMonth);
   result.lastYearCount = DataMappingService.getTotalNumberInPeriod(meetingsLastYear);

   result.lastYearData = DataMappingService.mapLastYearData(meetingsLastYear, true);
   result.lastMonthBarChartData = DataMappingService.mapLastMonthData(meetingsLastMonth);
   result.lastYearBarChartData = DataMappingService.mapLastYearData(meetingsLastYear, false);

   result.perGroupData = DataMappingService.mapGeneralChartData(meetingsPerGroup);
   result.perCountryData = DataMappingService.mapGeneralChartData(meetingsCountryData);
   result.sharesPerMeetingData = DataMappingService.mapGeneralChartData(sharesPerMeeting);

   dispatch(setMeetingViewData(result));
};

export const updateFinanceViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: FinanceState = {} as FinanceState;

   const financeStatsData: FinanceViewDto = await fetchFinanceData();

   const {
      shareTotal,
      loanTotal,
      mostShares,
      etbOnLoan,
      currencyStats,
      loansLastMonth,
      loansLastYear,
      shareStats,
      groupEtbLoan,
   } = financeStatsData;

   result.sharesTotal = shareTotal;
   result.loansTotal = loanTotal;
   result.mostShares = mostShares;
   result.etbOnLoan = etbOnLoan;

   result.loansLastYearLineChartData = DataMappingService.mapLastYearData(loansLastYear, true);
   result.loansLastMonthData = DataMappingService.mapLastMonthData(loansLastMonth);
   result.loanslastYearBarChartData = DataMappingService.mapLastYearData(loansLastYear, false);

   result.currencyStats = DataMappingService.mapGeneralChartData(currencyStats);
   result.sharesPerGroup = DataMappingService.mapGeneralChartData(shareStats);
   result.groupEtbLoan = DataMappingService.mapGeneralChartData(groupEtbLoan);

   dispatch(setFinanceViewData(result));
};

export const updateMainViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: MainState = {} as MainState;

   result.usersTotal = await fetchTotalUsers();
   result.groupsTotal = await fetchTotalGroups();
   result.meetingsTotal = await fetchTotalMeetings();
   result.sharesTotal = await fetchTotalShares();

   const usersLastYear = await fetchUsersLastYear();
   result.usersLastYearLineChartData = DataMappingService.mapLastYearData(usersLastYear, true);
   result.usersLastYearBarChartData = DataMappingService.mapLastYearData(usersLastYear, false);

   const groupsLastYear = await fetchGroupsLastYear();
   result.groupsLastYearData = DataMappingService.mapLastYearData(groupsLastYear, true);

   const meetingsLastYear = await fetchMeetingsLastYear();
   result.meetingsLastYearData = DataMappingService.mapLastYearData(meetingsLastYear, true);

   const groupsLastMonth = await fetchGroupsLastMonth();
   result.groupsLastMonthData = DataMappingService.mapLastMonthData(groupsLastMonth);

   const userGenderStats = await fetchUserGenderData();
   result.userGenderStats = DataMappingService.mapGeneralChartData(userGenderStats);

   dispatch(setMainViewData(result));
};

export const setEngagementViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const engagementData = {
      groupEngagement: null,
      userEngagement: null,
   };

   const groupData = await fetchGroupEngagementData();
   engagementData.groupEngagement = groupData.groupEngagement;

   engagementData.userEngagement = await fetchActiveUserData();

   dispatch(updateEngagementViewData(engagementData));
};

export const login = (
   username: string,
   password: string,
   userContext: UserContextValue
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const dto: UserDto = await fetchLogin(username, password);

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
