const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = require("../logic/models/User");

let userModel;
let connection;
let isConnected;

async function getModel(modelToReturn) {
  if (!isConnected) connection = await connectToDB();

  if (modelToReturn === "User") {
    if (!userModel) userModel = connection.model("User", userSchema);
    return userModel;
  }
}

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });

    isConnected = true;

    connection = mongoose.connection;

    return connection;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getModel };
