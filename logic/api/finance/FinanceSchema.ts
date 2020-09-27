const {gql} = require('apollo-server');

export const FinanceSchema = gql`
   type BoxBalanceData {
      totalBoxBalance: Float
      teamWithMost: Float
   }

   type FinanceData {
      numberOfCurrencies: Float
      currencyData: [Count]
      eventTotal: Float
      eventsLastMonth: [NumberDay]
      eventsLastYear: [NumberMonth]
      meetingTotal: Float
      mostMeetingData: Count
      teamWithMostMeetings: Float
      meetingData: [Count]
      etbEventCount: Float
      teamETBEventData: [Count]
      boxBalanceData: BoxBalanceData
   }

   extend type Query {
      financeData: FinanceData
   }
`;
