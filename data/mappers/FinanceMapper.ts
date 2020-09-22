import moment from 'moment';

import {CountDTO, LastMonthDTO, LastYearDTO} from '../../logic/util/DTOs';
import {GroupAccount, GroupAccountState} from '../../logic/entities/GroupAccount';
import {GroupMeetingShareout} from '../../logic/entities/GroupMeetingShareout';
import {GroupMeetingLoanModel, GroupMeetingShareoutModel, GroupAccountModel} from '../connection';

export async function fetchAccountDataForGroup(groupID: string): Promise<GroupAccount[]> {
   // @ts-ignore
   const accountData = await GroupAccountModel.find({group: groupID});

   return accountData;
}

export async function fetchLoanCountForGroup(groupID: string): Promise<number> {
   // @ts-ignore
   const loanData = await GroupMeetingLoanModel.count({group: groupID});

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

export async function fetchCurrencyStats(): Promise<CountDTO[]> {
   const currencyStats = await GroupAccountModel.aggregate([
      {
         $match: {
            totalBalance: {$gt: 0},
         },
      },
      {
         $group: {
            _id: '$currency',
            totalAmount: {$sum: '$totalBalance'},
         },
      },
      {
         $sort: {totalAmount: -1},
      },
   ]);

   const result: CountDTO[] = currencyStats.map((x: any) => ({
      name: x._id,
      count: x.totalAmount,
   }));

   return result;
}

export async function fetchTotalShareCount(): Promise<number> {
   const result = await GroupAccountModel.aggregate([
      {
         $match: {
            state: GroupAccountState.ACTIVE,
         },
      },
      {
         $group: {
            _id: 'total',
            totalAmount: {$sum: {$add: ['$totalShares']}},
         },
      },
   ]);

   return result[0].totalAmount;
}

export async function fetchGroupsWithMostShares(): Promise<CountDTO[]> {
   const temp = await GroupAccountModel.aggregate([
      {
         $match: {
            state: GroupAccountState.ACTIVE,
         },
      },
      {
         $group: {
            _id: '$group',
            count: {$max: '$totalShares'},
         },
      },
      {
         $sort: {count: -1},
      },
   ]);

   const result: CountDTO[] = temp.splice(0, 10).map((x: any) => ({
      name: x._id.toString().substring(0, 5),
      count: x.count,
   }));

   return result;
}

export async function fetchTotalLoanCount(): Promise<number> {
   const total = await GroupMeetingLoanModel.countDocuments();

   return total;
}

export async function fetchETBLoanData(): Promise<CountDTO[]> {
   const boxBalanceData = await GroupAccountModel.aggregate([
      {
         $match: {
            currency: 'ETB',
            totalShares: {$gt: 0},
         },
      },
      {
         $lookup: {
            from: 'groups',
            localField: 'group',
            foreignField: '_id',
            as: 'data',
         },
      },
      {
         $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$data', 0]}, '$$ROOT']}},
      },
      {
         $project: {
            data: 0,
         },
      },
      {
         $group: {
            _id: '$_id',
            count: {$sum: {$multiply: ['$totalShares', '$amountPerShare']}},
         },
      },
      {
         $sort: {count: -1},
      },
   ]);

   const result: CountDTO[] = boxBalanceData.splice(0, 10).map((x: any) => ({
      name: x._id.toString().substring(0, 5),
      count: x.count,
   }));

   return result;
}

export async function fetchBoxBalanceData(): Promise<Array<any>> {
   const boxBalanceData = await GroupAccountModel.aggregate([
      {
         $match: {currency: 'ETB'},
      },
      {
         $group: {
            _id: '$_id',
            count: {$sum: '$totalBalance'},
         },
      },
   ]);

   return boxBalanceData;
}

export async function fetchLoansLastMonth(): Promise<LastMonthDTO[]> {
   const since = moment('2020-02-01').subtract(30, 'days').toDate();

   const dbResult = await GroupMeetingLoanModel.aggregate([
      {
         $match: {
            registrationDate: {$gt: since},
         },
      },
      {
         $group: {
            _id: {
               year: {$year: '$registrationDate'},
               month: {$month: '$registrationDate'},
               day: {$dayOfMonth: '$registrationDate'},
            },
            count: {$sum: 1},
         },
      },
      {
         $sort: {_id: 1},
      },
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

export async function fetchLoansLastYear(): Promise<LastYearDTO[]> {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await GroupMeetingLoanModel.aggregate([
      {
         $match: {
            registrationDate: {$gt: since},
         },
      },
      {
         $group: {
            _id: {
               month: {$month: '$registrationDate'},
               year: {$year: '$registrationDate'},
            },
            count: {$sum: 1},
         },
      },
      {$sort: {_id: 1}},
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
