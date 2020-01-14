const { connectToDB } = require("../connection");


async function fetchEtbLoanStats() {
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
                $lookup: {
                  from: "groupaccounts",
                  localField: "_id",
                  foreignField: "group",
                  as: "shares"
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

module.exports = {
  fetchEtbLoanStats
};
