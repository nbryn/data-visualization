import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import KPIReducer from "./KPIReducer";
import NGOReducer from "./NGOReducer";

export default combineReducers({
  user: UserReducer,
  KPI: KPIReducer,
  NGO: NGOReducer
});
