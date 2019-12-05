const { fetchLastYear } = require("../fetchLastYear");

async function fetchUsersLastYear() {
  const result = await fetchLastYear("users", "signupDate");

  return result;
}

module.exports = { fetchUsersLastYear };
