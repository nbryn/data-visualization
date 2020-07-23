import { combineReducers } from "redux";
import LoginReducer from "./UserReducer";
import KPIReducer from "./KPIReducer";
import NGOReducer from "./NGOReducer";
import CountryReducer from "./CountryReducer";
import UserReducer from "./UserReducer";
import GroupReducer from "./GroupReducers";
import MeetingReducer from "./MeetingReducer";
import FinanceReducer from "./FinanceReducer";

export default combineReducers({
  user: LoginReducer,
  country: CountryReducer,
  KPI: KPIReducer,
  NGO: NGOReducer,
  userStats: UserReducer,
  groupStats: GroupReducer,
  meetingStats: MeetingReducer,
  financeStats: FinanceReducer,
});
