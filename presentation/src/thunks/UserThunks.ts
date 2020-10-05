import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {fetchUserViewData, fetchUsersPerCountry, fetchUsersPerOrg, UserViewDTO} from '../services/requests';
import {setUserViewData, UserState} from '../store/datamodels/User';
import * as DTOConverterService from '../services/DTOConverterService';
import {RootState} from '../store/index';
import {ServerDTO} from '../services/requests/DTOs';

export const updateUserViewData = (): ThunkAction<void, RootState, null, Action<string>> => async (
   dispatch
) => {
   const result: UserState = {} as UserState;

   const userData: UserViewDTO = await fetchUserViewData();
   const userCountryData: ServerDTO[] = await fetchUsersPerCountry();
   const userOrgData: ServerDTO[] = await fetchUsersPerOrg();

   const {userCount, usersLastMonth, usersLastYear, userGenderStats} = userData;

   const {todayDate, todayCount} = DTOConverterService.mapDataForToday(usersLastMonth);

   result.total = userCount;
   result.todayCount = todayCount;
   result.todayDate = todayDate;
   result.lastMonthCount = DTOConverterService.getTotalNumberInPeriod(usersLastMonth);
   result.lastYearCount = DTOConverterService.getTotalNumberInPeriod(usersLastYear);

   result.lastYearLineChartData = DTOConverterService.mapLastYearData(usersLastYear, true);
   result.lastYearBarChartData = DTOConverterService.mapLastYearData(usersLastYear, false);
   result.lastMonthBarChartData = DTOConverterService.mapLastMonthData(usersLastMonth);

   result.perCountryData = DTOConverterService.mapGeneralChartData(userCountryData);
   result.perOrgData = DTOConverterService.mapGeneralChartData(userOrgData);
   result.genderStats = DTOConverterService.mapGeneralChartData(userGenderStats);

   dispatch(setUserViewData(result));
};
