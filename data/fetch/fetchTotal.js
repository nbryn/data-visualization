const { connectToDB } = require("../connection");

async function fetchTotal(collectionString) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection(collectionString, async (err, collection) => {
      
      const total = await collection.countDocuments("");

      if (total) {
        resolve(total);
      }
    });
  });
}

module.exports = { fetchTotal };
