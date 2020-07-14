const { getModel } = require("../connection");

async function fetchAllGroupMembers() {
  const groupMemberModel = await getModel("GroupMember");

  const allGroupMembers = await groupMemberModel.find({ state: "ACTIVE" });
  return allGroupMembers;
}

async function fetchAllMemberIDsFromGroup(groupID) {
  const groupMemberModel = await getModel("GroupMember");

  const memberIDs = await groupMemberModel.find(
    {
      group: groupID,
    },
    { projection: { user: 1 } }
  );

  return memberIDs;
}

async function fetchGroupMemberByUser() {
  const groupMemberModel = await getModel("GroupMember");

  const groupMemberUsers = await groupMemberModel.aggregate([
    {
      $lookup: {
        from: "users",
        let: {
          id: "$_id",
          firstName: "$firstName",
          lastName: "lastName",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$id", "$user"] }],
              },
            },
          },
        ],
        as: "userGroups",
      },
    },
  ]);
  return groupMemberUsers;
}

async function fetchUserIDByRole(role, groupID) {
  const groupMemberModel = await getModel("GroupMember");

  const userIDs = await groupMemberModel.find(
    {
      $and: [{ group: groupID }, { groupRoles: role }],
    },
    { projection: { user: 1 } }
  );
  if (role === "(.*?)") {
    console.log(dbResult);
  }

  return userIDs;
}

module.exports = {
  fetchAllGroupMembers,
  fetchAllMemberIDsFromGroup,
  fetchGroupMemberByUser,
  fetchUserIDByRole,
};
