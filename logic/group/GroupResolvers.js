const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");
const { fetchTotal } = require("../../data/fetch/fetchTotal");
const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const { getGroupSizeStats, getGroupMeetingStats } = require("./GroupService");


const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupMeetingStats: (root, context) => ({ root, context })
  },
  GroupStats: {
    groupTotal: async (root, context) => {
      const groupTotal = await fetchTotal("groups");

      return groupTotal;
    },
    groupSize: async (root, context) => {
      const groupSize = await getGroupSizeStats();

      return groupSize;
    },
    groupsNGO: async (root, context) => {
      const result = await fetchGroupStats("$ngoOrganization");

      const groupsNGO = result.map(element => {
        return {
          name: element._id,
          count: element.count
        };
      });

      return groupsNGO;
    },
    groupsCountry: async (root, context) => {
      const result = await fetchGroupsStats("$country");

      const groupsNGO = result.map(element => {
        return {
          name: element._id,
          count: element.count
        };
      });

      return groupsNGO;
    },
    groupsLastMonth: async (root, context) => {
      const groupsLastMonth = await fetchDailyData(
        "groups",
        "registrationDate"
      );

      return { data: groupsLastMonth };
    },
    groupsLastYear: async (root, context) => {
      const groupsLastYear = await fetchMonthlyData(
        "groups",
        "registrationDate"
      );

      return { data: groupsLastYear };
    }
  },
  GroupMeetingStats: async (parent, args, context, info) => {
    const groupMeetingStats = await getGroupMeetingStats();
  }
};

module.exports = groupResolvers;
