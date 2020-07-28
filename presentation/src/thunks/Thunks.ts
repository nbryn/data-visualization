import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  fetchGroupsLastYear,
  fetchGroupsLastMonth,
  fetchMeetingsLastYear,
  fetchTotalGroups,
  fetchTotalMeetings,
  fetchTotalShares,
  fetchUserGenderStats,
  fetchTotalUsers,
  fetchUsersLastYear
} from '../services/requests';

import * as DataMappingService from '../services/DataMappingService';
import { fetchFinanceData } from '../services/requests/finance/FinanceDataRequest';
import { fetchGroupData } from '../services/requests/group/GroupDataRequest';
import { fetchGroupsPerCountry } from '../services/requests/group/GroupsPerCountryRequest';
import { fetchGroupsPerNGO } from '../services/requests/group/GroupsPerNGORequest';
import { fetchMeetingData } from '../services/requests/meeting/MeetingStatsRequest';
import { fetchMeetingsPerCountry } from '../services/requests/meeting/MeetingsPerCountryRequest';
import { fetchUserData } from '../services/requests/user/UserDataRequest';
import { fetchUsersPerCountry } from '../services/requests/user/UsersPerCountryRequest';
import { fetchUsersPerNGO } from '../services/requests/user/UsersPerNGORequest';

import { RootState } from '../store/index';

import { FinanceState, updateFinanceData } from '../store/Finance';
import { GroupState, updateGroupData } from '../store/Group';
import { MeetingState, updateMeetingData } from '../store/Meeting';
import { MainState, updateMainData } from '../store/Main';
import { UserState, updateUserData } from '../store/User';

export const fetchMeetingViewData = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  // @ts-ignore
  const result: MeetingState = {};

  const meetingStatsData: any = await fetchMeetingData();
  const meetingsCountryData: any = await fetchMeetingsPerCountry();

  const {
    meetingTotal,
    meetingsLastMonth,
    meetingsLastYear,
    meetingsPerGroup,
    sharesPerMeeting
  } = meetingStatsData;

  const { todayCount, todayDate } = DataMappingService.mapDataForToday(
    meetingsLastMonth
  );

  result.totalData = meetingTotal;
  result.todayCount = todayCount;
  result.todayDate = todayDate;

  result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(
    meetingsLastMonth
  );
  result.lastYearCount = DataMappingService.getTotalNumberInPeriod(
    meetingsLastYear
  );

  result.lastYearData = DataMappingService.mapLastYearLineChartData(
    meetingsLastYear
  );
  result.lastMonthBarChartData = DataMappingService.mapLastMonthBarChartData(
    meetingsLastMonth
  );
  result.lastYearBarChartData = DataMappingService.mapLastYearBarChartData(
    meetingsLastYear
  );

  result.perGroupData = DataMappingService.mapGeneralChartData(
    meetingsPerGroup
  );
  result.perCountryData = DataMappingService.mapGeneralChartData(
    meetingsCountryData
  );
  result.sharesPerMeetingData = DataMappingService.mapGeneralChartData(
    sharesPerMeeting
  );

  dispatch(updateMeetingData(result));
};

export const fetchFinanceViewData = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  // @ts-ignore
  const result: FinanceState = {};

  const financeStatsData: any = await fetchFinanceData();

  const {
    shareTotal,
    loanTotal,
    mostShares,
    etbOnLoan,
    currencyStats,
    loansLastMonth,
    loansLastYear,
    shareStats,
    groupEtbLoan
  } = financeStatsData;

  result.sharesTotal = shareTotal;
  result.loansTotal = loanTotal;
  result.mostShares = mostShares;
  result.etbOnLoan = etbOnLoan;

  result.loansLastYearLineChartData = DataMappingService.mapLastYearLineChartData(
    loansLastYear
  );
  result.loansLastMonthData = DataMappingService.mapLastMonthBarChartData(
    loansLastMonth
  );
  result.loanslastYearBarChartData = DataMappingService.mapLastYearBarChartData(
    loansLastYear
  );

  result.currencyStats = DataMappingService.mapGeneralChartData(currencyStats);
  result.sharesPerGroup = DataMappingService.mapGeneralChartData(shareStats);
  result.groupEtbLoan = DataMappingService.mapGeneralChartData(groupEtbLoan);

  dispatch(updateFinanceData(result));
};

