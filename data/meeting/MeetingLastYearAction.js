const {fetchLastYear} = require("../fetchLastYear");

async function fetchMeetingsLastYear() {
 const result = await fetchLastYear("groupmeetings", "meetingDay");

 console.log(result);

 return result;
}

module.exports = { fetchMeetingsLastYear };
