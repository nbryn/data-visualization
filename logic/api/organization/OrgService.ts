import {CountDTO} from '../../util/DTOs';
import {fetchAllUsers} from '../../../data/mappers/UserMapper';
import {fetchOrgPlayerCount} from '../../../data/mappers/TeamMapper';
import {fetchAllPlayers} from '../../../data/mappers/PlayerMapper';

export async function calculateTeamsPerUser(): Promise<CountDTO[]> {
   const users = await fetchAllUsers();
   const players = await fetchAllPlayers();

   const teamsPerUser: CountDTO[] = [];

   users.forEach((user) => {
      teamsPerUser.push({
         id: user._id.toString(),
         name: user.firstName + ' ' + user.lastName,
         count: 1,
      });
   });

   players.forEach((ele) => {
      for (let i = 0; i < teamsPerUser.length; i++) {
         if (teamsPerUser[i].id === ele.user.toString()) {
            teamsPerUser[i].count += 1;
         }
      }
   });

   const result = teamsPerUser
      .filter((ele) => ele.count > 5)
      .sort((a: CountDTO, b: CountDTO) => a.count - b.count);

   return result;
}

export async function calculateUsersPerOrg(): Promise<CountDTO[]> {
   const playersPerOrg = await fetchOrgPlayerCount();

   const usersPerOrg = playersPerOrg
      .map((ele) => {
         let userCount = 0;

         ele.teams.forEach((team) => (userCount += team.size));

         return {
            name: ele._id,
            count: userCount,
         };
      })
      .sort((a, b) => a.count - b.count);

   return usersPerOrg;
}
