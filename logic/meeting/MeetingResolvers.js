const { fetchTotal } = require("../../data/common/fetchTotal");
const { fetchDailyData } = require("../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../data/common/fetchMonthlyData");
const { calculateMeetingsPerGroup, calculateSharesPerMeeting } = require("./MeetingService");

const meetingResolvers = {
  Query: {
    meetingStats: (root, context) => ({ root, context }),
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
    },
    meetingsPerGroup: async (root, context) => {
      const meetingsPerGroup = await calculateMeetingsPerGroup();

      return meetingsPerGroup.slice(0, 10);
    },
    sharesPerMeeting: async (root, context) => {
      const meetingShares = await calculateSharesPerMeeting();

      return meetingShares;
    },
  },
};

module.exports = meetingResolvers;
