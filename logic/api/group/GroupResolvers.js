import {actionRunner} from '../../util/ActionRunner';
const Error = require('../../util/Error');
const GroupActivityService = require('./GroupActivityService');
const GroupService = require('./GroupService');
const GroupMapper = require('../../../data/mappers/GroupMapper');
const {fetchDailyData} = require('../../../data/common/fetchDailyData');
const {fetchMonthlyData} = require('../../../data/common/fetchMonthlyData');
const {fetchTotal} = require('../../../data/common/fetchTotal');

export const groupResolvers = {
   Query: {
      groupStats: (root, context) => ({root, context}),
      groupEngagement: (root, context) => ({root, context}),
      ngoGroupData: (obj, args, root, context) => ({obj, args, root, context}),
      groupActivity: async (root, context) => ({root, context}),
      groupSearch: async (obj, args, root, context) => {
         return actionRunner(async () => {
            const groupData = await GroupService.listGroupData(args.input.group);

            return groupData;
         });
      },
   },
   GroupSearch: {
      __resolveType: (obj) => {
         if (obj instanceof Error) return 'Error';

         return 'Group';
      },
   },
   GroupActivity: {
      meetingActivity: async (root, context) => {
         return actionRunner(async () => {
            const last105Days = await GroupActivityService.calculateGroupActivitySince(105);

            return {
               last105Days: last105Days,
            };
         });
      },
      shareoutActivity: async (root, context) => {
         return actionRunner(async () => {
            const groupTotal = await GroupActivityService.calculateShareoutActivitySince(105);

            return groupTotal;
         });
      },
   },
   GroupStats: {
      groupTotal: async (root, context) => {
         return actionRunner(async () => {
            const groupTotal = await fetchTotal('Group');

            return groupTotal;
         });
      },
      groupSize: async (root, context) => {
         return actionRunner(async () => {
            const result = await GroupMapper.fetchGroupSizeData();

            const tempResult = result
               .filter((element) => element._id.groupSize > 6)
               .map((element) => {
                  return {
                     name: element._id.groupSize,
                     count: element.count,
                  };
               });

            const groupSizeStats = tempResult.filter((element) => element.count > 2);

            return groupSizeStats;
         });
      },
      groupsLastWeek: async (root, context) => {
         return actionRunner(async () => {
            const groupsLastWeek = await fetchDailyData('Group', 'registrationDate', 7);

            let groups = 0;

            groupsLastWeek.forEach((group) => (groups += group.count));

            return groups;
         });
      },
      groupsLastMonth: async (root, context) => {
         return actionRunner(async () => {
            const groupsLastMonth = await fetchDailyData('Group', 'registrationDate', 30);

            return groupsLastMonth;
         });
      },
      groupsLastYear: async (root, context) => {
         return actionRunner(async () => {
            const groupsLastYear = await fetchMonthlyData('Group', 'registrationDate');

            return groupsLastYear;
         });
      },
   },
   GroupEngagement: {
      groupsActive: async (root, context) => {
         return actionRunner(async () => {
            const allGroups = await GroupMapper.fetchAllGroups();
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
            const meetingFreq = GroupService.calculateMeetingFrequency();

            return meetingFreq;
         });
      },
      groupMeetingStats: async (root, context) => {
         return actionRunner(async () => {
            meetingStats = await GroupService.generateMeetingOverview();

            return meetingStats;
         });
      },
   },
   NGOGroupData: {
      groupData: async (obj, args, root, context) => {
         return actionRunner(async () => {
            const groupData = await GroupService.listGroupsByNGO(args.ngo);

            return groupData;
         });
      },
   },
};