export const fetchUserViewData = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  // @ts-ignore
  const result: UserState = {};

  const userData: any = await fetchUserData();
  const userCountryData: any = await fetchUsersPerCountry();
  const userNGOData: any = await fetchUsersPerNGO();

  const {
    userCount,
    usersLastMonth,
    usersLastYear,
    userGenderStats
  } = userData;

  const { todayDate, todayCount } = DataMappingService.mapDataForToday(
    usersLastMonth
  );

  result.total = userCount;
  result.todayCount = todayCount;
  result.todayDate = todayDate;
  result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(
    usersLastMonth
  );
  result.lastYearCount = DataMappingService.getTotalNumberInPeriod(
    usersLastYear
  );

  result.lastYearLineChartData = DataMappingService.mapLastYearLineChartData(
    usersLastYear
  );
  result.lastYearBarChartData = DataMappingService.mapLastYearBarChartData(
    usersLastYear
  );
  result.lastMonthBarChartData = DataMappingService.mapLastMonthBarChartData(
    usersLastMonth
  );

  result.perCountryData = DataMappingService.mapGeneralChartData(
    userCountryData
  );
  result.perNGOData = DataMappingService.mapGeneralChartData(userNGOData);
  result.genderStats = DataMappingService.mapGeneralChartData(userGenderStats);

  dispatch(updateUserData(result));
};

export const fetchGroupViewData = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  // @ts-ignore
  const result: GroupState = {};

  const groupData: any = await fetchGroupData();
  const groupCountryData: any = await fetchGroupsPerCountry();
  const groupNGOData: any = await fetchGroupsPerNGO();

  const { groupTotal, groupSize, groupsLastMonth, groupsLastYear } = groupData;

  const { todayDate, todayCount } = DataMappingService.mapDataForToday(
    groupsLastMonth
  );

  result.total = groupTotal;
  result.todayCount = todayCount;
  result.todayDate = todayDate;
  result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(
    groupsLastMonth
  );
  result.lastYearCount = DataMappingService.getTotalNumberInPeriod(
    groupsLastYear
  );

  result.lastYearLineChartData = DataMappingService.mapLastYearLineChartData(
    groupsLastYear
  );
  result.lastYearBarChartData = DataMappingService.mapLastYearBarChartData(
    groupsLastYear
  );
  result.lastMonthBarChartData = DataMappingService.mapLastMonthBarChartData(
    groupsLastMonth
  );

  result.perCountryData = DataMappingService.mapGeneralChartData(
    groupCountryData
  );
  result.perNGOData = DataMappingService.mapGeneralChartData(groupNGOData);
  result.groupSizeStats = DataMappingService.mapGeneralChartData(groupSize);

  dispatch(updateGroupData(result));
};

export const fetchMainViewData = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  // @ts-ignore
  const result: MainState = {};

  result.usersTotal = await fetchTotalUsers();
  result.groupsTotal = await fetchTotalGroups();
  result.meetingsTotal = await fetchTotalMeetings();
  result.sharesTotal = await fetchTotalShares();

  const usersLastYear = await fetchUsersLastYear();
  result.usersLastYearLineChartData = DataMappingService.mapLastYearLineChartData(
    usersLastYear
  );
  result.usersLastYearBarChartData = DataMappingService.mapLastYearBarChartData(
    usersLastYear
  );

  const groupsLastYear = await fetchGroupsLastYear();
  result.groupsLastYearData = DataMappingService.mapLastYearLineChartData(
    groupsLastYear
  );

  const meetingsLastYear = await fetchMeetingsLastYear();
  result.meetingsLastYearData = DataMappingService.mapLastYearLineChartData(
    meetingsLastYear
  );

  const groupsLastMonth = await fetchGroupsLastMonth();
  result.groupsLastMonthData = DataMappingService.mapLastMonthBarChartData(
    groupsLastMonth
  );

  const userGenderStats = await fetchUserGenderStats();
  result.userGenderStats = DataMappingService.mapGeneralChartData(
    userGenderStats
  );

  dispatch(updateMainData(result));
};
