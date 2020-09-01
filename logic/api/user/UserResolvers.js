import {actionRunner} from '../../util/ActionRunner';
const {fetchDailyData} = require('../../../data/common/fetchDailyData');
const {fetchMonthlyData} = require('../../../data/common/fetchMonthlyData');
const {fetchGenderStats, fetchUserCount} = require('../../../data/mappers/UserMapper');
const {fetchUsersWithEmail, fetchUsersWithPhone} = require('../../../data/mappers/UserMapper');

const {calculateActiveUsers} = require('./UserService');

const userResolvers = {
   Query: {
      userStats: (root, context) => ({root, context}),
      userInfo: (root, context) => ({root, context}),
   },
   UserStats: {
      userCount: async (root, context) => {
         return actionRunner(async () => {
            const userCount = await fetchUserCount();

            return userCount;
         });
      },
      usersActive: async (root, context) => {
         return actionRunner(async () => {
            const activeUsers = calculateActiveUsers();

            return activeUsers;
         });
      },
      usersLastMonth: async (root, context) => {
         return actionRunner(async () => {
            const usersLastMonth = await fetchDailyData('User', 'signupDate', 30);

            return usersLastMonth;
         });
      },
      usersLastYear: async (root, context) => {
         return actionRunner(async () => {
            const result = await fetchMonthlyData('User', 'signupDate');

            return result;
         });
      },
      userGenderStats: async (root, context) => {
         return actionRunner(async () => {
            const result = await fetchGenderStats();

            return result;
         });
      },
   },
   UserInfo: {
      usersWithPhone: async (root, context) => {
         return actionRunner(async () => {
            const result = await fetchUsersWithPhone();

            const final = removeDuplicates(result, true);

            return final;
         });
      },

      usersWithEmail: async (root, context) => {
         return actionRunner(async () => {
            const result = await fetchUsersWithEmail();

            const final = removeDuplicates(result, false);

            return final;
         });
      },
   },
};

module.exports = userResolvers;

// TODO: Move to service
function removeDuplicates(needsFiltering, phone) {
   const s = [];

   const filtered = needsFiltering.map((element) => {
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
