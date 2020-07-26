export const GROUPS_TOTAL = 'GROUPS_TOTAL';
export const GROUP_STATS = 'GROUPS_STATS';
export const GROUPS_LAST_MONTH = 'GROUPS_LAST_MONTH';
export const GROUPS_LAST_YEAR = 'GROUPS_LAST_YEAR';

export interface GroupAction {
  type: any;
  payload: any;
}

export interface GroupState {
  [key: string]: any;
  groupsTotal: number;
  groupsLastWeek: Array<any>;
  groupsLastMonth: Array<any>;
  groupsLastYear: Array<any>;
  groupStats: any;
}

export const initialGroupState = {
  groupStats: [],
  groupsTotal: 0,
  groupsLastWeek: [],
  groupsLastMonth: [],
  groupsLastYear: []
};
