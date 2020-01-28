const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");
const { fetchTotal } = require("../../data/fetch/fetchTotal");
const {
  fetchGroupStats,
  fetchAllGroups
} = require("../../data/mappers/GroupMapper");
const {
  getGroupSizeStats,
  listGroupsByNGO,
  calculateMeetingFrequency,
  calculateMeetingStats
} = require("./GroupService");

const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupEngagement: (root, context) => ({ root, context }),
    ngoGroupData: (obj, args, root, context) => ({ obj, args, root, context })
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
      const result = await fetchGroupStats("$country");

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
  GroupEngagement: {
    groupsActive: async (root, context) => {
      //Need to adjust how active groups are counted
      const allGroups = await fetchAllGroups();
      let activeGroups = 0;

      allGroups.forEach(group => {
        if (group.members.length > 6) {
          activeGroups++;
        }
      });

      return activeGroups;
    },
    groupMeetingFrequency: async (root, context) => {
      const meetingFreq = calculateMeetingFrequency();

      return meetingFreq;
    },
    groupMeetingStats: async (root, context) => {
      meetingStats = await calculateMeetingStats();

      return meetingStats;
    }
  },
  NGOGroupData: {
    groupData: async (obj, args, root, context) => {
      const groupData = await listGroupsByNGO(args.ngo);

      return groupData;
    }
  }
};

module.exports = groupResolvers;
