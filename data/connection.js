const mongoose = require("mongoose");

require("dotenv").config();

async function connectToDB() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Connection Open");
  });

  return connection;
}

connectToDB();

module.exports = { connectToDB };
