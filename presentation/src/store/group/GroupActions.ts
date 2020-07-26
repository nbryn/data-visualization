import {
    GROUPS_LAST_MONTH,
    GROUPS_LAST_YEAR,
    GROUP_STATS,
    GROUPS_TOTAL,
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