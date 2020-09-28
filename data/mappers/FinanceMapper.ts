import moment from 'moment';

import {CountDTO, LastMonthDTO, LastYearDTO} from '../../logic/util/DTOs';
import {TeamReport, TeamReportState} from '../../logic/entities/TeamReport';
import {TeamMeeting} from '../../logic/entities/TeamMeeting';
import {TeamEventModel, TeamMeetingModel, TeamReportModel} from '../connection';

export async function fetchCurrencyData(): Promise<CountDTO[]> {
   const currencyData = await TeamReportModel.aggregate([
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

   const result: CountDTO[] = currencyData.map((x: any) => ({
      name: x._id,
      count: x.totalAmount,
   }));

   return result;
}

export async function fetchTotalMeetingCount(): Promise<number> {
   const result = await TeamReportModel.aggregate([
      {
         $match: {
            state: TeamReportState.ACTIVE,
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

export async function fetchTeamsWithMostEvents(): Promise<CountDTO[]> {
   const temp = await TeamReportModel.aggregate([
      {
         $match: {
            state: TeamReportState.ACTIVE,
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

export async function fetchTotalEventCount(): Promise<number> {
   const total = await TeamEventModel.countDocuments();

   return total;
}

export async function fetchETBEventData(): Promise<CountDTO[]> {
   const eventData = await TeamReportModel.aggregate([
      {
         $match: {
            currency: 'ETB',
            totalShares: {$gt: 0},
         },
      },
      {
         $lookup: {
            from: 'teams',
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

   const result: CountDTO[] = eventData.splice(0, 10).map((x: any) => ({
      name: x._id.toString().substring(0, 5),
      count: x.count,
   }));

   return result;
}

export async function fetchReportDataByTeamId(teamId: string): Promise<TeamReport[]> {
   // @ts-ignore
   const reportData = await TeamReportModel.find({group: teamId});

   return reportData;
}

export async function fetchEventCountByTeam(teamId: string): Promise<number> {
   // @ts-ignore
   const eventData = await TeamMeetingModel.count({group: teamId});

   return eventData;
}

export async function fetchTeamMeetingById(meetingID: string): Promise<TeamMeeting[]> {
   const teamMeetings = await TeamMeetingModel.find({
      $and: [
         {
            // @ts-ignore
            meeting: meetingID,
         },
      ],
   });
   return teamMeetings;
}

export async function fetchAccountData(): Promise<any[]> {
   const accountData = await TeamReportModel.aggregate([
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

   return accountData;
}

export async function fetchEventLastMonth(): Promise<LastMonthDTO[]> {
   const since = moment('2020-02-01').subtract(30, 'days').toDate();

   const dbResult = await TeamEventModel.aggregate([
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

export async function fetchEventsLastYear(): Promise<LastYearDTO[]> {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await TeamEventModel.aggregate([
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
