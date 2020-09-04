import {actionRunner} from '../../util/ActionRunner';
import * as MeetingMapper from '../../../data/mappers/GroupMeetingMapper';
const {calculateMeetingsPerGroup, calculateSharesPerMeeting} = require('./MeetingService');

export const meetingResolvers = {
   Query: {
      meetingStats: () => ({}),
   },
   MeetingStats: {
      meetingTotal: async () => {
         return actionRunner(async () => {
            const meetingTotal = await MeetingMapper.fetchTotalMeetingCount();

            return meetingTotal;
         });
      },
      meetingsLastMonth: async () => {
         return actionRunner(async () => {
            const meetingsLastMonth = await MeetingMapper.fetchMeetingsLastMonth();

            return meetingsLastMonth;
         });
      },
      meetingsLastYear: async () => {
         return actionRunner(async () => {
            const meetingsLastYear = await MeetingMapper.fetchMeetingLastYear();

            return meetingsLastYear;
         });
      },
      meetingsPerGroup: async () => {
         return actionRunner(async () => {
            const meetingsPerGroup = await calculateMeetingsPerGroup();

            return meetingsPerGroup.slice(0, 10);
         });
      },
      sharesPerMeeting: async () => {
         return actionRunner(async () => {
            const meetingShares = await calculateSharesPerMeeting();

            return meetingShares;
         });
      },
   },
};
