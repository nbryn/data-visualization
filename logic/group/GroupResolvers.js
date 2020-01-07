const {
  fetchGroupTotal,
  fetchGroupSize,
  fetchGroupsLastMonth,
  fetchGroupsLastYear,
  fetchGroupsPerCountry,
  fetchGroupsPerNGO,
  fetchGroupMeetingStats,
} = require("../../data/mappers/GroupMapper");

const groupResolvers = {
  Query: {
    groupStats: async (parent, args, context, info) => {
      const groupTotal = await fetchGroupTotal();

      const groupSize = await fetchGroupSize();

      const groupsNGO = await fetchGroupsPerNGO();

      const groupsCountry = await fetchGroupsPerCountry();

      const groupsPrevMonth = await fetchGroupsLastMonth();

      const groupsPrevYear = await fetchGroupsLastYear();

      return {
        groupTotal,
        groupSize: groupSize,
        groupsLastMonth: { data: groupsPrevMonth },
        groupsLastYear: { data: groupsPrevYear },
        groupsCountry: groupsCountry,
        groupsNGO: groupsNGO
      };
    },
    groupMeetingStats: async (parent, args, context, info) => {
      const groupMeetingStats = await fetchGroupMeetingStats();
    }
  }
};

module.exports = groupResolvers;
