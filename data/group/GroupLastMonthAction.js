const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchGroupsLastMonth() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        const since = moment()
          .startOf("day")
          .subtract(60, "days")
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

module.exports = { fetchGroupsLastMonth };
