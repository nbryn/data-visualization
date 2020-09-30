// Actions
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_ENGAGEMENT_VIEW_DATA = 'UPDATE_ENGAGEMENT_VIEW_DATA';

// Actions Types
export interface LoginAction {
   type: typeof LOGIN_USER;
   payload: User;
}

export interface LogoutAction {
   type: typeof LOGOUT_USER;
   payload: null;
}

export interface UpdateEngagementViewDataAction {
   type: string;
   payload: any;
}

type GeneralAction = LoginAction | LogoutAction | UpdateEngagementViewDataAction;

// Action Creators
export function loginUser(data: User): LoginAction {
   return {
      type: LOGIN_USER,
      payload: data,
   };
}

export function logoutUser(data: any = null): LogoutAction {
   return {
      type: LOGOUT_USER,
      payload: data,
   };
}

export function updateEngagementViewData(data: any): UpdateEngagementViewDataAction {
   return {
      type: typeof UPDATE_ENGAGEMENT_VIEW_DATA,
      payload: data,
   };
}

// Reducers
export default function (state = {}, action: GeneralAction) {
   switch (action.type) {
      case LOGIN_USER:
         return Object.assign({}, state, {
            currentUser: action.payload!.user,
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

export type TodayData = {
   todayDate: string;
   todayCount: number;
};

export type ChartData = {
   name: string;
   value: number;
};

export type User = {
   [key: string]: string;
   token: string;
   email: string;
   name: string;
   phone: string;
   gender: string;
} | null;

export interface GeneralState {
   currentUser: User;
   engagementData: Array<any>;
}

export const initialGeneralState: GeneralState = {
   currentUser: null,
   engagementData: [],
};
