// Actions
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_ERROR = 'LOGIN_ERROR';
const UPDATE_ENGAGEMENT_VIEW_DATA = 'UPDATE_ENGAGEMENT_VIEW_DATA';

// Actions Types
export interface LoginAction {
    type: typeof LOGIN_USER;
    payload: User;
}

export interface LoginError {
    type: typeof LOGIN_ERROR;
    payload: any;
}

export interface LogoutAction {
    type: typeof LOGOUT_USER;
    payload: null;
}

export interface UpdateEngagementViewDataAction {
    type: typeof UPDATE_ENGAGEMENT_VIEW_DATA;
    payload: any;
}

type GeneralActions = LoginAction | LoginError | LogoutAction | UpdateEngagementViewDataAction;

// Action Creators
export function loginUser(data: LoginAction) {
    return {
        type: typeof LOGIN_USER,
        payload: data,
    };
}

export function logoutUser(data: any = null) {
    return {
        type: typeof LOGOUT_USER,
        payload: data,
    };
}

export function loginError(data: any) {
    return {
        type: typeof LOGIN_ERROR,
        payload: data,
    };
}

export function updateEngagementViewData(data: any) {
    return {
        type: typeof UPDATE_ENGAGEMENT_VIEW_DATA,
        payload: data,
    };
}

// Reducers
export default function (state = {}, action: GeneralActions) {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {
                currentUser: action.payload!.user,
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

export type TodayData = {
    todayDate: string;
    todayCount: number;
}

export type ChartData = {
    name: string;
    value: number;
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
