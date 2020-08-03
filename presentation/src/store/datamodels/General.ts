const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_ERROR = 'LOGIN_ERROR';
const UPDATE_ENGAGEMENT_VIEW_DATA = 'UPDATE_ENGAGEMENT_VIEW_DATA';

export interface LoginAction {
    type: any;
    payload: any;
}

export function loginUser(data: LoginAction) {
    return {
        type: LOGIN_USER,
        payload: data,
    };
}

export function logoutUser(data: any = null) {
    return {
        type: LOGOUT_USER,
        payload: data,
    };
}

export function loginError(data: any) {
    return {
        type: LOGIN_ERROR,
        payload: data,
    };
}

export function updateEngagementViewData(data: any) {
    return {
        type: UPDATE_ENGAGEMENT_VIEW_DATA,
        payload: data,
    };
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
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                loginError: action.payload,
            });
        case UPDATE_ENGAGEMENT_VIEW_DATA:
            return Object.assign({}, state, {
                engagementData: action.payload,
            });
        default:
            return state;
    }
}

export type User = {
    [key: string]: string;
    email: string;
    firstName: string;
    phoneNumber: string;
    gender: string;
} | null;

export interface GeneralState {
    currentUser: User;
    loginError: string;
    engagementData: Array<any>;
}

export const initialGeneralState: GeneralState = {
    currentUser: null,
    loginError: '',
    engagementData: [],
};
