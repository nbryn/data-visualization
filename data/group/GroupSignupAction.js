const moment = require("moment");
const { connectToDB } = require("../connection");

async function getGroupSignups(days) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        const since = moment()
          .startOf("day")
          .subtract(days, "days")
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
                  year: { $year: "$registrationDate" },
                  month: { $month: "$registrationDate" },
                  day: { $dayOfMonth: "$registrationDate" }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ])
          .toArray();

        const signups = signupsInPeriod.map(element => {
          return {
            day: {
              year: element._id.year,
              month: element._id.month,
              day: element._id.day
            },
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

module.exports = { getGroupSignups };
