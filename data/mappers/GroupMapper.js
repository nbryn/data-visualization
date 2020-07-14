const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;

const { getModel } = require("../connection");

async function fetchGroupByID(id) {
  const groupModel = await getModel("Group");

  const group = await groupModel.find(ObjectId(id));

  return group;
}

async function fetchGroupStats(groupBy) {
  const groupModel = await getModel("Group");

  const groupStats = await groupModel.aggregate([
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
  ]);
  return groupStats;
}

async function fetchGroupMembersPerNGO() {
  const groupModel = await getModel("Group");

  const groupMembersPerNGO = await groupModel.aggregate([
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
  ]);
  return groupMembersPerNGO;
}

async function fetchGroupBy(criteria, identifier) {
  const groupModel = await getModel("Group");

  const result = await groupModel.find({ [criteria]: identifier });

  return result;
}

//Only field fetched is member id's
async function fetchAllGroups() {
  const groupModel = await getModel("Group");

  const groupMembers = await groupModel.find(
    { state: "ACTIVE" },
    { projection: { _id: 1, members: 1 } }
  );

  return groupMembers;
}

async function fetchGroupSizeData() {
  const groupModel = await getModel("Group");

  const groupSizeData = await groupModel.aggregate([
    {
      $group: {
        _id: { groupSize: { $size: "$members" } },
        count: { $sum: 1 },
      },
    },
  ]);
  return groupSizeData;
}

async function fetchAllGroupData() {
  const groupModel = await getModel("Group");

  const allGroupData = await groupModel.find({});

  return allGroupData;
}

async function fetchGroupMeetingData() {
  const groupModel = await getModel("Group");

  const groupMeetingData = await groupModel.aggregate([
    {
      $lookup: {
        from: "groupmeetings",
        localField: "_id",
        foreignField: "group",
        as: "meetings",
      },
    },
  ]);
  return groupMeetingData;
}

async function fetchGroupsByNGO(ngo) {
  const groupModel = await getModel("Group");

  const groupsNGO = await groupModel.find({ ngoOrganization: ngo });

  return groupsNGO;
}

async function fetchNumberOfGroupsWith(currency) {
  const groupModel = await getModel("Group");

  const groupsWithCurrency = await groupModel
    .find({ state: "ACTIVE", currency })
    .count();

  return groupsWithCurrency;
}

async function fetchGroupsRegBefore(subtract) {
  const groupModel = await getModel("Group");

  const before = moment().startOf("day").subtract(subtract, "days").toDate();
  const dbResult = await groupModel.find(
    {
      $and: [
        {
          state: "ACTIVE",
          registrationDate: { $lt: before },
        },
      ],
    },
    { projection: { _id: 1, mebers: 1, meetings: 1 } }
  );

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
}

async function fetchLoanData() {
  const groupModel = await getModel("Group");

  const loanData = await groupModel.aggregate([
    {
      $lookup: {
        from: "groupaccounts",
        localField: "_id",
        foreignField: "group",
        as: "shares",
      },
    },
  ]);
  return loanData;
}

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
  fetchLoanData,
};
