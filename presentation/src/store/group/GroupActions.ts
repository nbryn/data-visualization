
import {
  GROUPS_LAST_MONTH_BAR_CHART,
  GROUPS_LAST_YEAR_BAR_CHART,
  GROUPS_LAST_MONTH_LINE_CHART,
  GROUPS_LAST_YEAR_LINE_CHART,
  GROUP_STATS,
  GROUP_SIZE_STATS,
  GROUPS_TOTAL,
  GROUPS_LAST_MONTH,
  GROUPS_LAST_YEAR,
  GroupAction
} from './GroupTypes';


export function groupsTotal(data: number): GroupAction {
  return {
    type: GROUPS_TOTAL,
    payload: data
  };
}

export function groupStats(data: any): GroupAction {
  return {
    type: GROUP_STATS,
    payload: data
  };
}

export function groupSizeStats(data: any): GroupAction {
  return {
    type: GROUP_SIZE_STATS,
    payload: data
  };
}

export function groupsLastMonthBarChart(data: any): GroupAction {
  return {
    type: GROUPS_LAST_MONTH_BAR_CHART,
    payload: data
  };
}

export function groupsLastYearBarChart(data: any): GroupAction {
  return {
    type: GROUPS_LAST_YEAR_BAR_CHART,
    payload: data
  };
}

export function groupsLastMonthLineChart(data: any): GroupAction {
  return {
    type: GROUPS_LAST_MONTH_LINE_CHART,
    payload: data
  };
}

export function groupsLastYearLineChart(data: any): GroupAction {
  return {
    type: GROUPS_LAST_YEAR_LINE_CHART,
    payload: data
  };
}

export function groupsLastMonth(data: any): GroupAction {
  return {
    type: GROUPS_LAST_MONTH,
    payload: data
  };
}

export function groupsLastYear(data: any): GroupAction {
  return {
    type: GROUPS_LAST_YEAR,
    payload: data
  };
}
