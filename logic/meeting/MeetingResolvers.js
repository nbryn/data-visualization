const {
  fetchMeetingsLastMonth,
  fetchMeetingsLastYear,
  fetchMeetingTotal
} = require("../../data/mappers/MeetingMapper");

const meetingResolvers = {
  Query: {
    meetingStats: (root, context) => ({ root, context })
  },
  MeetingStats: {
    meetingTotal: async (root, context) => {
      const meetingTotal = await fetchMeetingTotal();

      return meetingTotal;
    },
    meetingsLastMonth: async (root, context) => {
      const meetingsLastMonth = await fetchMeetingsLastMonth();

      return { data: meetingsLastMonth };
    },
    meetingsLastYear: async (root, context) => {
      const meetingsLastYear = await fetchMeetingsLastYear();

      return { data: meetingsLastYear };
    }
  }
};

module.exports = meetingResolvers;
