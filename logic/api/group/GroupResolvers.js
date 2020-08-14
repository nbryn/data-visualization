const actionRunner = require("../../util/ActionRunner.js");
const {
  calculateGroupActivitySince,
  calculateShareoutActivitySince,
} = require("./GroupActivityService");
const {
  calculateMeetingFrequency,
  generateMeetingOverview,
  listGroupData,
  listGroupsByNGO,
} = require("./GroupService");
const {
  fetchAllGroups,
  fetchGroupSizeData,
} = require("../../../data/mappers/GroupMapper");

const { fetchDailyData } = require("../../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../../data/common/fetchMonthlyData");
const { fetchTotal } = require("../../../data/common/fetchTotal");

const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupEngagement: (root, context) => ({ root, context }),
    groupData: (obj, args, root, context) => ({ obj, args, root, context }),
    ngoGroupData: (obj, args, root, context) => ({ obj, args, root, context }),
    groupActivity: async (root, context) => ({ root, context }),
  },
  GroupActivity: {
    meetingActivity: async (root, context) => {
      return actionRunner(async () => {
        const last105Days = await calculateGroupActivitySince(105);

        return {
          last105Days: last105Days,
        };
      });
    },
    shareoutActivity: async (root, context) => {
      return actionRunner(async () => {
        const groupTotal = await calculateShareoutActivitySince(105);

        return groupTotal;
      });
    },
  },
  GroupStats: {
    groupTotal: async (root, context) => {
      return actionRunner(async () => {
        const groupTotal = await fetchTotal("Group");

        return groupTotal;
      });
    },
    groupSize: async (root, context) => {
      return actionRunner(async () => {
        const result = await fetchGroupSizeData();

        const tempResult = result
          .filter((element) => element._id.groupSize > 6)
          .map((element) => {
            return {
              value: element._id.groupSize,
              count: element.count,
            };
          });

        const groupSizeStats = tempResult.filter(
          (element) => element.count > 2
        );

        return groupSizeStats;
      });
    },
    groupsLastWeek: async (root, context) => {
      return actionRunner(async () => {
        const groupsLastWeek = await fetchDailyData(
          "Group",
          "registrationDate",
          7
        );

        let groups = 0;

        groupsLastWeek.forEach((group) => (groups += group.count));

        return groups;
      });
    },
    groupsLastMonth: async (root, context) => {
      return actionRunner(async () => {
        const groupsLastMonth = await fetchDailyData(
          "Group",
          "registrationDate",
          30
        );

        return groupsLastMonth;
      });
    },
    groupsLastYear: async (root, context) => {
      return actionRunner(async () => {
        const groupsLastYear = await fetchMonthlyData(
          "Group",
          "registrationDate"
        );

        return groupsLastYear;
      });
    },
  },
  GroupEngagement: {
    groupsActive: async (root, context) => {
      return actionRunner(async () => {
        const allGroups = await fetchAllGroups();
        let activeGroups = 0;

        allGroups.forEach((group) => {
          if (group.members.length > 6) {
            activeGroups++;
          }
        });

        return activeGroups;
      });
    },
    groupMeetingFrequency: async (root, context) => {
      return actionRunner(async () => {
        const meetingFreq = calculateMeetingFrequency();

        return meetingFreq;
      });
    },
    groupMeetingStats: async (root, context) => {
      return actionRunner(async () => {
        meetingStats = await generateMeetingOverview();

        return meetingStats;
      });
    },
  },
  GroupData: {
    group: async (obj, args, root, context) => {
      return actionRunner(async () => {
        const groupData = await listGroupData(args.group);

        return groupData;
      });
    },
  },
  NGOGroupData: {
    groupData: async (obj, args, root, context) => {
      return actionRunner(async () => {
        const groupData = await listGroupsByNGO(args.ngo);

        return groupData;
      });
    },
  },
};

module.exports = groupResolvers;
