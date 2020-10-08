import * as MatchMapper from '../../../data/mappers/MatchMapper';
import {CountDTO} from '../../util/DTOs';
import {fetchTeamById} from '../../../data/mappers/TeamMapper';

export async function calculateMatchesPerTeam(): Promise<CountDTO[]> {
   const matchesPerTeam = await MatchMapper.fetchAllMatchData();

   const matches = await Promise.all(
      matchesPerTeam.map(async (entry) => {
         const team = await fetchTeamById(entry._id);

         return {
            name: team!.name,
            currency: team!.currency,
            count: entry.count,
         };
      })
   );

   return matches.slice(0, 10).sort((a, b) => a.count - b.count);
}

export async function calculateMeetingsPerMatch(): Promise<CountDTO[]> {
   const matchMeetings = await MatchMapper.fetchMatchMeetingData();

   const temp = matchMeetings.slice(0, 10);

   const result = temp.map((element) => ({
      name: element._id.toString().substring(20),
      count: element.shares.length,
   }));

   return result.sort((a, b) => a.count - b.count);
}
