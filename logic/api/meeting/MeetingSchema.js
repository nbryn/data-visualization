const { gql } = require("apollo-server");

const MeetingSchema = gql`
  type MeetingStats {
    meetingTotal: Float
    meetingsLastMonth: LastMonth
    meetingsLastYear: LastYear
    meetingsPerGroup: [PerUnit]
    sharesPerMeeting: [PerUnit]
  }

  extend type Query {
    meetingStats: MeetingStats
  }
`;

module.exports = MeetingSchema;
