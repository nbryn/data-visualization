const { fetchLastMonth } = require("../fetchLastMonth");

async function fetchMeetingsLastMonth() {
  const result = await fetchLastMonth("groupmeetings", "meetingDay");

  return result;
}

module.exports = { fetchMeetingsLastMonth };
