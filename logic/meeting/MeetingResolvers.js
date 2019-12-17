const {
  fetchMeetingsLastMonth,
  fetchMeetingsLastYear,
  fetchMeetingTotal
} = require("../../data/mappers/MeetingMapper");

const meetingResolvers = {
  Query: {
    meetingStats: async (parent, args, context, info) => {
      const meetingTotal = await fetchMeetingTotal();

      const meetingsPrevMonth = await fetchMeetingsLastMonth();

      const meetingsPrevYear = await fetchMeetingsLastYear();

      return {
        meetingTotal,
        meetingsLastMonth: { data: meetingsPrevMonth },
        meetingsLastYear: { data: meetingsPrevYear }
      };
    }
  }
};

module.exports = meetingResolvers;
