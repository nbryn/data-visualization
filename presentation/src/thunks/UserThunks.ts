import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchUserViewData,
    fetchUsersLastYear,
    fetchUsersLastMonth,
    fetchUsersPerCountry,
    fetchUsersPerNGO,
} from '../services/requests';
import { RootState } from '../store/index';

import {
    UserState,
    setUserViewData,
    setChartjsLastYearUserData,
    setChartjsLastMonthUserData,
} from '../store/datamodels/User';

export const updateUserViewData = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    // @ts-ignore
    const result: UserState = {};

    const userData: any = await fetchUserViewData();
    const userCountryData: any = await fetchUsersPerCountry();
    const userNGOData: any = await fetchUsersPerNGO();

    const {
        userCount,
        usersLastMonth,
        usersLastYear,
        userGenderStats,
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
    result.genderStats = DataMappingService.mapGeneralChartData(
        userGenderStats
    );

    dispatch(setUserViewData(result));
};

export const updateUsersLastMonthChartjs = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const data = await fetchUsersLastMonth();

    const usersLastMonth = DataMappingService.mapChartjsLastMonthData(data);

    dispatch(setChartjsLastMonthUserData(usersLastMonth));
};

export const updateUsersLastYearChartjs = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const data = await fetchUsersLastYear();

    const usersLastYear = DataMappingService.mapChartjsLastYearData(data);

    dispatch(setChartjsLastYearUserData(usersLastYear));
};
