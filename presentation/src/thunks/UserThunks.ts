import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {fetchUserViewData, fetchUsersPerCountry, fetchUsersPerOrg, UserViewDTO} from '../services/requests';
import {setUserViewData, UserState} from '../store/datamodels/User';
import * as DataMappingService from '../services/DataMappingService';
import {RootState} from '../store/index';
import {ServerDTO} from '../services/requests/DTOs';

export const updateUserViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
   const result: UserState = {} as UserState;

   const userData: UserViewDTO = await fetchUserViewData();
   const userCountryData: ServerDTO[] = await fetchUsersPerCountry();
   const userOrgData: ServerDTO[] = await fetchUsersPerOrg();

   const {userCount, usersLastMonth, usersLastYear, userGenderStats} = userData;

   const {todayDate, todayCount} = DataMappingService.mapDataForToday(usersLastMonth);

   result.total = userCount;
   result.todayCount = todayCount;
   result.todayDate = todayDate;
   result.lastMonthCount = DataMappingService.getTotalNumberInPeriod(usersLastMonth);
   result.lastYearCount = DataMappingService.getTotalNumberInPeriod(usersLastYear);

   result.lastYearLineChartData = DataMappingService.mapLastYearData(usersLastYear, true);
   result.lastYearBarChartData = DataMappingService.mapLastYearData(usersLastYear, false);
   result.lastMonthBarChartData = DataMappingService.mapLastMonthData(usersLastMonth);

   result.perCountryData = DataMappingService.mapGeneralChartData(userCountryData);
   result.perOrgData = DataMappingService.mapGeneralChartData(userOrgData);
   result.genderStats = DataMappingService.mapGeneralChartData(userGenderStats);

   dispatch(setUserViewData(result));
};
