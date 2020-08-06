import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchUserViewData,
    fetchUsersLastYear,
    fetchUsersLastMonth,
    fetchUsersPerCountry,
    fetchUsersPerNGO,
    UserViewDto
} from '../services/requests';
import { RootState } from '../store/index';

import {
    ChartjsData,
    ChartjsLastMonthData,
    setUserViewData,
    setChartjsLastYearUserData,
    setChartjsLastMonthUserData,
    UserState,
} from '../store/datamodels/User';
import {LastMonthDto, LastYearDto, ServerDto} from '../services/requests/Dto';

export const updateUserViewData = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const result: UserState = {} as UserState;

    const userData: UserViewDto = await fetchUserViewData();
    const userCountryData: ServerDto[] = await fetchUsersPerCountry();
    const userNGOData: ServerDto[] = await fetchUsersPerNGO();

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
    const dto: LastMonthDto[] = await fetchUsersLastMonth();

    const usersLastMonth: ChartjsLastMonthData = DataMappingService.mapChartjsLastMonthData(dto);

    dispatch(setChartjsLastMonthUserData(usersLastMonth));
};

export const updateUsersLastYearChartjs = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const dto: LastYearDto[] = await fetchUsersLastYear();

    const usersLastYear: ChartjsData = DataMappingService.mapChartjsLastYearData(dto);

    dispatch(setChartjsLastYearUserData(usersLastYear));
};
