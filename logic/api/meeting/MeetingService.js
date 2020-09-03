import * as MeetingMapper from '../../../data/mappers/MeetingMapper';
import {fetchGroupByID} from '../../../data/mappers/GroupMapper';

async function calculateMeetingsPerGroup() {
   const meetingsPerGroup = await MeetingMapper.fetchMeetingsPerGroup();

   const groups = await Promise.all(
      meetingsPerGroup.map(async (entry) => {
         const group = await fetchGroupByID(entry._id);

         return {
            name: group.name,
            currency: group.currency,
            count: entry.count,
         };
      })
   );

   return groups;
}

async function calculateSharesPerMeeting() {
   const meetingShares = await MeetingMapper.fetchMeetingShares();

   meetingShares.sort((a, b) => b.shares.length - a.shares.length);

   const temp = meetingShares.slice(0, 10);

   const result = temp.map((element) => {
      return {
         name: element._id.toString().substring(20),
         count: element.shares.length,
      };
   });

   return result;
}

module.exports = {
   calculateMeetingsPerGroup,
   calculateSharesPerMeeting,
};
