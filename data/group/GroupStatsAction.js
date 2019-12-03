const moment = require("moment");

require("dotenv").config()

async function connectToDB() {
  await mongoose.connect(process.env.MONGODB_URI_DEV, {
    useNewUrlParser: true
  });

  const connection = mongoose.connection;

  return connection;
}

async function getGroupStats(callback) {
  const connection = await connectToDB();

  connection.db.collection("groups", async (err, collection) => {
    const since = moment()
      .startOf("day")
      .subtract(200, "days")
      .toDate();
    const numberOfGroups = await collection.countDocuments("");
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

    console.log(numberOfGroups);
    console.log(signups);

    let result = [];
    result.push(numberOfGroups);
    result.push(signups);

   callback(result);
  });
}

module.exports = { getGroupStats };
