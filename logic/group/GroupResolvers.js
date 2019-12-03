const { getGroupStats } = require("../../data/group/GroupStatsAction");

const groupResolvers = {
  Query: {
    userStats: async (parent, args, context, info) => {
      getGroupStats(result => {
        console.log(result);

        return result;
      });
    }
  }
};

module.exports = groupResolvers;
