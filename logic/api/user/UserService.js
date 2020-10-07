import {fetchAllGroups} from '../../../data/mappers/TeamMapper';
import {fetchAllGroupMembers} from '../../../data/mappers/PlayerMapper';
import fetchAllUsers from '../../../data/mappers/UserMapper';

export async function calculateActiveUsers() {
   const allGroupMembers = await fetchAllGroupMembers();

   const allUsers = await fetchAllUsers();

   const allGroups = await fetchAllGroups();

   const activeGroups = allGroups.filter((group) => group.members.length > 6);

   let activeGroupMembers = [];

   allGroupMembers.forEach((member) => {
      for (let i = 0; i < activeGroups.length; i++) {
         if (member.group.toString() === activeGroups[i]._id.toString()) {
            activeGroupMembers.push(member);
            break;
         }
      }
   });

   let activeUsers = 0;

   allUsers.forEach((user) => {
      for (let i = 0; i < activeGroupMembers.length; i++) {
         if (user.toString() === activeGroupMembers[i].user.toString()) {
            activeUsers++;
            break;
         }
      }
   });

   return activeUsers;
}
