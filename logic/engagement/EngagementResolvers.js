const { getGroupEngagementStats, getGroupMeetingStats} = require("../group/GroupService");

const engagementResolvers = {
  Query: {
    engagementStats: (root, context) => ({ root, context })
  },
  EngagementStats: {
    groupEngagement: async (root, context) => {
      groupActivityStats = await getGroupEngagementStats();

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
