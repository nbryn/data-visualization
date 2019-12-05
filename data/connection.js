const mongoose = require("mongoose");

require("dotenv").config();

let connection;
let isConnected;

async function connectToDB() {
  if (isConnected) {
    return connection;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI_PROD, {
        useNewUrlParser: true
      });

      connection = mongoose.connection;
      isConnected = true;

      return connection;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { connectToDB };
