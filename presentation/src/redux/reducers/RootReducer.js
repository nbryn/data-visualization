import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import KPIReducer from "./KPIReducer";

export default combineReducers({
  user: UserReducer,
  KPI: KPIReducer
});
