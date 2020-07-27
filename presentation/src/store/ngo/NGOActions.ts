import { GROUP_DATA, GROUPS_PER_NGO, NGO_GROUPS, NGOAction } from './NGOTypes';

export function groupData(data: any): NGOAction {
  return {
    type: GROUP_DATA,
    payload: data
  };
}

export function groupsPerNGO(data: any): NGOAction {
  return {
    type: GROUPS_PER_NGO,
    payload: data
  };
}

export function ngoGroups(data: any): NGOAction {
  return {
    type: NGO_GROUPS,
    payload: data
  };
}
