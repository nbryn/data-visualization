const { fetchFinanceStats } = require("../fetch/fetchFinanceStats");

async function fetchCurrencyStats() {
  const currencyResult = await fetchFinanceStats(
    "groupaccounts",
    "totalBalance",
    "$currency"
  );

  const currencyStats = currencyResult.map(element => {
    return {
      name: element._id,
      totalAmount: element.totalAmount
    };
  });

  return currencyStats;
}

async function fetchShareStats() {
  const shareResult = await fetchFinanceStats(
    "groupaccounts",
    "totalShares",
    "$_id"
  );

  let shareTotal = 0;
  let groupWithMostShares = {
    groupName: "",
    amount: ""
  };

  const shareTemp = shareResult.map(element => {
    shareTotal += element.totalAmount;
    if (element.totalAmount > groupWithMostShares.amount) {
      groupWithMostShares = {
        groupName: element._id,
        amount: element.totalAmount
      };
    }
    return {
      name: element._id.toString().substring(0, 5),
      totalAmount: element.totalAmount
    };
  });

  shareTemp.sort((ele1, ele2) => {
    return ele2.totalAmount - ele1.totalAmount;
  });


  const shareStats = {
    shareTotal: shareTotal,
    mostShares: groupWithMostShares,
    shareStats: shareTemp.slice(0, 10)
  };

  return shareStats;
}
module.exports = { fetchCurrencyStats, fetchShareStats };
