const actionRunner = require("../../util/ActionRunner");
const {
  calculateMeetingsPerGroup,
  calculateSharesPerMeeting,
} = require("./MeetingService");
const { fetchDailyData } = require("../../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../../data/common/fetchMonthlyData");
const { fetchTotal } = require("../../../data/common/fetchTotal");

const meetingResolvers = {
  Query: {
    meetingStats: (root, context) => ({ root, context }),
  },
  MeetingStats: {
    meetingTotal: async (root, context) => {
      return actionRunner(async () => {
        const meetingTotal = await fetchTotal("GroupMeeting");

        return meetingTotal;
      });
    },
    meetingsLastMonth: async (root, context) => {
      return actionRunner(async () => {
        const meetingsLastMonth = await fetchDailyData(
          "GroupMeeting",
          "meetingDay"
        );

        return { data: meetingsLastMonth };
      });
    },
    meetingsLastYear: async (root, context) => {
      return actionRunner(async () => {
        const meetingsLastYear = await fetchMonthlyData(
          "GroupMeeting",
          "meetingDay"
        );

        return { data: meetingsLastYear };
      });
    },
    meetingsPerGroup: async (root, context) => {
      return actionRunner(async () => {
        const meetingsPerGroup = await calculateMeetingsPerGroup();

        return meetingsPerGroup.slice(0, 10);
      });
    },
    sharesPerMeeting: async (root, context) => {
      return actionRunner(async () => {
        const meetingShares = await calculateSharesPerMeeting();

        return meetingShares;
      });
    },
  },
};

module.exports = meetingResolvers;
