const { fetchAllUsers } = require("../../data/mappers/UserMapper");
const {
  fetchAllGroupMembers,
  fetchGroupMemberByUser,
} = require("../../data/mappers/GroupMapper");

async function calculateGroupsPerUser() {
  //   return await fetchGroupMemberByUser();
  const users = await fetchAllUsers();
  const groupMembers = await fetchAllGroupMembers();

  const groupsPerUser = [];

  users.forEach((user) => {
    groupsPerUser.push({
      id: user._id.toString(),
      name: user.firstName + " " + user.lastName,
      count: 1,
    });
  });

  groupMembers.forEach((ele) => {
    for (let i = 0; i < groupsPerUser.length; i++) {
      if (groupsPerUser[i].id === ele.user.toString()) {
        groupsPerUser[i].count += 1;
      }
    }
  });

  const result = groupsPerUser
    .filter((ele) => ele.count > 5)
    .sort((a, b) => {
      if (a.count < b.count) return 1;
      if (a.count === b.count) return 0;

      return -1;
    });

  return result;
}

module.exports = { calculateGroupsPerUser };
