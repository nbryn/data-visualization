import {actionRunner} from '../../util/ActionRunner';
import {Error} from '../../util/Error';
import * as GroupMapper from '../../../data/mappers/GroupMapper';
const GroupActivityService = require('./GroupActivityService');
const GroupService = require('./GroupService');

export const groupResolvers = {
   Query: {
      groupStats: () => ({}),
      groupEngagement: () => ({}),
      ngoGroupData: (obj, args) => ({obj, args}),
      groupActivity: async () => ({}),
      groupSearch: async (obj, args) => {
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
      meetingActivity: async () => {
         return actionRunner(async () => {
            const last105Days = await GroupActivityService.calculateGroupActivitySince(105);

            return {
               last105Days: last105Days,
            };
         });
      },
      shareoutActivity: async () => {
         return actionRunner(async () => {
            const groupTotal = await GroupActivityService.calculateShareoutActivitySince(105);

            return groupTotal;
         });
      },
   },
   GroupStats: {
      groupTotal: async () => {
         return actionRunner(async () => {
            const groupTotal = await GroupMapper.fetchTotalGroupCount();

            return groupTotal;
         });
      },
      groupSize: async () => {
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
      groupsLastWeek: async () => {
         return actionRunner(async () => {
            const groupsLastWeek = await GroupMapper.fetchGroupCountLastWeek();

            let groups = 0;

            groupsLastWeek.forEach((group) => (groups += group.count));

            return groups;
         });
      },
      groupsLastMonth: async () => {
         return actionRunner(async () => {
            const groupsLastMonth = await GroupMapper.fetchGroupsLastMonth();

            return groupsLastMonth;
         });
      },
      groupsLastYear: async () => {
         return actionRunner(async () => {
            const groupsLastYear = await GroupMapper.fetchGroupsLastYear();

            return groupsLastYear;
         });
      },
   },
   GroupEngagement: {
      groupsActive: async () => {
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
      groupMeetingFrequency: async () => {
         return actionRunner(async () => {
            const meetingFreq = GroupService.calculateMeetingFrequency();

            return meetingFreq;
         });
      },
      groupMeetingStats: async () => {
         return actionRunner(async () => {
            meetingStats = await GroupService.generateMeetingOverview();

            return meetingStats;
         });
      },
   },
   NGOGroupData: {
      groupData: async (obj, args) => {
         return actionRunner(async () => {
            const groupData = await GroupService.listGroupsByNGO(args.ngo);

            return groupData;
         });
      },
   },
};
