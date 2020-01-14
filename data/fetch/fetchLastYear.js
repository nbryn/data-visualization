const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchLastYear(collectionToFetch, matchString) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(collectionToFetch, async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const since = moment()
            .startOf("day")
            .subtract(365, "days")
            .toDate();

          const dbResult = await collection
            .aggregate([
              {
                $group: {
                  _id: {
                    month: { $month: "$" + matchString },
                    year: { $year: "$" + matchString }
                  },
                  count: { $sum: 1 }
                }
              },
              { $sort: { _id: 1 } }
            ])
            .toArray();

          const signups = dbResult.map(element => {
            return {
              year: element._id.year,
              month: element._id.month,
              count: element.count
            };
          });

          signups.sort((ele1, ele2) => {
            return ele1.year - ele2.year;
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

module.exports = { fetchLastYear };
