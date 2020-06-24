const { fetchTotal } = require("../../data/common/fetchTotal");
const { fetchDailyData } = require("../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../data/common/fetchMonthlyData");

const meetingResolvers = {
  Query: {
    meetingStats: (root, context) => ({ root, context })
  },
  MeetingStats: {
    meetingTotal: async (root, context) => {
      const meetingTotal = await fetchTotal("groupmeetings");

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
