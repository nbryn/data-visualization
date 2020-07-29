const UPDATE_MAIN_VIEW_DATA = 'UPDATE_MAIN_VIEW_DATA';

export interface MainAction {
  type: any;
  payload: MainState;
}

export function updateMainViewData(data: MainState): MainAction {
  return {
    type: UPDATE_MAIN_VIEW_DATA,
    payload: data
  };
}
export default function (state = {}, action: MainAction) {
  switch (action.type) {
    case UPDATE_MAIN_VIEW_DATA:
      return Object.assign({}, state, {
        groupSizeStats: action.payload.groupSizeStats,
        usersTotal: action.payload.usersTotal,
        groupsTotal: action.payload.groupsTotal,
        meetingsTotal: action.payload.meetingsTotal,
        sharesTotal: action.payload.sharesTotal,
        usersLastBarChartData: action.payload.usersLastYearBarChartData,
        usersLastYearLineChartData: action.payload.usersLastYearLineChartData,
        usersLastYearBarChartData: action.payload.usersLastYearBarChartData,
        meetingsLastYearData: action.payload.meetingsLastYearData,
        groupsLastMonthData: action.payload.groupsLastMonthData,
        groupsLastYearData: action.payload.groupsLastYearData,
        userGenderStats: action.payload.userGenderStats
      });

    default:
      return state;
  }
}

export interface MainState {
  [key: string]: any;
  usersTotal: number;
  groupsTotal: number;
  meetingsTotal: string;
  sharesTotal: number;
  usersLastYearBarChartData: Array<any>;
  usersLastYearLineChartData: Array<any>;
  groupsLastMonthData: Array<any>;
  groupsLastYearData: Array<any>;
  meetingsLastYearData: Array<any>;
  userGenderStats: Array<any>;
}

export const initialMainState: MainState = {
  usersTotal: 0,
  groupsTotal: 0,
  meetingsTotal: '',
  sharesTotal: 0,
  usersLastYearBarChartData: [],
  usersLastYearLineChartData: [],
  groupsLastYearData: [],
  meetingsLastYearData: [],
  groupsLastMonthData: [],
  userGenderStats: []
};
