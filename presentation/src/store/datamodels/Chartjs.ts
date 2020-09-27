// Actions
const UPDATE_CHARTJS_DATA = 'UPDATE_CHARTJS_DATA';

export type ChartjsPieData = {
   labels: string[];
   data: number[];
};

export type ChartjsData = {
   labels: string[];
   data: number[];
   counter: number;
};

export type ChartjsLastMonthData = {
   labels: string[];
   data: number[];
   counter: number;
   lastWeek: ChartjsData;
};

export interface ChartjsAction {
   type: typeof UPDATE_CHARTJS_DATA;
   payload: ChartjsState;
}

// Actions Creators
export function setChartjsData(data: ChartjsState): ChartjsAction {
   return {
      type: UPDATE_CHARTJS_DATA,
      payload: data,
   };
}

// Reducers
export default function (state = {}, action: ChartjsAction) {
   switch (action.type) {
      case UPDATE_CHARTJS_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      default:
         return state;
   }
}

export interface ChartjsState {
   [key: string]: number | ChartjsData | any;
   teamsLastWeekBarChart: ChartjsData;
   teamsLastMonthBarChart: ChartjsData;
   teamsLastYearBarChart: ChartjsData;
   teamsLastWeekLineChart: ChartjsData;
   teamsLastMonthLineChart: ChartjsData;
   teamsLastYearLineChart: ChartjsData;
   usersLastMonthLineChart: ChartjsData;
   usersLastWeekLineChart: ChartjsData;
   usersLastYearLineChart: ChartjsData;
   usersLastMonthBarChart: ChartjsData;
   usersLastWeekBarChart: ChartjsData;
   usersLastYearBarChart: ChartjsData;
   genderData: ChartjsPieData | null;
   usersTotal: number;
   teamsTotal: number;
   matchTotal: number;
   meetingTotal: number;
}

export const initialChartjsState: ChartjsState = {
   teamsLastWeekBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   teamsLastMonthBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   teamsLastYearBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   teamsLastWeekLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   teamsLastMonthLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   teamsLastYearLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastMonthLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastWeekLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastYearLineChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastMonthBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastWeekBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   usersLastYearBarChart: {
      labels: [],
      counter: 0,
      data: [],
   },
   genderData: {
      labels: [],
      data: [],
   },
   usersTotal: 0,
   teamsTotal: 0,
   matchTotal: 0,
   meetingTotal: 0,
};
