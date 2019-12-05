const { gql } = require("apollo-server");

const MeetingSchema = gql`
  type MeetingNumberDay {
    day: Day!
    count: Float!
  }

  type MeetingNumberMonth {
    month: JSON
    count: Float!
  }

  type MeetingLastMonth {
    signups: [MeetingNumberDay]!
  }

  type MeetingLastYear {
    signups: [MeetingNumberMonth]!
  }

  extend type Query {
    meetingTotal: Float!
    meetingsLastMonth: MeetingLastMonth
    meetingsLastYear: MeetingLastYear
  }
`;

module.exports = MeetingSchema;