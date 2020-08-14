import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import * as DataMappingService from '../services/DataMappingService';

import {
    fetchDataForGroup,
    fetchGroupsPerCountry,
    fetchGroupsPerNGO,
    fetchGroupViewData,
    fetchGroupsForNGO,
    GroupDto,
    GroupViewDto,
} from '../services/requests';
import {
    GroupData,
    GroupDataProp,
    GroupState,
    setGroupViewData,
    setGroupSearchData,
    setNGOGroupData,
} from '../store/datamodels/Group';
import {RootState} from '../store/index';
import {ServerDto} from '../services/requests/Dto';

export const updateGroupViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const result: GroupState = {} as GroupState;

    const groupData: GroupViewDto = await fetchGroupViewData();
    const groupCountryData: ServerDto[] = await fetchGroupsPerCountry();
    const groupNGOData: ServerDto[] = await fetchGroupsPerNGO();

    const {groupTotal, groupSize, groupsLastMonth, groupsLastYear} = groupData;

    const {todayDate, todayCount} = DataMappingService.mapDataForToday(groupsLastMonth);

    result.total = groupTotal;
    result.todayCount = todayCount;
    result.todayDate = todayDate;
    result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(groupsLastMonth);
    result.lastYearCount = DataMappingService.getTotalNumberInPeriod(groupsLastYear);

    result.lastYearLineChartData = DataMappingService.mapLastYearLineChartData(groupsLastYear);
    result.lastYearBarChartData = DataMappingService.mapLastYearBarChartData(groupsLastYear);
    result.lastMonthBarChartData = DataMappingService.mapLastMonthBarChartData(groupsLastMonth);

    result.perCountryData = DataMappingService.mapGeneralChartData(groupCountryData);
    result.perNGOData = DataMappingService.mapGeneralChartData(groupNGOData);
    result.groupSizeStats = DataMappingService.mapGeneralChartData(groupSize);

    dispatch(setGroupViewData(result));
};

export const updateGroupSearchData = (group: string): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const dto: GroupDto = await fetchDataForGroup(group);

    const groupData: GroupDataProp = DataMappingService.mapGroupSearchData(dto);

    dispatch(setGroupSearchData(groupData));
};

export const updateNGOGroupsData = (ngo: string): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const dto: GroupDto[] = await fetchGroupsForNGO(ngo);

    const groupData: GroupData[] = DataMappingService.mapNGOGroupsData(dto);

    dispatch(setNGOGroupData(groupData));
};
