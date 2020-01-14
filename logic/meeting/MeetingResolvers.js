const { fetchMeetingTotal } = require("../../data/mappers/MeetingMapper");
const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");

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
      const meetingsLastMonth = await fetchDailyData(
        "groupmeetings",
        "meetingDay"
      );

      return { data: meetingsLastMonth };
    },
    meetingsLastYear: async (root, context) => {
      const meetingsLastYear = await fetchMonthlyData(
        "groupmeetings",
        "meetingDay"
      );

      return { data: meetingsLastYear };
    }
  }
};

module.exports = meetingResolvers;
