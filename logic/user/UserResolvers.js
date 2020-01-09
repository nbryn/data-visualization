const { GraphQLJSON } = require("graphql-type-json");

const {
  validateLogin,
  fetchUserTotal,
  fetchUsersLastMonth,
  fetchCurrentUser,
  fetchUsersLastYear,
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
    me: async (root, context) => {
      const result = await fetchCurrentUser();

      return result;
    }
  },
  UserStats: {
    userCount: async (root, context) => {
      const userCount = await fetchUserTotal();

      return userCount;
    },
    usersLastMonth: async (root, context) => {
      const usersLastMonth = fetchUsersLastMonth;

      return { data: usersLastMonth };
    },
    usersLastYear: async (root, context) => {
      const result = await fetchUsersLastYear();

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
