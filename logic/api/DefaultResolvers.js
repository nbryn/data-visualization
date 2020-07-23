const { GraphQLJSON } = require("graphql-type-json");

const actionRunner = require("../util/ActionRunner");
const { validateLogin } = require("../../data/mappers/UserMapper");

const userResolvers = {
  JSON: GraphQLJSON,

  Mutation: {
    signin: async (parent, args) => {
      return actionRunner(async () => {
        const result = await validateLogin(args);

        return result;
      });
    },
  },
};

module.exports = userResolvers;
