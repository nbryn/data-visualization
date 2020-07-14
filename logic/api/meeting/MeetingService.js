const {
  fetchMeetingsPerGroup,
  fetchMeetingShares,
} = require("../../../data/mappers/MeetingMapper");
const { fetchGroupByID } = require("../../../data/mappers/GroupMapper.js");

async function calculateMeetingsPerGroup() {
  const meetingsPerGroup = await fetchMeetingsPerGroup();

  const groups = await Promise.all(
    meetingsPerGroup.map(async (entry) => {
      const group = await fetchGroupByID(entry._id);

      return {
        name: group[0].name,
        currency: group[0].currency,
        count: entry.count,
      };
    })
  );

  return groups;
}

async function calculateSharesPerMeeting() {
  const meetingShares = await fetchMeetingShares();

  meetingShares.sort((a, b) => b.shares.length - a.shares.length);

  const temp = meetingShares.slice(0, 10);

  const result = temp.map((element) => {
    return {
      name: element._id.toString().substring(20),
      count: element.shares.length,
    };
  });

  return result;
}

module.exports = {
  calculateMeetingsPerGroup,
  calculateSharesPerMeeting,
};
