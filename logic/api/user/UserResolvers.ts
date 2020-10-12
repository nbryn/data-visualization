import * as UserMapper from '../../../data/mappers/UserMapper';
import {actionRunner} from '../../util/ActionRunner';
import {User} from '../../entities/User';
import {CountDTO, LastMonthDTO, LastYearDTO} from '../../util/DTOs';

export const userResolvers = {
   Query: {
      userStats: () => ({}),
      userInfo: () => ({}),
   },
   UserStats: {
      userCount: async (): Promise<number> => {
         return actionRunner(async () => {
            const userCount = await UserMapper.fetchUserCount();

            return userCount;
         });
      },
      usersLastMonth: async (): Promise<LastMonthDTO[]> => {
         return actionRunner<LastMonthDTO[]>(async () => {
            const usersLastMonth = await UserMapper.fetchUsersLastMonth();

            return usersLastMonth;
         });
      },
      usersLastYear: async (): Promise<LastYearDTO[]> => {
         return actionRunner<LastYearDTO[]>(async () => {
            const result = await UserMapper.fetchUsersLastYear();

            return result;
         });
      },
      userGenderStats: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const result = await UserMapper.fetchGenderStats();

            return result;
         });
      },
   },
   UserInfo: {
      usersWithPhone: async (): Promise<User[]> => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchUsersWithPhone();

            const final = removeDuplicates(result, true);

            return final;
         });
      },

      usersWithEmail: async (): Promise<User[]> => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchUsersWithEmail();

            const final = removeDuplicates(result, false);

            return final;
         });
      },
   },
};

// TODO: Move to service
function removeDuplicates(needsFiltering: User[], phone: boolean): User[] {
   const s: Array<string | undefined | null> = [];

   const filtered = needsFiltering.map((element: User) => {
      if (s.includes(phone ? element.phoneNumber : element.email)) {
         return;
      } else {
         s.push(phone ? element.phoneNumber : element.email);
         return {
            ...element,
         };
      }
   });

   // @ts-ignore
   return filtered;
}
