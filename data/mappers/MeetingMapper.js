const { connectToDB } = require("../connection");

async function fetchAllMeetings() {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetings", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              {
                $match: { state: "ENDED" },
              },
            ])
            .toArray();

          if (result) {
            resolve(result);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupMeetingsSince(groupID, subtract) {
  const groupModel = await getModel("Group");

  return new Promise((resolve, reject) => {
    try {
      connection.db.groupModel("groupmeetings", async (err, groupModel) => {
        if (err) {
          console.log(err);
        } else {
          const since = moment()
            .startOf("day")
            .subtract(subtract, "days")
            .toDate();
          const dbResult = await groupModel
            .find({
              $and: [
                {
                  group: groupID,
                  meetingDay: { $gt: since },
                },
              ],
            })
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchMeetingPerGroup() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetings", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              { $match: { state: "ENDED" } },
              { $group: { _id: "$group", count: { $sum: 1 } } },
              {
                $sort: { count: -1 },
              },
            ])
            .toArray();
          if (result) {
            resolve(result);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchMeetingShares() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetings", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .find({
              $expr: { $gte: [{ $size: "$shares" }, 1] },
              state: "ENDED",
            })
            .project({
              _id: 1,
              shares: 1,
            })
            .toArray();
          if (result) {
            resolve(result);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  fetchAllMeetings,
  fetchMeetingPerGroup,
  fetchMeetingShares,
  fetchGroupMeetingsSince,
};
