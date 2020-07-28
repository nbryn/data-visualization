import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';
import { RootState } from '../store/index';

export const updateDataForGeneralChart = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const result: any = DataMappingService.mapTopBarChartData(data);

    dispatch(action(result));
};

export const updateDataForToday = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const temp: any = DataMappingService.mapLastMonthBarChartData(data);

    const todayCount: number = temp[temp.length - 1].value;
    const todayDate: string = temp[temp.length - 1].name;

    const result = {
        todayCount,
        todayDate,
    }

    dispatch(action(result));
};

export const updateDataForTotal = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const total: number = await request();

    dispatch(action(total));
};

export const updateDataForPeriod = (
    request: Function,
    action: Function
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const data: any = await request();

    const total: number = DataMappingService.getTotalNumberInPeriod(data);

    dispatch(action(total));
};

export const updateDataForLastMonthBarChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = DataMappingService.mapLastMonthBarChartData(tempData);

    dispatch(action(result));
};

export const updateDataForLastYearBarChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = DataMappingService.mapLastYearBarChartData(tempData)

    dispatch(action(result));
};

export const updateDataForLastYearLineChart = (
    request: Function,
    action: Function,
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await request();

    const result: any = DataMappingService.mapLastYearLineChartData(tempData)

    dispatch(action(result));
};
