const { fetchLastMonth } = require("../fetchLastMonth");

async function fetchGroupsLastMonth() {
  const result = await fetchLastMonth("groups", "registrationDate");

  return result;
}

module.exports = { fetchGroupsLastMonth };
