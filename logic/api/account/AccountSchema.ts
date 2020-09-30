const {gql} = require('apollo-server');

export const AccountSchema = gql`
   type AccountBalanceData {
      totalAccountBalance: Float
      teamWithMost: Float
   }

   type AccountData {
      numberOfCurrencies: Float
      currencyData: [Count]
      eventTotal: Float
      eventsLastMonth: [NumberDay]
      eventsLastYear: [NumberMonth]
      meetingTotal: Float
      mostMeetingData: Count
      teamWithMostMeetings: Float
      meetingData: [Count]
      dollarEventCount: Float
      teamDollarEventData: [Count]
      accountBalanceData: AccountBalanceData
   }

   extend type Query {
      accountData: AccountData
   }
`;
