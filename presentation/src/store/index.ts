import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import CountryReducers from './country/CountryReducers';
import { CountryState, initialCountryState } from './country/CountryTypes';

import NGOReducers from './ngo/NGOReducers';
import { NGOState, initialNGOState } from './ngo/NGOTypes';

import GroupReducers, { GroupState, initialGroupState } from './Group';
import FinanceReducers, { FinanceState, initialFinanceState } from './Finance';
import MeetingReducers, { MeetingState, initialMeetingState } from './Meeting';
import MainReducers, { MainState, initialMainState } from './Main';
import UserReducers, { UserState, initialUserState } from './User';

export interface RootState {
  [key: string]: any;
  countryStats: CountryState;
  finance: FinanceState;
  groups: GroupState;
  meetings: MeetingState;
  ngoStats: NGOState;
  users: UserState;
  main: MainState;
}

const initialState: RootState = {
  countryStats: initialCountryState,
  finance: initialFinanceState,
  meetings: initialMeetingState,
  ngoStats: initialNGOState,
  groups: initialGroupState,
  users: initialUserState,
  main: initialMainState
};

const rootReducer = combineReducers({
  countryStats: CountryReducers,
  finance: FinanceReducers,
  groups: GroupReducers,
  meetings: MeetingReducers,
  ngoStats: NGOReducers,
  users: UserReducers,
  main: MainReducers
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
