const { fetchMeetingsLastMonth } = require("../../data/actions/MeetingActions");
const { fetchMeetingTotal } = require("../../data/actions/MeetingActions");
const { fetchMeetingsLastYear } = require("../../data/actions/MeetingActions");

const meetingResolvers = {
  Query: {
    meetingStats: async (parent, args, context, info) => {    
      const meetingTotal = await fetchMeetingTotal();

      const meetingsPrevMonth = await fetchMeetingsLastMonth();

      const meetingsPrevYear = await fetchMeetingsLastYear();

      return {
        meetingTotal,
        meetingsLastMonth: { resultMonth: meetingsPrevMonth },
        meetingsLastYear: { resultYear: meetingsPrevYear }
      };
    }
  }
};

module.exports = meetingResolvers;