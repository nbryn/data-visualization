const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchGroupsLastYear() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        const since = moment()
          .startOf("day")
          .subtract(365, "days")
          .toDate();

        const signupsInPeriod = await collection
          .aggregate([
            {
              $match: {
                registrationDate: { $gt: since }
              }
            },
            {
              $group: {
                _id: {
                  month: { $month: "$registrationDate" }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ])
          .toArray();

        const signups = signupsInPeriod.map(element => {
          return {
            month: element._id.month,
            count: element.count
          };
        });

        if (signups) {
          resolve(signups);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = { fetchGroupsLastYear };
