const UPDATE_GROUP_VIEW_DATA = 'UPDATE_GROUP_VIEW_DATA';
const UPDATE_NGO_GROUP_DATA = 'UPDATE_NGO_GROUP_DATA';
const UPDATE_GROUP_SEARCH_DATA = 'UPDATE_GROUP_SEARCH_DATA';

export interface GroupAction {
    type: any;
    payload: GroupState;
}

export function updateGroupViewData(data: GroupState): GroupAction {
    return {
        type: UPDATE_GROUP_VIEW_DATA,
        payload: data,
    };
}

export function updateGroupSearchData(data: any): any {
    return {
        type: UPDATE_GROUP_SEARCH_DATA,
        payload: data,
    };
}

export function updateNGOGroupData(data: any): any {
    return {
        type: UPDATE_NGO_GROUP_DATA,
        payload: data,
    };
}

// TODO: Actions and reducers not one-to-one mapping - Spread view data out
export default function (state = {}, action: GroupAction) {
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

export interface GroupState {
    [key: string]: any;
    total: number;
    todayCount: number;
    todayDate: string;
    lastMonthCount: number;
    lastYearCount: number;
    lastMonthBarChartData: Array<any>;
    lastYearBarChartData: Array<any>;
    lastMonthLineChartData: Array<any>;
    lastYearLineChartData: Array<any>;
    groupSizeStats: Array<any>;
    perCountryData: Array<any>;
    perNGOData: Array<any>;
    searchData: Array<any>;
    ngoGroupData: Array<any>;
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
