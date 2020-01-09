const {
  fetchGroupTotal,
  fetchGroupSize,
  fetchGroupsLastMonth,
  fetchGroupsLastYear,
  fetchGroupsPerCountry,
  fetchGroupsPerNGO,
  fetchGroupMeetingStats
} = require("../../data/mappers/GroupMapper");

const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupMeetingStats: (root, context) => ({ root, context })
  },
  GroupStats: {
    groupTotal: async (root, context) => {
      const groupTotal = await fetchGroupTotal();

      return groupTotal;
    },
    groupSize: async (root, context) => {
      const groupSize = await fetchGroupSize();

      return groupSize;
    },
    groupsNGO: async (root, context) => {
      const groupsNGO = await fetchGroupsPerNGO();

      return groupsNGO;
    },
    groupsCountry: async (root, context) => {
      const groupsNGO = await fetchGroupsPerCountry();

      return groupsNGO;
    },
    groupsLastMonth: async (root, context) => {
      const groupsLastMonth = await fetchGroupsLastMonth();

      return { data: groupsLastMonth };
    },
    groupsLastYear: async (root, context) => {
      const groupsLastYear = await fetchGroupsLastYear();

      return { data: groupsLastYear };
    }
  },
  GroupMeetingStats: async (parent, args, context, info) => {
    const groupMeetingStats = await fetchGroupMeetingStats();
  }
};

module.exports = groupResolvers;
