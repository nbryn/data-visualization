const { connectToDB } = require("../connection");

async function fetchCurrencyStats() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupaccounts", async (err, collection) => {
        const currenciesResult = await collection
          .aggregate([
            {
              $group: {
                _id: "$currency",
                totalAmount: { $sum: "$totalBalance" }
              }
            }
          ])
          .toArray();

        const currencyStats = currenciesResult
          .filter(element => element.totalAmount !== 0)
          .map(element => {
            if (element.totalAmount !== 0) {
              return {
                name: element._id,
                totalAmount: element.totalAmount
              };
            }
          });

        if (currencyStats) {
          resolve(currencyStats);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}
module.exports = { fetchCurrencyStats };
