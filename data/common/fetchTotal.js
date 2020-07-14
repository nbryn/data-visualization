const { getModel } = require("../connection");

async function fetchTotal(collection) {
  const model = await getModel(collection);

  try {
    const total = await model.countDocuments("");

    return total;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { fetchTotal };
