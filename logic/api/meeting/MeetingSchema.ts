const {gql} = require('apollo-server');

export const MeetingSchema = gql`
   type MeetingStats {
      meetingTotal: Float
      meetingsLastMonth: [NumberDay]
      meetingsLastYear: [NumberMonth]
      meetingsPerGroup: [PerUnit]
      sharesPerMeeting: [PerUnit]
   }

   extend type Query {
      meetingStats: MeetingStats
   }
`;

