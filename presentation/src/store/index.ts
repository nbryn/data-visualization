import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import CountryReducers from './country/CountryReducers';
import { CountryState, initialCountryState } from './country/CountryTypes';
import FinanceReducers from './finance/FinanceReducers';
import { FinanceState, initialFinanceState } from './finance/FinanceTypes';
import GroupReducers from './group/GroupReducers';
import { GroupState, initialGroupState } from './group/GroupTypes';
import MeetingReducers from './meeting/MeetingReducers';
import { MeetingState, initialMeetingState } from './meeting/MeetingTypes';
import NGOReducers from './ngo/NGOReducers';
import { NGOState, initialNGOState } from './ngo/NGOTypes';
import UserReducers from './user/UserReducers';
import { UserState, initialUserState } from './user/UserTypes';

const initialState = {
  countryStats: initialCountryState,
  financeStats: initialFinanceState,
  meetingStats: initialMeetingState,
  ngoStats: initialNGOState,
  groupStats: initialGroupState,
  userStats: initialUserState
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
  countryStats: CountryState;
  financeStats: FinanceState;
  groupStats: GroupState;
  meetingStats: MeetingState;
  ngoStats: NGOState;
  userStats: UserState;
}

const rootReducer = combineReducers({
  countryStats: CountryReducers,
  financeStats: FinanceReducers,
  groupStats: GroupReducers,
  meetingStats: MeetingReducers,
  ngoStats: NGOReducers,
  userStats: UserReducers
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
