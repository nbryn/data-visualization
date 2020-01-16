const { fetchAllUsers } = require("../../data/mappers/UserMapper");
const { fetchAllGroups } = require("../../data/mappers/GroupMapper");

async function getActiveUsersCount() {
  const allUsers = await fetchAllUsers();

  const allGroups = await fetchAllGroups();

  let activeUsers = 0;

  console.log(allGroups);

  allUsers.forEach(user => {
    for (const group in allGroups) {
      //console.log(Object.values(group));
      let memberList = group.members;
      //console.log(memberList);
      for (const member in memberList) {
        // console.log("User: " + typeof user);
        // console.log("member: " + typeof members[j]);
        if (user.toString() == member.toString()) {
          // console.log(user);
          // console.log(members[j]);
          activeUsers++;
          break;
        }
      }
    }
  });

  console.log(activeUsers);
}

module.exports = { getActiveUsersCount };
