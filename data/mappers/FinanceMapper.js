const { connectToDB } = require("../connection");

async function fetchAccountDataByGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupaccounts", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({ group: groupID })
            .project({ totalShares: 1, boxBalance: 1 })
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchLoansByGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetingloans", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection.count({ group: groupID });

          if (dbResult < 1) {
            resolve(dbResult);
          }

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchLoanData() {
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

module.exports = { fetchLoansByGroup, fetchAccountDataByGroup, fetchLoanData };
