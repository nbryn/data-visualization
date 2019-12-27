const { fetchTotal } = require("../fetch/fetchTotal");
const { fetchLastMonth } = require("../fetch/fetchLastMonth");
const { fetchLastYear } = require("../fetch/fetchLastYear");
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
      count: element.totalAmount
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
    count: ""
  };

  const shareTemp = shareResult.map(element => {
    shareTotal += element.totalAmount;
    if (element.totalAmount > groupWithMostShares.count) {
      groupWithMostShares = {
        groupName: element._id,
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

async function fetchLoanTotal() {
  const result = await fetchTotal("groupmeetingloans");

  return result;
}

async function fetchLoansLastMonth() {
  const result = await fetchLastMonth("groupmeetingloans", "registrationDate");

  return result;
}

async function fetchLoansLastYear() {
  const result = await fetchLastYear("groupmeetingloans", "registrationDate");

  return result;
}


module.exports = {
  fetchCurrencyStats,
  fetchShareStats,
  fetchLoanTotal,
  fetchLoansLastMonth,
  fetchLoansLastYear
};
