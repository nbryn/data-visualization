const { connectToDB } = require("../connection");

async function fetchTotal(collectionString) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    connection.db.collection(collectionString, async (err, collection) => {
      console.log(collectionString);
      const total = await collection.countDocuments("");

      console.log(total);

      if (total) {
        resolve(total);
      }
    });
  });
}

module.exports = { fetchTotal };
