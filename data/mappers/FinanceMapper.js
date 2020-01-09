const { connectToDB } = require("../connection");
const { fetchTotal } = require("../fetch/fetchTotal");
const { fetchLastMonth } = require("../fetch/fetchLastMonth");
const { fetchLastYear } = require("../fetch/fetchLastYear");
const { fetchFinanceStats } = require("../fetch/fetchFinanceStats");

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

async function fetchEtbStats() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              {
                $lookup: {
                  from: "groupaccounts",
                  localField: "_id",
                  foreignField: "group",
                  as: "shares"
                }
              }
            ])
            .toArray();

          let totalETB = 0;
          const etbGroups = result
            .filter(
              element =>
                element.currency === "ETB" && element.shares[0].totalShares > 0
            )
            .map(element => {
              totalETB += element.shares[0].totalShares;
              return {
                name: element._id,
                count:
                  element.shares[0].totalShares * element.amountPerShare
              };
            });

          const etbStats = {
            totalETBOnLoan: totalETB,
            etbOnLoan: etbGroups
          };

          if (etbStats) {
            resolve(etbStats);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  fetchCurrencyStats,
  fetchShareStats,
  fetchEtbStats,
  fetchLoanTotal,
  fetchLoansLastMonth,
  fetchLoansLastYear
};
