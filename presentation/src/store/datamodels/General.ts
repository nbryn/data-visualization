const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_ENGAGEMENT_VIEW_DATA = 'UPDATE_ENGAGEMENT_VIEW_DATA';

export interface LoginAction {
    type: any;
    payload: any
}

export function loginUser(data: LoginAction) {
    return {
        type: LOGIN_USER,
        payload: data
    }
}

export function logoutUser(data: any = null) {
    return {
        type: LOGOUT_USER,
        payload: data
    }
}

export function updateEngagementViewData(data: any) {
    return {
        type: UPDATE_ENGAGEMENT_VIEW_DATA,
        payload: data
    }
}

export default function (state = {}, action: LoginAction) {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {
                currentUser: action.payload.user,
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                currentUser: action.payload,
            });
        case UPDATE_ENGAGEMENT_VIEW_DATA:
            return Object.assign({}, state, {
                engagementData: action.payload,
            });
        default:
            return state;
    }
}


type User = {
    email: string;
    firstName: string;
    phoneNumber: string;
    gender: string;
    verified: boolean;
} | null;

export interface GeneralState {
    currentUser: User;
    engagementData: Array<any>;
}

export const initialGeneralState: GeneralState = {
    currentUser: null,
    engagementData: [],
}