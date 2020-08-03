import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchDataForGroup,
    fetchGroupsPerCountry,
    fetchGroupsPerNGO,
    fetchGroupData,
    fetchGroupsForNGO,
} from '../services/requests';

import {
    GroupState,
    updateGroupViewData,
    updateGroupSearchData,
    updateNGOGroupData,
} from '../store/datamodels/Group';
import { RootState } from '../store/index';

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

    const {
        groupTotal,
        groupSize,
        groupsLastMonth,
        groupsLastYear,
    } = groupData;

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

    dispatch(updateGroupViewData(result));
};

export const setGroupSearchData = (
    group: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: any = await fetchDataForGroup(group);

    const groupData: any = DataMappingService.mapGroupSearchData(result);

    dispatch(updateGroupSearchData(groupData));
};

export const setNGOGroupsData = (
    ngo: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: any = await fetchGroupsForNGO(ngo);

    const groupData: any = DataMappingService.mapNGOGroupsData(result);

    dispatch(updateNGOGroupData(groupData));
};
