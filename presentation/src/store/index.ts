import {applyMiddleware, compose, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import ChartjsReducers, {ChartjsState, initialChartjsState} from './datamodels/Chartjs';
import FinanceReducers, {FinanceState, initialFinanceState} from './datamodels/Finance';
import GeneralReducers, {GeneralState, initialGeneralState} from './datamodels/General';
import TeamReducers, {TeamState, initialTeamState} from './datamodels/Team';
import MatchReducers, {MatchState, initialMatchState} from './datamodels/Match';
import MainReducers, {MainState, initialMainState} from './datamodels/Main';
import UserReducers, {UserState, initialUserState} from './datamodels/User';

export interface RootState {
   [key: string]: any;
   chartjs: ChartjsState;
   finance: FinanceState;
   teams: TeamState;
   matches: MatchState;
   users: UserState;
   main: MainState;
   general: GeneralState;
}

export const initialState: RootState = {
   chartjs: initialChartjsState,
   finance: initialFinanceState,
   matches: initialMatchState,
   teams: initialTeamState,
   users: initialUserState,
   main: initialMainState,
   general: initialGeneralState,
};

export const rootReducer = combineReducers({
   chartjs: ChartjsReducers,
   finance: FinanceReducers,
   teams: TeamReducers,
   matches: MatchReducers,
   users: UserReducers,
   main: MainReducers,
   general: GeneralReducers,
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
   store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare), ReactReduxDevTools));
} else {
   store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare)));
}

export default store;
