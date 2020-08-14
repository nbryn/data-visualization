import {ChartData} from './General';

// Actions
const UPDATE_GROUP_VIEW_DATA = 'UPDATE_GROUP_VIEW_DATA';
const UPDATE_NGO_GROUP_DATA = 'UPDATE_NGO_GROUP_DATA';
const UPDATE_GROUP_SEARCH_DATA = 'UPDATE_GROUP_SEARCH_DATA';

// Action Types
export interface GroupViewAction {
    type: typeof UPDATE_GROUP_VIEW_DATA;
    payload: GroupState;
}

export interface GroupSearchAction {
    type: typeof UPDATE_GROUP_SEARCH_DATA;
    payload: GroupDataProp;
}

export interface NGOGroupDataAction {
    type: typeof UPDATE_NGO_GROUP_DATA;
    payload: GroupData[];
}

type GroupActions = GroupViewAction | GroupSearchAction | NGOGroupDataAction;

// Reducers
export default function (state = {}, action: GroupActions) {
    switch (action.type) {
        case UPDATE_GROUP_VIEW_DATA:
            return Object.assign({}, state, {
                groupSizeStats: action.payload.groupSizeStats,
                total: action.payload.total,
                todayCount: action.payload.todayCount,
                todayDate: action.payload.todayDate,
                lastMonthCount: action.payload.lastMonthCount,
                lastYearCount: action.payload.lastYearCount,
                lastMonthBarChartData: action.payload.lastYearBarChartData,
                lastYearBarChartData: action.payload.lastYearBarChartData,
                lastMonthLineChartData: action.payload.lastMonthLineChartData,
                lastYearLineChartData: action.payload.lastYearLineChartData,
                perCountryData: action.payload.perCountryData,
                perNGOData: action.payload.perNGOData,
            });
        case UPDATE_GROUP_SEARCH_DATA:
            return Object.assign({}, state, {
                searchData: action.payload,
            });
        case UPDATE_NGO_GROUP_DATA:
            return Object.assign({}, state, {
                ngoGroupData: action.payload,
            });

        default:
            return state;
    }
}

// Action Creators
export function setGroupViewData(data: GroupState): GroupViewAction {
    return {
        type: UPDATE_GROUP_VIEW_DATA,
        payload: data,
    };
}

export function setGroupSearchData(data: GroupDataProp): GroupSearchAction {
    return {
        type: UPDATE_GROUP_SEARCH_DATA,
        payload: data,
    };
}

export function setNGOGroupData(data: GroupData[]): NGOGroupDataAction {
    return {
        type: UPDATE_NGO_GROUP_DATA,
        payload: data,
    };
}

export type GroupData = {
    [key: string]: string | number | string[] | undefined;
    id?: number;
    name?: string;
    admin: string;
    amountPerShare: number;
    boxBalance: number;
    currency: string;
    lastMeeting: string;
    members: string[];
    owner: string;
    registrationDate: string;
    totalMeetings: number;
    totalLoans: number;
    totalShares: number;
};

export type GroupDataProp = Array<string | number | string[] | undefined>;

export interface GroupState {
    [key: string]: string | number | ChartData[] | GroupData | GroupData[] | GroupDataProp;
    total: number;
    todayCount: number;
    todayDate: string;
    lastMonthCount: number;
    lastYearCount: number;
    lastMonthBarChartData: ChartData[];
    lastYearBarChartData: ChartData[];
    lastMonthLineChartData: ChartData[];
    lastYearLineChartData: ChartData[];
    groupSizeStats: ChartData[];
    perCountryData: ChartData[];
    perNGOData: ChartData[];
    searchData: GroupDataProp;
    ngoGroupData: GroupData[];
}

export const initialGroupState: GroupState = {
    groupSizeStats: [],
    total: 0,
    todayCount: 0,
    todayDate: '',
    lastMonthCount: 0,
    lastYearCount: 0,
    lastMonthBarChartData: [],
    lastYearBarChartData: [],
    lastMonthLineChartData: [],
    lastYearLineChartData: [],
    perCountryData: [],
    perNGOData: [],
    searchData: [],
    ngoGroupData: [],
};
