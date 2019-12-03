const { connectToDB } = require("../connection");

async function getGroupTotal() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    connection.db.collection("groups", async (err, collection) => {
      const numberOfGroups = await collection.countDocuments("");

      if (numberOfGroups) {
        resolve(numberOfGroups);
      }
    });
  });
}

module.exports = { getGroupTotal };
