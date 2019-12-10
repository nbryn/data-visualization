const { fetchMoneyTotal } = require("../../data/actions/MoneyActions");

const moneyResolvers = {
  Query: {
    moneyStats: async (parent, args, context, info) => {
      const result = await fetchMoneyTotal();

      const moneyTotal = result[0].totalAmount;

      return {
        moneyTotal
      };
    }
  }
};

module.exports = moneyResolvers;
