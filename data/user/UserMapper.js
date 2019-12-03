const dbConnection = require("../../index");

async function viewUserCollection() {
  dbConnection.db.listCollections().toArray((err, names) => {
    console.log(names);
  });
}

async function getUserByEmail(email) {
  dbConnection.db.collection("users", async (err, collection) => {
    const user = await collection.findOne({ email: email });
    console.log(user);
  });
}

viewUserCollection();

getUserByEmail("dap_dk@hotmail.com");

module.exports = { viewUserCollection };
