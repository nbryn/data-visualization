const { connectToDB } = require("../connection");

async function fetchTotal(collection) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    try {
      connection.db.collection(collection, async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const total = await collection.countDocuments("");

          if (total) {
            resolve(total);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = { fetchTotal };
