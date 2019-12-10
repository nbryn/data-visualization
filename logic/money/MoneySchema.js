const { gql } = require("apollo-server");

const MoneySchema = gql`
  type MoneyStats {
    moneyTotal: JSON
    moneyLastMonth: LastMonth
    moneyLastYear: LastYear
  }

  extend type Query {
    moneyStats: MoneyStats
  }
`;

module.exports = MoneySchema;
