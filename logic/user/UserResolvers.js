const { GraphQLJSON } = require("graphql-type-json");

const {
  validateLogin,
  fetchUserStats,
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
    userStats: async (parent, args, context, info) => {
      const result = await fetchUserStats(context);

      return result;
    },
    usersLastYear: async (parent, args, context, info) => {
      const result = await fetchUsersLastYear();

      console.log(result);

      return {
        data: result
      };
    },
    userGender: async (parent, args, context, info) => {
      const result = await fetchGenderStats();

      return {
        female: result.female,
        male: result.male
      };
    },
    me: async (parent, args, context, info) => {
      const result = fetchCurrentUser(context);

      return result;
    }
  }
};

module.exports = userResolvers;
