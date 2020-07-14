const { getModel } = require("../connection");

async function fetchByID(collection, ID) {
  const model = await getModel(collection);

  try {
    const dbResult = await model.find({ _id: ID });

    return dbResult;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { fetchByID };
