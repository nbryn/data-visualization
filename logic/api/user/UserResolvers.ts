import * as UserMapper from '../../../data/mappers/UserMapper';
import { actionRunner } from '../../util/ActionRunner';
import { calculateActiveUsers } from './UserService';


export const userResolvers = {
   Query: {
      userStats: (root: any, context: any) => ({ root, context }),
      userInfo: (root: any, context: any) => ({ root, context }),
   },
   UserStats: {
      userCount: async (): Promise<number> => {
         return actionRunner(async () => {
            const userCount = await UserMapper.fetchUserCount();

            return userCount;
         });
      },
      usersActive: async (): Promise<number> => {
         return actionRunner(async () => {
            const activeUsers = await calculateActiveUsers();

            return activeUsers;
         });
      },
      usersLastMonth: async () => {
         return actionRunner(async () => {
            const usersLastMonth = await UserMapper.fetchUsersLastMonth();

            return usersLastMonth;
         });
      },
      usersLastYear: async () => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchUsersLastYear();

            return result;
         });
      },
      userGenderStats: async () => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchGenderStats();

            return result;
         });
      },
   },
   UserInfo: {
      usersWithPhone: async () => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchUsersWithPhone();

            const final = removeDuplicates(result, true);

            return final;
         });
      },

      usersWithEmail: async () => {
         return actionRunner(async () => {
            const result = await UserMapper.fetchUsersWithEmail();

            const final = removeDuplicates(result, false);

            return final;
         });
      },
   },
};

// TODO: Move to service
function removeDuplicates(needsFiltering: any, phone: any) {
   const s: any = [];

   const filtered = needsFiltering.map((element: any) => {
      if (s.includes(phone ? element.phoneNumber : element.email)) {
         return;
      } else {
         s.push(phone ? element.phoneNumber : element.email);
         if (phone) {
            return {
               firstName: element.firstName,
               lastName: element.lastName,
               phoneNumber: element.phoneNumber,
            };
         } else {
            return {
               firstName: element.firstName,
               lastName: element.lastName,
               email: element.email,
            };
         }
      }
   });
   return filtered;
}
