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
      groupName: element._id,
      totalAmount: element.totalAmount
    };
  });

  shareTemp.sort((ele1, ele2) => {
    return ele2.totalAmount - ele1.totalAmount;
  });

  const top10Groups = shareTemp.slice(0, 10);

  const shareStats = {
    shareTotal: shareTotal,
    mostShares: groupWithMostShares,
    shareStats: top10Groups
  };

  return shareStats;
}
module.exports = { fetchCurrencyStats, fetchShareStats };
