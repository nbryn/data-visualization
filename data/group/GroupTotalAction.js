const { fetchTotal } = require("../fetchTotal");

async function fetchGroupTotal() {
  const result = await fetchTotal("groups");

  return result;
}

module.exports = { fetchGroupTotal };