const { getModel } = require("../connection");

async function fetchAllGroupMembers() {
  const groupMemberModel = await getModel("GroupMember");

  try {
    const allGroupMembers = await groupMemberModel.find({ state: "ACTIVE" });
    return allGroupMembers;
  } catch (err) {
    console.log(err);
  }
}

async function fetchAllMemberIDsFromGroup(groupID) {
  const groupMemberModel = await getModel("GroupMember");

  try {
    const memberIDs = await groupMemberModel
      .find({
        group: groupID,
      })
      .project({ user: 1 });
    return memberIDs;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupMemberByUser() {
  const groupMemberModel = await getModel("GroupMember");

  try {
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
  } catch (err) {
    console.log(err);
  }
}

async function fetchUserIDByRole(role, groupID) {
  const groupMemberModel = await getModel("GroupMember");

  try {
    const userIDs = await groupMemberModel
      .find({
        $and: [{ group: groupID }, { groupRoles: role }],
      })
      .project({ user: 1 });
    if (role === "(.*?)") {
      console.log(dbResult);
    }

    return userIDs;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  fetchAllGroupMembers,
  fetchAllMemberIDsFromGroup,
  fetchGroupMemberByUser,
  fetchUserIDByRole,
};
