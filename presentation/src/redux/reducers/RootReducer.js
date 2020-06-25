import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import KPIReducer from "./KPIReducer";
import NGOReducer from "./NGOReducer";
import COUNTRYReducer from "./CountryReducer";

export default combineReducers({
  user: UserReducer,
  country: COUNTRYReducer,
  KPI: KPIReducer,
  NGO: NGOReducer
});
