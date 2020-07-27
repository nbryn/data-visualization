import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as ResponseMappingService from '../services/ResponseMappingService';
import { RootState } from '../store/index';

export const setGeneralStat = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const result: any = ResponseMappingService.mapGeneralStat(data);

    dispatch(action(result));
};

export const setToday = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const temp: any = ResponseMappingService.mapLastMonthBarChartData(data);

    const todayCount: number = temp[temp.length - 1].value;
    const todayDate: string = temp[temp.length - 1].name;

    const result = {
        todayCount,
        todayDate,
    }

    dispatch(action(result));
};

export const setTotal = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const total: number = await request();

    dispatch(action(total));
};

export const setPeriod = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const total: number = ResponseMappingService.getTotalNumberInPeriod(data);

    dispatch(action(total));
};

export const setLastMonthBarChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = ResponseMappingService.mapLastMonthBarChartData(tempData);

    dispatch(action(result));
};

export const setLastYearBarChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = ResponseMappingService.mapLastYearBarChartData(tempData)

    dispatch(action(result));
};

export const setLastYearLineChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = ResponseMappingService.mapLastYearLineChartData(tempData)

    dispatch(action(result));
};
