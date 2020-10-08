// Actions
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// Actions Types
export interface LoginAction {
   type: typeof LOGIN_USER;
   payload: User;
}

export interface LogoutAction {
   type: typeof LOGOUT_USER;
   payload: null;
}

type GeneralAction = LoginAction | LogoutAction;

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

// Reducers
export default function (state = initialGeneralState, action: GeneralAction): GeneralState {
   switch (action.type) {
      case LOGIN_USER:
         return Object.assign({}, state, {
            currentUser: action.payload!.user,
         });
      case LOGOUT_USER:
         return Object.assign({}, state, {
            currentUser: action.payload,
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
}

export const initialGeneralState: GeneralState = {
   currentUser: null,
};
