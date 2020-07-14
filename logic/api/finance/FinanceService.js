const { fetchFinanceData } = require("../../../data/mappers/FinanceMapper");
const { fetchBoxBalanceData } = require("../../../data/mappers/FinanceMapper");
const { fetchLoanData } = require("../../../data/mappers/GroupMapper");

async function getCurrencyStats() {
  const result = await fetchFinanceData(
    "GroupAccount",
    "totalBalance",
    "$currency"
  );

  const currencyStats = result.map((element) => {
    return {
      name: element._id,
      count: element.totalAmount,
    };
  });

  return currencyStats;
}

async function calculateBoxBalanceStats() {
  const boxBalanceStats = await fetchBoxBalanceData();

  let totalBalance = 0;
  let highest = 0;

  boxBalanceStats.forEach((element) => {
    if (element.count > 0) {
      if (element.count > highest) {
        highest = element.count;
      }
      totalBalance += element.count;
    }
  });

  return {
    totalBoxBalance: totalBalance,
    groupWithMost: highest,
  };
}

async function calculateShareStats() {
  const result = await fetchFinanceData("GroupAccount", "totalShares", "$_id");

  let shareTotal = 0;
  let groupWithMostShares = {
    groupName: "",
    count: "",
  };

  const sharesPerGroup = result.map((element) => {
    shareTotal += element.totalAmount;
    if (element.totalAmount > groupWithMostShares.count) {
      groupWithMostShares = {
        name: element._id,
        count: element.totalAmount,
      };
    }
    return {
      name: element._id.toString().substring(0, 5),
      count: element.totalAmount,
    };
  });

  sharesPerGroup.sort((ele1, ele2) => {
    return ele2.count - ele1.count;
  });

  const shareStats = {
    shareTotal: shareTotal,
    mostShares: groupWithMostShares,
    shareStats: sharesPerGroup.slice(0, 10),
  };

  return shareStats;
}

async function calculateEtbLoanStats() {
  const result = await fetchLoanData();
  let totalETB = 0;

  const etbGroups = result
    .filter(
      (element) =>
        element.currency === "ETB" &&
        element.members.length > 6 &&
        element.shares[0].totalShares > 0
    )
    .map((element) => {
      totalETB += element.shares[0].totalShares;
      return {
        name: element._id,
        count: element.shares[0].totalShares * element.amountPerShare,
      };
    });

  const etbStats = {
    ETBLoanTotal: totalETB,
    ETBLoanGroup: etbGroups,
  };

  return etbStats;
}

module.exports = {
  getCurrencyStats,
  calculateShareStats,
  calculateEtbLoanStats,
  calculateBoxBalanceStats,
};
