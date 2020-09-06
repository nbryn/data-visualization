import * as MeetingMapper from '../../../data/mappers/GroupMeetingMapper';
import {actionRunner} from '../../util/ActionRunner';
const MeetingService = require('./MeetingService');

export const meetingResolvers = {
   Query: {
      meetingStats: () => ({}),
   },
   MeetingStats: {
      meetingTotal: async (): Promise<number> => {
         return actionRunner(async () => {
            const meetingTotal = await MeetingMapper.fetchTotalMeetingCount();

            return meetingTotal;
         });
      },
      meetingsLastMonth: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const meetingsLastMonth = await MeetingMapper.fetchMeetingsLastMonth();

            return meetingsLastMonth;
         });
      },
      meetingsLastYear: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const meetingsLastYear = await MeetingMapper.fetchMeetingLastYear();

            return meetingsLastYear;
         });
      },
      meetingsPerGroup: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const meetingsPerGroup = await MeetingService.calculateMeetingsPerGroup();

            return meetingsPerGroup.slice(0, 10);
         });
      },
      sharesPerMeeting: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const meetingShares = await MeetingService.calculateSharesPerMeeting();

            return meetingShares;
         });
      },
   },
};
