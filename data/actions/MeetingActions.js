const { fetchTotal } = require("../fetch/fetchTotal");
const { fetchLastMonth } = require("../fetch/fetchLastMonth");
const { fetchLastYear } = require("../fetch/fetchLastYear");

async function fetchMeetingTotal() {
  const result = await fetchTotal("groupmeetings");

  return result;
}

async function fetchMeetingsLastMonth() {
  const result = await fetchLastMonth("groupmeetings", "meetingDay");

  return result;
}

async function fetchMeetingsLastYear() {
  const result = await fetchLastYear("groupmeetings", "meetingDay");

  console.log(result);

  return result;
}

module.exports = { fetchMeetingTotal, fetchMeetingsLastMonth, fetchMeetingsLastYear };
