const { fetchMeetingPerGroup } = require("../../data/mappers/MeetingMapper");
const { fetchGroupByID } = require("../../data/mappers/GroupMapper.js");

async function calculateMeetingsPerGroup() {
  const meetingsPerGroup = await fetchMeetingPerGroup();

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

module.exports = {
  calculateMeetingsPerGroup,
};
