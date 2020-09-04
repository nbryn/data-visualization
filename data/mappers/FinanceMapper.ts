import moment from "moment";

import { GroupAccount } from '../../logic/entities/GroupAccount';
import { GroupMeetingShareout } from '../../logic/entities/GroupMeetingShareout';
import { GroupMeetingLoanModel, GroupMeetingShareoutModel, GroupAccountModel } from '../connection';

export async function fetchAccountDataForGroup(groupID: string): Promise<GroupAccount[]> {
  // @ts-ignore
  const accountData = await GroupAccountModel.find({ group: groupID });

  return accountData;
}

export async function fetchBoxBalanceData(): Promise<Array<any>> {
  const boxBalanceData = await GroupAccountModel.aggregate([
    {
      $match: { currency: 'ETB' },
    },
    {
      $group: {
        _id: '$_id',
        count: { $sum: '$totalBalance' },
      },
    },
  ]);
  return boxBalanceData;
}

export async function fetchLoanCountForGroup(groupID: string): Promise<number> {
  // @ts-ignore
  const loanData = await GroupMeetingLoanModel.count({ group: groupID });

  return loanData;
}

export async function fetchGroupShareoutsByMeeting(meetingID: string): Promise<GroupMeetingShareout[]> {
  const groupShareouts = await GroupMeetingShareoutModel.find({
    $and: [
      {
        // @ts-ignore
        meeting: meetingID,
      },
    ],
  });
  return groupShareouts;
}

export async function fetchFinanceData(attribute: string, idString: string): Promise<Array<any>> {
  const result = await GroupAccountModel.aggregate([
    {
      $match: {
        [attribute]: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: idString,
        totalAmount: { $sum: '$' + attribute },
      },
    },
  ]);

  return result;
}

export async function fetchTotalLoanCount(): Promise<number> {
  const total = await GroupMeetingLoanModel.countDocuments();

  return total;
}

export async function fetchLoansLastMonth(): Promise<Array<any>> {
  const since = moment('2020-02-01').subtract(30, 'days').toDate();

  const dbResult = await GroupMeetingLoanModel.aggregate([
    {
      $match: {
        registrationDate: { $gt: since },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$registrationDate' },
          month: { $month: '$registrationDate' },
          day: { $dayOfMonth: '$registrationDate' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const loans = dbResult.map((element) => {
    return {
      day: {
        year: element._id.year,
        month: element._id.month,
        day: element._id.day,
      },
      count: element.count,
    };
  });

  return loans;
}

export async function fetchLoansLastYear() {
  const since = moment('2020-02-01').subtract(365, 'days').toDate();

  const dbResult = await GroupMeetingLoanModel.aggregate([
    {
      $match: {
        registrationDate: { $gt: since },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$registrationDate' },
          year: { $year: '$registrationDate' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const loans = dbResult
    .map((element) => {
      return {
        year: element._id.year,
        month: element._id.month,
        count: element.count,
      };
    })
    .sort((el1, el2) => el1.year - el2.year);

  return loans;

}
