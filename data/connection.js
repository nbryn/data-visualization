const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI_DEV, {
      useNewUrlParser: true
    });

    const connection = mongoose.connection;

    return connection;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connectToDB };
