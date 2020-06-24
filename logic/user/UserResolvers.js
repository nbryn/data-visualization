const { GraphQLJSON } = require("graphql-type-json");

const { fetchDailyData } = require("../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../data/common/fetchMonthlyData");

const {
  fetchUsersWithEmail,
  fetchUsersWithPhone,
} = require("../../data/mappers/UserMapper");

const { calculateActiveUsers } = require("./UserService");

const {
  validateLogin,
  fetchUserCount,
  fetchCurrentUser,
  fetchGenderStats,
} = require("../../data/mappers/UserMapper");

const userResolvers = {
  JSON: GraphQLJSON,

  Mutation: {
    signin: async (parent, args, context, info) => {
      const result = await validateLogin(args);

      console.log(result);

      return result;
    },
  },
  Query: {
    userStats: (root, context) => ({ root, context }),
    userInfo: (root, context) => ({ root, context }),
    me: async (parent, args, context, info) => {
      const result = await fetchCurrentUser(context);

      return result;
    },
  },
  UserStats: {
    userCount: async (root, context) => {
      const userCount = await fetchUserCount();

      return userCount;
    },
    usersActive: async (root, context) => {
      const activeUsers = calculateActiveUsers();

      return activeUsers;
    },
    usersLastMonth: async (root, context) => {
      const usersLastMonth = await fetchDailyData("users", "signupDate", 30);

      return { data: usersLastMonth };
    },
    usersLastYear: async (root, context) => {
      const result = await fetchMonthlyData("users", "signupDate");

      return {
        data: result,
      };
    },
    userGenderStats: async (root, context) => {
      const result = await fetchGenderStats();

      return result;
    },
  },
  UserInfo: {
    usersWithPhone: async (root, context) => {
      const result = await fetchUsersWithPhone();

      const final = removeDuplicates(result, true);

      return final;
    },

    usersWithEmail: async (root, context) => {
      const result = await fetchUsersWithEmail();

      const final = removeDuplicates(result, false);

      return final;
    },
  },
};

module.exports = userResolvers;

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
