const {
  fetchUserTotal,
  fetchUsersLastYear,
  fetchGenderStats
} = require("../data/mappers/UserMapper");

const {
  fetchGroupTotal,
  fetchGroupsLastMonth,
  fetchGroupsLastYear
} = require("../data/mappers/GroupMapper");

const {
  fetchMeetingTotal,
  fetchMeetingsLastYear
} = require("../data/mappers/MeetingMapper");
const { fetchShareStats } = require("../data/mappers/FinanceMapper");

const defaultResolvers = {
  Query: {
    keyStats: async (parent, args, context, info) => {
      const userTotal = await fetchUserTotal();
      const groupTotal = await fetchGroupTotal();
      const meetingTotal = await fetchMeetingTotal();
      const shareStats = await fetchShareStats();

      const { shareTotal } = shareStats;

      const groupsLastMonth = await fetchGroupsLastMonth();

      const usersLastYear = await fetchUsersLastYear();
      const groupLastYear = await fetchGroupsLastYear();
      const meetingsLastYear = await fetchMeetingsLastYear();
      const genderStats = await fetchGenderStats();

      return {
        userTotal,
        groupTotal,
        meetingTotal,
        shareTotal,
        userGender: genderStats,
        usersLastYear: { data: usersLastYear },
        groupsLastMonth: { data: groupsLastMonth },
        groupsLastYear: { data: groupLastYear },
        meetingsLastYear: { data: meetingsLastYear }
      };
    }
  }
};

module.exports = defaultResolvers;
