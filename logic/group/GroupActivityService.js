const {
  fetchGroupsRegBefore,
  fetchGroupMeetingsSince,
  fetchGroupShareouts,
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

async function calculateShareoutActivitySince(since) {
  const groups = await fetchGroupsRegBefore(since);

  const meetings = await Promise.all(
    groups.map(async (group) => {
      let data = await fetchGroupMeetingsSince(group._id, since);

      let meetingIds = data.map((element) => element._id);

      return { groupID: group._id, meetings: meetingIds };
    })
  );

  meetings.filter((ele) => {
    if (ele.meetings.length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const shareouts = await Promise.all(
    meetings.map(async (group) => {
      const data = await Promise.all(
        group.meetings.map(async (id) => {
          const share = await fetchGroupShareouts(id);

          if (share.length > 0) {
            return { groupID: group.groupID, shareouts: share };
          }
        })
      );

      return data;
    })
  );
}

module.exports = {
  calculateGroupActivitySince,
  calculateShareoutActivitySince,
};
