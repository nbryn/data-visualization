const { fetchDailyData } = require("../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../data/common/fetchMonthlyData");
const { fetchTotal } = require("../../data/common/fetchTotal");
const {
  fetchGroupStats,
  fetchAllGroups,
  fetchGroupSizeData,
} = require("../../data/mappers/GroupMapper");
const {
  listGroupData,
  listGroupsByNGO,
  calculateMeetingFrequency,
  generateMeetingOverview,
} = require("./GroupService");

const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupEngagement: (root, context) => ({ root, context }),
    groupData: (obj, args, root, context) => ({ obj, args, root, context }),
    ngoGroupData: (obj, args, root, context) => ({ obj, args, root, context }),
    meetingActivity: async (obj, args, root, context) => {
      const result = await calculateGroupActivitySince(105);

      return { last105Days: result };
    },
  },
  GroupStats: {
    groupTotal: async (root, context) => {
      const groupTotal = await fetchTotal("groups");

      return groupTotal;
    },
    groupSize: async (root, context) => {
      const result = await fetchGroupSizeData();

      const tempResult = result
        .filter((element) => element._id.groupSize > 6)
        .map((element) => {
          return {
            value: element._id.groupSize,
            count: element.count,
          };
        });

      const groupSizeStats = tempResult.filter((element) => element.count > 2);

      return groupSizeStats;
    },
    groupsNGO: async (root, context) => {
      const result = await fetchGroupStats("$ngoOrganization");

      const groupsNGO = result.map((element) => {
        return {
          name: element._id,
          count: element.count,
        };
      });

      return groupsNGO;
    },
    groupsCountry: async (root, context) => {
      const result = await fetchGroupStats("$country");

      const groupsNGO = result.map((element) => {
        return {
          name: element._id,
          count: element.count,
        };
      });

      return groupsNGO;
    },
    groupsLastWeek: async (root, context) => {
      const groupsLastWeek = await fetchDailyData(
        "groups",
        "registrationDate",
        7
      );

      let groups = 0;

      groupsLastWeek.forEach((group) => (groups += group.count));

      return groups;
    },
    groupsLastMonth: async (root, context) => {
      const groupsLastMonth = await fetchDailyData(
        "groups",
        "registrationDate",
        30
      );

      return { data: groupsLastMonth };
    },
    groupsLastYear: async (root, context) => {
      const groupsLastYear = await fetchMonthlyData(
        "groups",
        "registrationDate"
      );

      return { data: groupsLastYear };
    },
  },
  GroupEngagement: {
    groupsActive: async (root, context) => {
      const allGroups = await fetchAllGroups();
      let activeGroups = 0;

      allGroups.forEach((group) => {
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
      meetingStats = await generateMeetingOverview();

      return meetingStats;
    },
  },
  GroupData: {
    group: async (obj, args, root, context) => {
      const groupData = await listGroupData(args.group);

      return groupData;
    },
  },
  NGOGroupData: {
    groupData: async (obj, args, root, context) => {
      const groupData = await listGroupsByNGO(args.ngo);

      return groupData;
    },
  },
};

module.exports = groupResolvers;
