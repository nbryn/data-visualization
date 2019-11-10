 
import RootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";

const initialState = {};

//Only for development
const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


const store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(reduxThunk, promiseMiddleware))
);

export default store;