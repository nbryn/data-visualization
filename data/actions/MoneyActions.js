const { connectToDB } = require("../connection");

async function fetchMoneyTotal() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(
        "groupmeetingboxbalances",
        async (err, collection) => {
          const totalAmount = await collection
            .aggregate([
              {
                $group: {
                  _id: null,
                  totalAmount: { $sum: "$totalBalance" }
                }
              }
            ])
            .toArray();

          if (totalAmount) {
            resolve(totalAmount);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
}
module.exports = { fetchMoneyTotal };
