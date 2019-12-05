const { fetchMeetingsLastMonth } = require("../../data/actions/MeetingActions");
const { fetchMeetingTotal } = require("../../data/actions/MeetingActions");
const { fetchMeetingsLastYear } = require("../../data/actions/MeetingActions");

const meetingResolvers = {
  Query: {
    meetingTotal: async (parent, args, context, info) => {
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