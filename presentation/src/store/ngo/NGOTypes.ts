export const GROUP_DATA = 'GROUP_DATA';
export const GROUPS_PER_NGO = 'GROUPS_PER_NGO';
export const USERS_PER_NGO = 'USERS_PER_NGO';
export const NGO_GROUPS = 'NGO_GROUPS';

export interface NGOAction {
  type: any;
  payload: any;
}

export interface NGOState {
  [key: string]: any;
  groupData: Array<any>;
  groupsPerNGO: Array<any>;
  usersPerNGO: Array<any>;
  ngoGroups: Array<any>;
}

export const initialNGOState = {
  groupData: [],
  groupsPerNGO: [],
  usersPerNGO: [],
  ngoGroups: []
};
