const { getModel } = require("../connection");

async function fetchAllMeetings() {
  const groupMeetingModel = await getModel("GroupMeeting");

  const allMeetingData = await groupMeetingModel.aggregate([
    {
      $match: { state: "ENDED" },
    },
  ]);
  return allMeetingData;
}

async function fetchGroupMeetingsSince(groupID, subtract) {
  const groupMeetingModel = await getModel("GroupMeeting");

  const since = moment().startOf("day").subtract(subtract, "days").toDate();
  const groupMeetingsSince = await groupMeetingModel.find({
    $and: [
      {
        group: groupID,
        meetingDay: { $gt: since },
      },
    ],
  });
  return groupMeetingsSince;
}

async function fetchMeetingsPerGroup() {
  const groupMeetingModel = await getModel("GroupMeeting");

  const meetingsPerGroup = await groupMeetingModel.aggregate([
    { $match: { state: "ENDED" } },
    { $group: { _id: "$group", count: { $sum: 1 } } },
    {
      $sort: { count: -1 },
    },
  ]);

  return meetingsPerGroup;
}

async function fetchMeetingShares() {
  const groupMeetingModel = await getModel("GroupMeeting");

  const meetingShares = await groupMeetingModel.find({
    $expr: { $gte: [{ $size: "$shares" }, 1] },
    state: "ENDED",
  });

  return meetingShares;
}

module.exports = {
  fetchAllMeetings,
  fetchMeetingsPerGroup,
  fetchMeetingShares,
  fetchGroupMeetingsSince,
};
