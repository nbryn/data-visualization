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

module.exports = {
  fetchAllMeetings,
  fetchMeetingPerGroup,
};
