const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");
const { fetchTotal } = require("../../data/fetch/fetchTotal");
const {
  fetchGroupBy,
  fetchGroupStats,
  fetchAllGroups,
  fetchGroupSizeData
} = require("../../data/mappers/GroupMapper");
const {
  listGroupData,
  listGroupsByNGO,
  calculateMeetingFrequency,
  generateMeetingOverview
} = require("./GroupService");

const groupResolvers = {
  Query: {
    groupStats: (root, context) => ({ root, context }),
    groupEngagement: (root, context) => ({ root, context }),
    groupData: (obj, args, root, context) => ({ obj, args, root, context }),
    ngoGroupData: (obj, args, root, context) => ({ obj, args, root, context })
  },
  GroupStats: {
    groupTotal: async (root, context) => {
      const groupTotal = await fetchTotal("groups");

      return groupTotal;
    },
    groupSize: async (root, context) => {
      const result = await fetchGroupSizeData();

      const tempResult = result
        .filter(element => element._id.groupSize > 6)
        .map(element => {
          return {
            value: element._id.groupSize,
            count: element.count
          };
        });

      const groupSizeStats = tempResult.filter(element => element.count > 2);

      return groupSizeStats;
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
      meetingStats = await generateMeetingOverview();

      return meetingStats;
    }
  },
  GroupData: {
    group: async (obj, args, root, context) => {
      console.log("hej");
      const groupData = await listGroupData(args.group);

      console.log(groupData);
      
      return groupData;
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
