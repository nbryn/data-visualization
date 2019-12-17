const { connectToDB } = require("../connection");

async function fetchFinanceStats(collectionToFetch, matchString, idString) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(collectionToFetch, async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              {
                $match: {
                  [matchString]: { $gt: 0 }
                }
              },
              {
                $group: {
                  _id: idString,
                  totalAmount: { $sum: "$" + matchString }
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

module.exports = { fetchFinanceStats };
