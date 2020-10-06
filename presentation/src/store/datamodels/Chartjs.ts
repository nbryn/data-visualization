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
   aggregateData?: number[];
};

export type ChartjsLastMonthData = {
   lastMonth: ChartjsData;
   lastWeek: ChartjsData;
   aggregateData: number[];
   aggregateDataWeek?: number[];
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
export default function (state = initialChartjsState, action: ChartjsAction): ChartjsState {
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

export const defaultChartjsData: ChartjsData = {
   labels: [],
   data: [],
   counter: 0,
};

export const initialChartjsState: ChartjsState = {
   teamsLastWeekBarChart: defaultChartjsData,
   teamsLastMonthBarChart: defaultChartjsData,
   teamsLastYearBarChart: defaultChartjsData,
   teamsLastWeekLineChart: defaultChartjsData,
   teamsLastMonthLineChart: defaultChartjsData,
   teamsLastYearLineChart: defaultChartjsData,
   usersLastMonthLineChart: defaultChartjsData,
   usersLastWeekLineChart: defaultChartjsData,
   usersLastYearLineChart: defaultChartjsData,
   usersLastMonthBarChart: defaultChartjsData,
   usersLastWeekBarChart: defaultChartjsData,
   usersLastYearBarChart: defaultChartjsData,
   genderData: {
      labels: [],
      data: [],
   },
   usersTotal: 0,
   teamsTotal: 0,
   matchTotal: 0,
   meetingTotal: 0,
};
