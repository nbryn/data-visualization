const { GraphQLJSON } = require("graphql-type-json");

const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");

const {
  validateLogin,
  fetchUserTotal,
  fetchCurrentUser,
  fetchGenderStats
} = require("../../data/mappers/UserMapper");

const userResolvers = {
  JSON: GraphQLJSON,

  Mutation: {
    signin: async (parent, args, context, info) => {
      const result = await validateLogin(args);

      return result;
    }
  },
  Query: {
    userStats: (root, context) => ({ root, context }),
    me: async (parent, args, context, info) => {
      const result = await fetchCurrentUser(context);

      return result;
    }
  },
  UserStats: {
    userCount: async (root, context) => {
      const userCount = await fetchUserTotal();

      return userCount;
    },
    usersLastMonth: async (root, context) => {
      const usersLastMonth = fetchDailyData("users", "signupDate");

      return { data: usersLastMonth };
    },
    usersLastYear: async (root, context) => {
      const result = await fetchMonthlyData("users", "signupDate");

      return {
        data: result
      };
    },
    userGenderStats: async (root, context) => {
      const result = await fetchGenderStats();

      return result;
    }
  }
};

module.exports = userResolvers;
