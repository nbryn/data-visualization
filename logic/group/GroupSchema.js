const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupSize {
    value: String
    count: Float
  }

  type GroupStats {
    groupTotal: Float
    groupSize: [GroupSize]
    groupsLastWeek: Float
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
  }

  type GroupMeetingFrequency {
    value: String
    count: Float
  }

  type GroupMeetingStats {
    name: String
    regDate: String
    memberCount: Float
    meetingSupposed: Float
    meetingActual: Float
  }

  type GroupEngagement {
    groupsActive: Float
    groupMeetingFrequency: [GroupMeetingFrequency]
    groupMeetingStats: [GroupMeetingStats]
  }

  type Group {
    id: String
    name: String
    regDate: String
    currency: String
    cycle: Float
    type: String
    ngo: String
    lastMeeting: String
    boxBalance: Float
    meetingsTotal: Float
    meetingsInCycle: Float
    perShare: Float
    serviceFee: Float
    loanLimit: Float
    loans: Float
    shares: Float
    owner: User
    admin: User
    members: JSON
  }

  type Activity {
    last300Days: [Float]
    last200Days: [Float]
    last105Days: [Float]
  }

  type GroupActivity {
    meetingActivity: Activity
    shareoutActivity: Activity
  }

  type GroupData {
    group(group: String!): Group
  }

  type NGOGroupData {
    groupData(ngo: String!): [Group]
  }

  extend type Query {
    groupStats: GroupStats
    groupEngagement: GroupEngagement
    groupData: GroupData
    ngoGroupData: NGOGroupData
    groupActivity: GroupActivity
  }
`;

module.exports = GroupSchema;
