import {fetchTeamsByRegDate} from '../../../data/mappers/TeamMapper';
import {fetchEventCountByTeam} from '../../../data/mappers/FinanceMapper';
import {fetchMatchesByTeam} from '../../../data/mappers/MatchMapper';

export async function calculateTeamActivitySince(since) {
   const dbResult = await fetchTeamsByRegDate(since);

   const teams = [];

   dbResult.forEach((element) => {
      if (element.members.length > 6 && element.meetings.length > 2) {
         let group = {
            _id: element._id,
            size: element.members.length,
            meetings: element.meetings.length,
         };
         teams.push(group);
      }
   });

   const temp = [];

   while (since >= 15) {
      let meetings = await getTeamMatches(since, teams);
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

export async function getTeamMatches(since, groups) {
   const activity = await Promise.all(
      groups.map(async (group) => {
         let data = await fetchMatchesByTeam(group._id, since);

         return {id: group._id, size: group.size, meetings: data.length};
      })
   );
   return activity;
}

export async function calculateShareoutActivitySince(since) {
   const groups = await fetchTeamsByRegDate(since);

   const meetings = await Promise.all(
      groups.map(async (group) => {
         let data = await fetchMatchesByTeam(group._id, since);

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

   await Promise.all(
      meetings.forEach(async (group) => {
         const data = await Promise.all(
            group.meetings.map(async (id) => {
               const share = await fetchEventCountByTeam(id);

               if (share.length > 0) {
                  return {groupID: group.groupID, shareouts: share};
               }
            })
         );

         return data;
      })
   );
}
