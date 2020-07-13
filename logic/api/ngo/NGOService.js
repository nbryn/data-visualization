const { fetchAllUsers } = require("../../../data/mappers/UserMapper");
const {
  fetchGroupMembersPerNGO,
} = require("../../../data/mappers/GroupMapper");
const {
  fetchAllGroupMembers,
} = require("../../../data/mappers/GroupMemberMapper");

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

async function calculateUsersPerNGO() {
  const result = await fetchGroupMembersPerNGO();

  const usersPerNGO = result
    .map((ele) => {
      let userCount = 0;

      ele.groups.forEach((members) => (userCount += members.groupSize));

      return {
        name: ele._id,
        count: userCount,
      };
    })
    .sort((a, b) => {
      if (a.count > b.count) return -1;
      if (b.count > a.count) return 1;

      return 0;
    });

  return usersPerNGO;
}

module.exports = { calculateGroupsPerUser, calculateUsersPerNGO };
