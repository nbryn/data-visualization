const { fetchMeetingsLastMonth } = require("../../data/meeting/MeetingLastMonthAction");
const { fetchMeetingTotal } = require("../../data/meeting/MeetingTotalAction");
const { fetchMeetingsLastYear } = require("../../data/meeting/MeetingLastYearAction");

const meetingResolvers = {
  Query: {
    meetingsTotal: async (parent, args, context, info) => {
      const result = await fetchMeetingTotal();


      return result;
    },
    meetingsLastMonth: async (parent, args, context, info) => {
      const result = await fetchMeetingsLastMonth();

      return {
        signups: result
      };
    },

    meetingsLastYear: async (parent, args, context, info) => {
      const result = await fetchMeetingsLastYear();

      return {
        signups: result
      };
    }
  }
};

module.exports = meetingResolvers;