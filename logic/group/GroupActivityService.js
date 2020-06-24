const {
  fetchGroupsRegBefore,
  fetchGroupMeetingsSince,
} = require("../../data/mappers/GroupMapper");

async function calculateGroupActivitySince(since) {
  const groups = await fetchGroupsRegBefore(since);

  const temp = [];

  while (since >= 15) {
    let meetings = await getGroupMeetings(since, groups);
    since = since - 15;

    temp.push(meetings);
  }

  const result = temp.map((element) => {
    let counter = 0;
    element.forEach((data) => (counter = data.meetings));
    return counter;
  });

  return result;
}

async function getGroupMeetings(since, groups) {
  const activity = await Promise.all(
    groups.map(async (group) => {
      let data = await fetchGroupMeetingsSince(group._id, since);

      return { id: group._id, size: group.size, meetings: data.length };
    })
  );
  return activity;
}

module.exports = { calculateGroupActivitySince };
