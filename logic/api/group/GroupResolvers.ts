import * as GroupActivityService from './GroupActivityService';
import * as GroupMapper from '../../../data/mappers/GroupMapper';
import * as GroupService from './GroupService';
import {actionRunner} from '../../util/ActionRunner';
import {Error} from '../../util/Error';
import {Group} from '../../entities/Group';

export const groupResolvers = {
   Query: {
      groupStats: () => ({}),
      groupEngagement: () => ({}),
      ngoGroupData: (obj: any, args: any) => ({obj, args}),
      groupActivity: async () => ({}),
      groupSearch: async (obj: any, args: any): Promise<Partial<Group>> => {
         return actionRunner(async () => {
            const groupData = await GroupService.listGroupData(args.input.group);

            return groupData;
         });
      },
   },
   GroupSearch: {
      __resolveType: (obj: any): string => {
         if (obj instanceof Error) return 'Error';

         return 'Group';
      },
   },
   GroupActivity: {
      meetingActivity: async (): Promise<number> => {
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
      groupTotal: async (): Promise<number> => {
         return actionRunner(async () => {
            const groupTotal = await GroupMapper.fetchTotalGroupCount();

            return groupTotal;
         });
      },
      groupSize: async () => {
         return actionRunner(async () => {
            const result = await GroupMapper.fetchGroupSizeData();

            const groupSizeStats = result
               .filter((element) => element._id.groupSize > 6 && element.count > 2)
               .map((element) => ({
                  name: element._id.groupSize,
                  count: element.count,
               }));

            return groupSizeStats;
         });
      },
      groupsLastWeek: async (): Promise<number> => {
         return actionRunner(async () => {
            const groupsLastWeek = await GroupMapper.fetchGroupCountLastWeek();

            return groupsLastWeek;
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
            const meetingStats = await GroupService.generateMeetingOverview();

            return meetingStats;
         });
      },
   },
   NGOGroupData: {
      groupData: async (obj: any, args: any) => {
         return actionRunner(async () => {
            const groupData = await GroupService.listGroupsByNGO(args.ngo);

            return groupData;
         });
      },
   },
};
