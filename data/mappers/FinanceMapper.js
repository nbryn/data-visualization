const { getModel } = require("../connection");

async function fetchAccountDataByGroup(groupID) {
  const groupAccountModel = await getModel("GroupAccount");

  try {
    const accountData = await groupAccountModel
      .find({ group: groupID })
      .project({ totalShares: 1, boxBalance: 1 })
      .toArray();

    return accountData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchBoxBalanceData() {
  const groupAccountModel = await getModel("GroupAccount");

  try {
    const boxBalanceData = await groupAccountModel
      .aggregate([
        {
          $match: { currency: "ETB" },
        },
        {
          $group: {
            _id: "$_id",
            count: { $sum: "$totalBalance" },
          },
        },
      ])
      .toArray();

    return boxBalanceData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchLoansByGroup(groupID) {
  const groupMeetingLoanModel = await getModel("GroupMeetingLoan");

  try {
    const loanData = await groupMeetingLoanModel.count({ group: groupID });

    return loanData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchGroupShareouts(meetingID) {
  const groupMeetingShareoutModel = await getModel("GroupMeetingShareout");

  try {
    const groupShareouts = await groupMeetingShareoutModel
      .find({
        $and: [
          {
            meeting: meetingID,
          },
        ],
      })
      .toArray();

    return groupShareouts;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  fetchLoansByGroup,
  fetchAccountDataByGroup,
  fetchBoxBalanceData,
  fetchGroupShareouts,
};
