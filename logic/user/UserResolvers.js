const { GraphQLJSON } = require("graphql-type-json");

const { validateLogin } = require("../../data/user/UserSigninAction");
const { fetchUserStats } = require("../../data/user/UserStatsAction");
const { fetchCurrentUser } = require("../../data/user/UserCurrentAction");
const { fetchUsersLastYear } = require("../../data/user/UserLastYearAction");

const userResolvers = {
  JSON: GraphQLJSON,

  Mutation: {
    signin: async (parent, args, context, info) => {
      const result = validateLogin(args);

      return result;
    }
  },
  Query: {
    userStats: async (parent, args, context, info) => {
      const result = fetchUserStats(context);

      return result;
    },
    usersLastYear: async (parent, args, context, info) => {
      const result = fetchUsersLastYear();

      return {
        signups: result
      }
    },
    me: async (parent, args, context, info) => {
      const result = fetchCurrentUser(context);

      return result;
    }
  }
};

module.exports = userResolvers;
