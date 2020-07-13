const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

const { getModel } = require("../connection");

async function fetchGroupByID(id) {
  const groupModel = await getModel("Group");

  try {
    const group = await groupModel
      .find(ObjectId(id))
      .project({ name: 1, currency: 1 })
      .toArray();

    return group;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupStats(groupBy) {
  const groupModel = await getModel("Group");

  try {
    const groupStats = await groupModel
      .aggregate([
        {
          $match: { state: "ACTIVE" },
        },
        {
          $group: {
            _id: groupBy,
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ])
      .toArray();

    return groupStats;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupMembersPerNGO() {
  const groupModel = await getModel("Group");

  try {
    const groupMembersPerNGO = await groupModel
      .aggregate([
        {
          $match: { state: "ACTIVE" },
        },
        {
          $group: {
            _id: "$ngoOrganization",
            count: { $sum: 1 },
            groups: { $push: { groupSize: { $size: "$members" } } },
          },
        },
      ])
      .toArray();

    return groupMembersPerNGO;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupBy(criteria, identifier) {
  const groupModel = await getModel("Group");

  try {
    const result = await groupModel.find({ [criteria]: identifier }).toArray();

    return result;
  } catch (err) {
    console.log(err);
  }
}

//Only field fetched is member id's
async function fetchAllGroups() {
  const groupModel = await getModel("Group");

  try {
    const groupMembers = await groupModel
      .find({ state: "ACTIVE" })
      .project({ _id: 1, members: 1 })
      .toArray();

    return groupMembers;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupSizeData() {
  const groupModel = await getModel("Group");

  try {
    const groupSizeData = await groupModel
      .aggregate([
        {
          $group: {
            _id: { groupSize: { $size: "$members" } },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return groupSizeData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchAllGroupData() {
  const groupModel = await getModel("Group");

  try {
    const allGroupData = await groupModel.find({}).toArray();

    return allGroupData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupMeetingData() {
  const groupModel = await getModel("Group");

  try {
    const groupMeetingData = await groupModel
      .aggregate([
        {
          $lookup: {
            from: "groupmeetings",
            localField: "_id",
            foreignField: "group",
            as: "meetings",
          },
        },
      ])
      .toArray();

    return groupMeetingData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupsByNGO(ngo) {
  const groupModel = await getModel("Group");

  try {
    const groupsNGO = await groupModel.find({ ngoOrganization: ngo }).toArray();

    return groupsNGO;
  } catch (err) {
    console.log(err);
  }
}

async function fetchNumberOfGroupsWith(currency) {
  const groupModel = await getModel("Group");

  try {
    const groupsWithCurrency = await groupModel
      .find({ state: "ACTIVE", currency })
      .count();

    return groupsWithCurrency;
  } catch (err) {
    console.log(err);
  }
}



async function fetchGroupsRegBefore(subtract) {
  const groupModel = await getModel("Group");

  try {
    const before = moment().startOf("day").subtract(subtract, "days").toDate();
    const dbResult = await groupModel
      .find({
        $and: [
          {
            state: "ACTIVE",
            registrationDate: { $lt: before },
          },
        ],
      })
      .project({ id_: 1, members: 1, meetings: 1 })
      .toArray();

    const result = [];

    dbResult.forEach((element) => {
      if (element.members.length > 6 && element.meetings.length > 2) {
        let group = {
          _id: element._id,
          size: element.members.length,
          meetings: element.meetings.length,
        };
        result.push(group);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// async function fetchGroupShareouts(meetingID) {
//   const groupModel = await getModel("Group");

//     try {
//       connection.db.groupModel(
//         "groupmeetingshareouts",
//         async (err, groupModel) => {
//           if (err) {
//             console.log(err);
//           } else {
//             const dbResult = await groupModel
//               .find({
//                 $and: [
//                   {
//                     meeting: meetingID,
//                   },
//                 ],
//               })
//               .toArray();

//             if (dbResult) {
//               resolve(dbResult);
//             }
//           }
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   });
// }

module.exports = {
  fetchGroupByID,
  fetchGroupBy,
  fetchAllGroups,
  fetchGroupStats,
  fetchGroupSizeData,
  fetchGroupMeetingData,
  fetchAllGroupData,
  fetchGroupsByNGO,
  fetchGroupsRegBefore,
  fetchNumberOfGroupsWith,
  fetchGroupMembersPerNGO,
};
