import * as MatchMapper from '../../../data/mappers/MatchMapper';
import {fetchTeamById} from '../../../data/mappers/TeamMapper';

export async function calculateMatchesPerTeam() {
   const matchesPerTeam = await MatchMapper.fetchAllMatchData();

   const matches = await Promise.all(
      matchesPerTeam.map(async (entry) => {
         const group = await fetchTeamById(entry._id);

         return {
            name: group.name,
            currency: group.currency,
            count: entry.count,
         };
      })
   );

   return matches;
}

export async function calculateMeetingsPerMatch() {
   const matchMeetings = await MatchMapper.fetchMatchMeetingData();

   matchMeetings.sort((a, b) => b.shares.length - a.shares.length);

   const temp = matchMeetings.slice(0, 10);

   const result = temp.map((element) => {
      return {
         name: element._id.toString().substring(20),
         count: element.shares.length,
      };
   });

   return result;
}
