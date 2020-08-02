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
    fetchUsersLastYear,
    fetchLogin,
    fetchActiveUserData,
    fetchGroupEngagementData,
} from '../services/requests';
import * as DataMappingService from '../services/DataMappingService';
import { fetchFinanceData } from '../services/requests/finance/FinanceViewDataRequest';
import { fetchMeetingData } from '../services/requests/meeting/MeetingViewDataRequest';
import { fetchMeetingsPerCountry } from '../services/requests/meeting/MeetingsPerCountryRequest';

import { RootState } from '../store/index';
import {
    removeTokenFromLocalStorage,
    setTokenInLocalStorage,
} from '../util/Token';

import {
    FinanceState,
    updateFinanceViewData,
} from '../store/datamodels/Finance';
import {
    loginUser,
    logoutUser,
    loginError,
    updateEngagementViewData,
} from '../store/datamodels/General';
import {
    MeetingState,
    updateMeetingViewData,
} from '../store/datamodels/Meeting';
import { MainState, updateMainViewData } from '../store/datamodels/Main';

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
        sharesPerMeeting,
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

    dispatch(updateMeetingViewData(result));
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
        groupEtbLoan,
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

    result.currencyStats = DataMappingService.mapGeneralChartData(
        currencyStats
    );
    result.sharesPerGroup = DataMappingService.mapGeneralChartData(shareStats);
    result.groupEtbLoan = DataMappingService.mapGeneralChartData(groupEtbLoan);

    dispatch(updateFinanceViewData(result));
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

    dispatch(updateMainViewData(result));
};

export const setEngagementViewData = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    let engagementData = {
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
    history: any
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: any = await fetchLogin(username, password);

    const error = result.error;

    if (error) {
        dispatch(loginError('Wrong Email/Username'));
    } else {
        setTokenInLocalStorage(result);

        dispatch(loginUser(result));

        history.push('/dashboard');
    }
};

export const logout = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    removeTokenFromLocalStorage();

    window.location.href = '/';

    dispatch(logoutUser());
};
