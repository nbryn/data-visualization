import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducer";

const initialState = {
  KPI: {
    usersLastWeek: [],
    usersLastMonth: [],
    usersLastYear: [],
  },
};
const middleWare = [thunk];

let store;

export interface KPIState {
  [key: string]: any;
  keyStats: any;
  financeStats: any;
  groupStats: any;
  meetingStats: any;
  userStats: any;
  usersLastYear: Array<any>;
  usersLastMonth: Array<any>;
}

export interface RootState {
  KPI: KPIState;
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
