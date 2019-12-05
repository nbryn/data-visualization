const { fetchLastMonth } = require("../fetch/fetchLastMonth");
const { fetchLastYear } = require("../fetch/fetchLastYear");
const { fetchTotal } = require("../fetch/fetchTotal");

async function fetchGroupTotal() {
  const result = await fetchTotal("groups");

  return result;
}

async function fetchGroupsLastMonth() {
  const result = await fetchLastMonth("groups", "registrationDate");

  return result;
}


async function fetchGroupsLastYear() {
  const result = await fetchLastYear("groups", "registrationDate");

  return result;
}

module.exports = { fetchGroupTotal, fetchGroupsLastMonth, fetchLastYear };
