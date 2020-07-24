import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducer";

const initialState = {
  KPI: {
    usersLastWeek: [],
    usersLastMonth: [],
    usersLastYear: [],
  },
  UserStats: {
    userStats: [],
    usersTotal: 0,
    usersLastWeek: [],
    usersLastMonth: [],
    usersLastYear: [],
    chartjsUsersLastMonth: [],
    chartjsUsersLastYear: [],
  },
  GroupStats: {
    groupStats: [],
    groupsTotal: 0,
    groupsLastWeek: [],
    groupsLastMonth: [],
    groupsLastYear: [],
  },
  MeetingStats: {
    meetingStats: [],
    meetingsTotal: 0,
    meetingsLastWeek: [],
    meetingsLastMonth: [],
    meetingsLastYear: [],
  },
  FinanceStats: {
    financeStats: [],
    currencyTotal: null,
    currencyStats: [],
    loanTotal: null,
    loansLastMonth: [],
    loansLastYear: [],
    sharesTotal: 0,
    shareStats: [],
    etbStats: [],
    boxBalanceStats: [],
  },
};
const middleWare = [thunk];

let store;


export interface UserState {
  usersTotal: number;
  usersLastWeek: Array<any>;
  usersLastMonth: Array<any>;
  usersLastYear: Array<any>;
  userStats: any;
  chartjsUsersLastMonth: Array<any>;
  chartjsUsersLastYear: Array<any>;
}

export interface GroupState {
  groupsTotal: number;
  groupsLastWeek: Array<any>;
  groupsLastMonth: Array<any>;
  groupsLastYear: Array<any>;
  groupStats: any;
}

export interface MeetingState {
  meetingsTotal: number;
  meetingsLastWeek: Array<any>;
  meetingsLastMonth: Array<any>;
  meetingsLastYear: Array<any>;
  meetingStats: any;
}

export interface FinanceState {
  currencyTotal: number;
  currencyStats: Array<any>;
  loanTotal: number;
  loansLastMonth: Array<any>;
  loansLastYear: Array<any>;
  sharesTotal: number;
  shareStats: Array<any>;
  etbStats: Array<any>;
  boxBalanceStats: Array<any>;
  financeStats: any;
}

export interface KPIState {
  [key: string]: any;
  keyStats: any;
  financeStats: any;
  groupStats: any;
  meetingStats: any;
}

export interface RootState {
  KPI: KPIState;
  userStats: UserState;
  groupStats: GroupState;
  meetingStats: MeetingState;
  financeStats: FinanceState;
}

const ReactReduxDevTools =
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
  compose;

if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWare), ReactReduxDevTools)
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWare))
  );
}

export default store;
