const { connectToDB } = require("../connection");

async function fetchByID(collection, ID) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection(collection, async (err, collection) => {
      if (err) {
        console.log(err);
      } else {
        const dbResult = await collection
          .find({ _id: ID })
          .toArray();

   
        if (dbResult) {
          resolve(dbResult);
        }
      }
    });
  });
}

module.exports = { fetchByID };
