const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchLastMonth(collectionToFetch, matchString) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(collectionToFetch, async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const since = moment()
          .startOf("day")
          .subtract(30, "days")
          .toDate();

        const signupsInPeriod = await collection
          .aggregate([
            {
              $match: {
                [matchString]: { $gt: since }
              }
            },
            {
              $group: {
                _id: {
                  year: { $year: "$" + matchString },
                  month: { $month: "$" + matchString },
                  day: { $dayOfMonth: "$" +  matchString }
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

module.exports = { fetchLastMonth };