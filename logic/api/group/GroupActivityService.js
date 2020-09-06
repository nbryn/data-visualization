import {fetchGroupsRegBefore} from '../../../data/mappers/GroupMapper';
import {fetchGroupShareoutsByMeeting} from '../../../data/mappers/FinanceMapper';
import {fetchGroupMeetingsSince} from '../../../data/mappers/GroupMeetingMapper';

async function calculateGroupActivitySince(since) {
   const dbResult = await fetchGroupsRegBefore(since);

   const groups = [];

   dbResult.forEach((element) => {
      if (element.members.length > 6 && element.meetings.length > 2) {
         let group = {
            _id: element._id,
            size: element.members.length,
            meetings: element.meetings.length,
         };
         groups.push(group);
      }
   });

   const temp = [];

   while (since >= 15) {
      let meetings = await getGroupMeetings(since, groups);
      since = since - 15;

      temp.push(meetings);
   }

   const result = temp.map((element) => {
      let counter = 0;
      element.forEach((data) => (counter = data.meetings));
      return counter;
   });

   return result;
}

async function getGroupMeetings(since, groups) {
   const activity = await Promise.all(
      groups.map(async (group) => {
         let data = await fetchGroupMeetingsSince(group._id, since);

         return {id: group._id, size: group.size, meetings: data.length};
      })
   );
   return activity;
}

async function calculateShareoutActivitySince(since) {
   const groups = await fetchGroupsRegBefore(since);

   const meetings = await Promise.all(
      groups.map(async (group) => {
         let data = await fetchGroupMeetingsSince(group._id, since);

         let meetingIds = data.map((element) => element._id);

         return {groupID: group._id, meetings: meetingIds};
      })
   );

   meetings.filter((ele) => {
      if (ele.meetings.length > 0) {
         return true;
      } else {
         return false;
      }
   });

   const shareouts = await Promise.all(
      meetings.map(async (group) => {
         const data = await Promise.all(
            group.meetings.map(async (id) => {
               const share = await fetchGroupShareoutsByMeeting(id);

               if (share.length > 0) {
                  return {groupID: group.groupID, shareouts: share};
               }
            })
         );

         return data;
      })
   );
}

module.exports = {
   calculateGroupActivitySince,
   calculateShareoutActivitySince,
};
