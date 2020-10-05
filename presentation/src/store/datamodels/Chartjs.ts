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
   aggregateDataMonth: number[];
   aggregateDataWeek: number[];
   lastMonth: ChartjsData;
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

const defaultData: ChartjsData = {
   labels: [],
   data: [],
   counter: 0,
};

export const initialChartjsState: ChartjsState = {
   teamsLastWeekBarChart: defaultData,
   teamsLastMonthBarChart: defaultData,
   teamsLastYearBarChart: defaultData,
   teamsLastWeekLineChart: defaultData,
   teamsLastMonthLineChart: defaultData,
   teamsLastYearLineChart: defaultData,
   usersLastMonthLineChart: defaultData,
   usersLastWeekLineChart: defaultData,
   usersLastYearLineChart: defaultData,
   usersLastMonthBarChart: defaultData,
   usersLastWeekBarChart: defaultData,
   usersLastYearBarChart: defaultData,
   genderData: {
      labels: [],
      data: [],
   },
   usersTotal: 0,
   teamsTotal: 0,
   matchTotal: 0,
   meetingTotal: 0,
};
