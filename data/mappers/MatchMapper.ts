import moment from 'moment';
import mongoose from 'mongoose';

import {LastMonthDTO, LastYearDTO} from '../../logic/util/DTOs';
import {Match, MatchState} from '../../logic/entities/Match';
import {MatchModel} from '../connection';

export async function fetchTotalMatchCount(): Promise<number> {
   const matchCount = await MatchModel.countDocuments();

   return matchCount;
}

export async function fetchMatchById(id: string): Promise<Match | null> {
   const match = await MatchModel.findById(id);

   return match;
}

export async function fetchAllMatches(): Promise<Match[]> {
   const allMatchData = await MatchModel.aggregate([
      {
         $match: {state: 'ENDED'},
      },
   ]);

   return allMatchData;
}

export async function fetchMatchesByTeam(teamId: string, subtract: string): Promise<Match[]> {
   const since = moment('2020-02-10').subtract(subtract, 'days').toDate();

   const matchesSince = await MatchModel.find({
      group: new mongoose.Schema.Types.ObjectId(teamId),
      meetingDay: {$gt: since},
   });

   return matchesSince;
}

export async function fetchAllMatchesSince(subtract: string): Promise<Match[]> {
   const since = moment().startOf('day').subtract(subtract, 'days').toDate();

   const matchData = await MatchModel.find({
      $and: [
         {
            meetingDay: {$gt: since},
         },
      ],
   });

   return matchData;
}

export async function fetchAllMatchData(): Promise<any[]> {
   const matchData = await MatchModel.aggregate([
      {$match: {state: 'ENDED'}},
      {$group: {_id: '$group', count: {$sum: 1}}},
      {
         $sort: {count: -1},
      },
   ]);

   return matchData;
}

export async function fetchMatchMeetingData(): Promise<Match[]> {
   const matchData = await MatchModel.find({
      $expr: {$gte: [{$size: '$shares'}, 1]},
      state: MatchState.ENDED,
   });

   return matchData;
}

export async function fetchMatchesLastMonth(): Promise<LastMonthDTO[]> {
   const since = moment('2020-02-10').subtract(30, 'days').toDate();

   const dbResult = await MatchModel.aggregate([
      {
         $match: {
            meetingDay: {$gt: since},
         },
      },
      {
         $group: {
            _id: {
               year: {$year: '$meetingDay'},
               month: {$month: '$meetingDay'},
               day: {$dayOfMonth: '$meetingDay'},
            },
            count: {$sum: 1},
         },
      },
      {$sort: {_id: 1}},
   ]);

   const matches = dbResult.map((element) => {
      return {
         day: {
            year: element._id.year,
            month: element._id.month,
            day: element._id.day,
         },
         count: element.count,
      };
   });

   return matches;
}

export async function fetchMatchesLastYear(): Promise<LastYearDTO[]> {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await MatchModel.aggregate([
      {
         $match: {
            meetingDay: {$gt: since},
         },
      },
      {
         $group: {
            _id: {
               month: {$month: '$meetingDay'},
               year: {$year: '$meetingDay'},
            },
            count: {$sum: 1},
         },
      },
      {$sort: {_id: 1}},
   ]);

   const matches = dbResult
      .map((element: any) => {
         return {
            year: element._id.year,
            month: element._id.month,
            count: element.count,
         };
      })
      .sort((el1, el2) => el1.year - el2.year);

   return matches;
}
