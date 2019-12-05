const { fetchLastYear } = require("../fetchLastYear");

async function fetchGroupsLastYear() {
  const result = await fetchLastYear("groups", "registrationDate");

  return result;
}

module.exports = { fetchGroupsLastYear };
