const { fetchTotal } = require("../fetch/fetchTotal");

async function fetchMeetingTotal() {
  const result = await fetchTotal("groupmeetings");

  return result;
}

module.exports = {
  fetchMeetingTotal
};
