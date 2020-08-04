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
    setGroupViewData,
    setGroupSearchData,
    setNGOGroupData,
} from '../store/datamodels/Group';
import { RootState } from '../store/index';
import {ServerData} from '../store/datamodels/General';

export const updateGroupViewData = (): ThunkAction<
    void,
    RootState,
    null,
    Action<string>
> => async (dispatch) => {
    const result: GroupState = {} as GroupState;

    const groupData: any = await fetchGroupData();
    const groupCountryData: ServerData[] = await fetchGroupsPerCountry();
    const groupNGOData: ServerData[] = await fetchGroupsPerNGO();

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

    dispatch(setGroupViewData(result));
};

export const updateGroupSearchData = (
    group: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: any = await fetchDataForGroup(group);

    const groupData: any = DataMappingService.mapGroupSearchData(result);

    dispatch(setGroupSearchData(groupData));
};

export const updateNGOGroupsData = (
    ngo: string
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: any = await fetchGroupsForNGO(ngo);

    const groupData: any = DataMappingService.mapNGOGroupsData(result);

    dispatch(setNGOGroupData(groupData));
};
