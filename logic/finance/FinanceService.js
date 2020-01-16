const { fetchFinanceStats } = require("../../data/fetch/fetchFinanceStats");
const { fetchLoanStats } = require("../../data/mappers/FinanceMapper");

async function getCurrencyStats() {
  const result = await fetchFinanceStats(
    "groupaccounts",
    "totalBalance",
    "$currency"
  );

  const currencyStats = result.map(element => {
    return {
      name: element._id,
      count: element.totalAmount
    };
  });

  return currencyStats;
}

async function getShareStats() {
  const result = await fetchFinanceStats(
    "groupaccounts",
    "totalShares",
    "$_id"
  );

  let shareTotal = 0;
  let groupWithMostShares = {
    groupName: "",
    count: ""
  };

  const shareTemp = result.map(element => {
    shareTotal += element.totalAmount;
    if (element.totalAmount > groupWithMostShares.count) {
      groupWithMostShares = {
        name: element._id,
        count: element.totalAmount
      };
    }
    return {
      name: element._id.toString().substring(0, 5),
      count: element.totalAmount
    };
  });

  shareTemp.sort((ele1, ele2) => {
    return ele2.count - ele1.count;
  });

  const shareStats = {
    shareTotal: shareTotal,
    mostShares: groupWithMostShares,
    shareStats: shareTemp.slice(0, 10)
  };

  return shareStats;
}

async function getEtbLoanStats() {
  const result = await fetchLoanStats();
  let totalETB = 0;

  const etbGroups = result
    .filter(
      element => element.currency === "ETB" && element.members.length > 6 && element.shares[0].totalShares > 0
    )
    .map(element => {
      totalETB += element.shares[0].totalShares;
      return {
        name: element._id,
        count: element.shares[0].totalShares * element.amountPerShare
      };
    });

  const etbStats = {
    ETBLoanTotal: totalETB,
    ETBLoanGroup: etbGroups
  };

  return etbStats;
}

module.exports = { getCurrencyStats, getShareStats, getEtbLoanStats };
