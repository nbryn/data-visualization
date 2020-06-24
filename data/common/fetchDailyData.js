const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchDailyData(collectionToFetch, matchString, subtract) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(collectionToFetch, async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const since = moment()
            .startOf("year")
            .subtract(subtract, "days")
            .toDate();

          const dbResult = await collection
            .aggregate([
              {
                $match: {
                  [matchString]: { $gt: since },
                  state: "ACTIVE",
                },
              },
              {
                $group: {
                  _id: {
                    year: { $year: "$" + matchString },
                    month: { $month: "$" + matchString },
                    day: { $dayOfMonth: "$" + matchString },
                  },
                  count: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ])
            .toArray();

          const signups = dbResult.map((element) => {
            return {
              day: {
                year: element._id.year,
                month: element._id.month,
                day: element._id.day,
              },
              count: element.count,
            };
          });

          if (signups) {
            resolve(signups);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = { fetchDailyData };
