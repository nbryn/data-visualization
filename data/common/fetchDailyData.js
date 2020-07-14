const moment = require("moment");
const { getModel} = require("../connection");

async function fetchDailyData(collection, matchString, subtract) {
  const model = await getModel(collection);

  try {
    const since = moment().startOf("year").subtract(subtract, "days").toDate();

    const dbResult = await model.aggregate([
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
    ]);

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

    return signups;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { fetchDailyData };
