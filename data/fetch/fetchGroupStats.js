const { connectToDB } = require("../connection");

async function fetchGroupStats(groupBy) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              {
                $group: {
                  _id: groupBy,
                  count: { $sum: 1 }
                }
              }
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

module.exports = { fetchGroupStats };
