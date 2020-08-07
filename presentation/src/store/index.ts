import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import ChartjsReducers, { ChartjsState, initialChartjsState } from './datamodels/Chartjs';
import FinanceReducers, {
    FinanceState,
    initialFinanceState,
} from './datamodels/Finance';
import GeneralReducers, {
    GeneralState,
    initialGeneralState,
} from './datamodels/General';
import GroupReducers, {
    GroupState,
    initialGroupState,
} from './datamodels/Group';
import MeetingReducers, {
    MeetingState,
    initialMeetingState,
} from './datamodels/Meeting';
import MainReducers, { MainState, initialMainState } from './datamodels/Main';
import UserReducers, { UserState, initialUserState } from './datamodels/User';

export interface RootState {
    [key: string]: any;
    chartjs: ChartjsState;
    finance: FinanceState;
    groups: GroupState;
    meetings: MeetingState;
    users: UserState;
    main: MainState;
    general: GeneralState;
}

const initialState: RootState = {
    chartjs: initialChartjsState,
    finance: initialFinanceState,
    meetings: initialMeetingState,
    groups: initialGroupState,
    users: initialUserState,
    main: initialMainState,
    general: initialGeneralState,
};

const rootReducer = combineReducers({
    chartjs: ChartjsReducers,
    finance: FinanceReducers,
    groups: GroupReducers,
    meetings: MeetingReducers,
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
