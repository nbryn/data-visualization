import {ChartData} from './General';

// Actions
const UPDATE_TEAM_VIEW_DATA = 'UPDATE_TEAM_VIEW_DATA';
const UPDATE_ORG_TEAM_DATA = 'UPDATE_ORG_TEAM_DATA';
const UPDATE_TEAM_SEARCH_DATA = 'UPDATE_TEAM_SEARCH_DATA';

// Action Types
export interface TeamViewAction {
   type: typeof UPDATE_TEAM_VIEW_DATA;
   payload: TeamState;
}

export interface TeamSearchAction {
   type: typeof UPDATE_TEAM_SEARCH_DATA;
   payload: TeamDataProp;
}

export interface OrgTeamDataAction {
   type: typeof UPDATE_ORG_TEAM_DATA;
   payload: TeamData[];
}

type TeamActions = TeamViewAction | TeamSearchAction | OrgTeamDataAction;

// Reducers
export default function (state = initialTeamState, action: TeamActions): TeamState {
   switch (action.type) {
      case UPDATE_TEAM_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      case UPDATE_TEAM_SEARCH_DATA:
         return Object.assign({}, state, {
            searchData: action.payload,
         });
      case UPDATE_ORG_TEAM_DATA:
         return Object.assign({}, state, {
            orgTeamData: action.payload,
         });

      default:
         return state;
   }
}

// Action Creators
export function setTeamViewData(data: TeamState): TeamViewAction {
   return {
      type: UPDATE_TEAM_VIEW_DATA,
      payload: data,
   };
}

export function setTeamSearchData(data: TeamDataProp): TeamSearchAction {
   return {
      type: UPDATE_TEAM_SEARCH_DATA,
      payload: data,
   };
}

export function setOrgTeamData(data: TeamData[]): OrgTeamDataAction {
   return {
      type: UPDATE_ORG_TEAM_DATA,
      payload: data,
   };
}

export type TeamData = {
   [key: string]: string | number | string[] | undefined;
   id?: number;
   name?: string;
   admin: string;
   perMeeting: number;
   boxBalance: number;
   currency: string;
   lastMatch: string;
   members: string[];
   owner: string;
   registrationDate: string;
   totalMatches: number;
   totalEvents: number;
   totalMeetings: number;
};

export type TeamDataProp = Array<string | number | string[] | undefined>;

export interface TeamState {
   [key: string]: string | number | ChartData[] | TeamData | TeamData[] | TeamDataProp;
   total: number;
   todayCount: number;
   todayDate: string;
   lastMonthCount: number;
   lastYearCount: number;
   lastMonthBarChartData: ChartData[];
   lastYearBarChartData: ChartData[];
   lastMonthLineChartData: ChartData[];
   lastYearLineChartData: ChartData[];
   teamSizeStats: ChartData[];
   perCountryData: ChartData[];
   perOrgData: ChartData[];
   searchData: TeamDataProp;
   orgTeamData: TeamData[];
}

export const initialTeamState: TeamState = {
   teamSizeStats: [],
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
   perOrgData: [],
   searchData: [],
   orgTeamData: [],
};
