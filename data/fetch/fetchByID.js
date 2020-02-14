const { connectToDB } = require("../connection");

async function fetchByID(collection, ID) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    try {
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
  } catch (err) {
    console.log(err);
  }
  });
}

module.exports = { fetchByID };
