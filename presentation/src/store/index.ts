import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import FinanceReducers from './finance/FinanceReducers';
import { FinanceState, initialFinanceState } from './finance/FinanceTypes';
import { GroupState, initialGroupState } from './group/GroupTypes';
import { UserState, initialUserState } from './user/UserTypes';

import GroupReducers from './group/GroupReducers';
import UserReducers from './user/UserReducers';

const initialState = {
  KPI: {
    usersLastWeek: [],
    usersLastMonth: [],
    usersLastYear: []
  },
  UserStats: initialUserState,
  GroupStats: initialGroupState,
  MeetingStats: {},
  FinanceStats: initialFinanceState
};

export interface KPIState {
  [key: string]: any;
  keyStats: any;
  financeStats: any;
  groupStats: any;
  meetingStats: any;
}

export interface RootState {
  [key: string]: any;
  KPI: KPIState;
  userStats: UserState;
  groupStats: GroupState;
  meetingStats: MeetingState;
  financeStats: FinanceState;
}

const rootReducer = combineReducers({
  user: LoginReducer,
  country: CountryReducer,
  KPI: KPIReducer,
  NGO: NGOReducer,
  userStats: UserReducers,
  groupStats: GroupReducers,
  meetingStats: MeetingReducer,
  financeStats: FinanceReducers
});

const middleWare = [thunk];

let store;

const ReactReduxDevTools =
  // @ts-ignore
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
  compose;

if (window.navigator.userAgent.includes('Chrome')) {
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
