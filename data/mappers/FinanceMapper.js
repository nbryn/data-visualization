const { getModel } = require("../connection");

async function fetchAccountDataByGroup(groupID) {
  const groupAccountModel = await getModel("GroupAccount");

  const accountData = await groupAccountModel.find(
    { group: groupID },
    { projection: { totalShares: 1, boxBalance: 1 } }
  );

  return accountData;
}

async function fetchBoxBalanceData() {
  const groupAccountModel = await getModel("GroupAccount");

  const boxBalanceData = await groupAccountModel.aggregate([
    {
      $match: { currency: "ETB" },
    },
    {
      $group: {
        _id: "$_id",
        count: { $sum: "$totalBalance" },
      },
    },
  ]);
  return boxBalanceData;
}

async function fetchLoansByGroup(groupID) {
  const groupMeetingLoanModel = await getModel("GroupMeetingLoan");

  const loanData = await groupMeetingLoanModel.count({ group: groupID });

  return loanData;
}

async function fetchGroupShareouts(meetingID) {
  const groupMeetingShareoutModel = await getModel("GroupMeetingShareout");

  const groupShareouts = await groupMeetingShareoutModel.find({
    $and: [
      {
        meeting: meetingID,
      },
    ],
  });
  return groupShareouts;
}

async function fetchFinanceData(collection, matchString, idString) {
  const model = await getModel(collection);

  const result = await model.aggregate([
    {
      $match: {
        [matchString]: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: idString,
        totalAmount: { $sum: "$" + matchString },
      },
    },
  ]);

  return result;
}

module.exports = {
  fetchLoansByGroup,
  fetchAccountDataByGroup,
  fetchBoxBalanceData,
  fetchGroupShareouts,
  fetchFinanceData,
};
