import fetchAllUsers from '../../../data/mappers/UserMapper';
import {fetchTeamMembersPerOrg} from '../../../data/mappers/TeamMapper';
import {fetchAllTeamMembers} from '../../../data/mappers/PlayerMapper';

export async function calculateTeamsPerUser() {
   //   return await fetchGroupMemberByUser();
   const users = await fetchAllUsers();
   const teamMembers = await fetchAllTeamMembers();

   const teamsPerUser = [];

   users.forEach((user) => {
      teamsPerUser.push({
         id: user._id.toString(),
         name: user.firstName + ' ' + user.lastName,
         count: 1,
      });
   });

   teamMembers.forEach((ele) => {
      for (let i = 0; i < teamsPerUser.length; i++) {
         if (teamsPerUser[i].id === ele.user.toString()) {
            teamsPerUser[i].count += 1;
         }
      }
   });

   const result = teamsPerUser
      .filter((ele) => ele.count > 5)
      .sort((a, b) => {
         if (a.count < b.count) return 1;
         if (a.count === b.count) return 0;

         return -1;
      });

   return result;
}

export async function calculateUsersPerOrg() {
   const result = await fetchTeamMembersPerOrg();

   const usersPerNGO = result
      .map((ele) => {
         let userCount = 0;

         ele.groups.forEach((members) => (userCount += members.groupSize));

         return {
            name: ele._id,
            count: userCount,
         };
      })
      .sort((a, b) => a.count - b.count);

   return usersPerNGO;
}
