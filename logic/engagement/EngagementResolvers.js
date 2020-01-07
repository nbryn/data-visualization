const { fetchGroupActivityStats } = require("../../data/mappers/GroupMapper");

const engagementResolvers = {
  Query: {
    engagementStats: async (parent, args, context, info) => {
      groupActivityStats = await fetchGroupActivityStats();

      let activeGroups = 0;

      groupActivityStats.forEach(element => {
        if (element.value !== "Test Groups") {
          activeGroups += element.count;
        }
      });

      return {
        activeGroups: activeGroups,
        groupActivity: groupActivityStats
      };
    }
  }
};

module.exports = engagementResolvers;
