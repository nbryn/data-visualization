const { getModel } = require("../connection");

async function fetchAllMeetings() {
  const groupMeetingModel = await getModel("GroupMeeting");

  try {
    const allMeetingData = await groupMeetingModel.aggregate([
      {
        $match: { state: "ENDED" },
      },
    ]);
    return allMeetingData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupMeetingsSince(groupID, subtract) {
  const groupMeetingModel = await getModel("GroupMeeting");

  try {
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
  } catch (err) {
    console.log(err);
  }
}

async function fetchMeetingsPerGroup() {
  const groupMeetingModel = await getModel("GroupMeeting");

  try {
    const meetingsPerGroup = await groupMeetingModel.aggregate([
      { $match: { state: "ENDED" } },
      { $group: { _id: "$group", count: { $sum: 1 } } },
      {
        $sort: { count: -1 },
      },
    ]);
    return meetingsPerGroup;
  } catch (err) {
    console.log(err);
  }
}

async function fetchMeetingShares() {
  const groupMeetingModel = await getModel("GroupMeeting");

  try {
    const meetingShares = await groupMeetingModel
      .find({
        $expr: { $gte: [{ $size: "$shares" }, 1] },
        state: "ENDED",
      })
      .project({
        _id: 1,
        shares: 1,
      });
    return meetingShares;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  fetchAllMeetings,
  fetchMeetingsPerGroup,
  fetchMeetingShares,
  fetchGroupMeetingsSince,
};
