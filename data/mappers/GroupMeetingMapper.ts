import moment from 'moment';

import { GroupMeeting, GroupMeetingState } from '../../logic/entities/GroupMeeting';
import { GroupMeetingModel } from '../connection';


export async function fetchTotalMeetingCount(): Promise<number> {
   const meetingCount = await GroupMeetingModel.countDocuments();

   return meetingCount;
}

export async function fetchGroupMeetingById(id: string) {
   const meeting = await GroupMeetingModel.findById(id);

   return meeting;
}

export async function fetchAllMeetings(): Promise<GroupMeeting[]> {
   const allMeetingData = await GroupMeetingModel.aggregate([
      {
         $match: { state: 'ENDED' },
      },
   ]);

   return allMeetingData;
}

export async function fetchGroupMeetingsSince(groupID: string, subtract: string): Promise<GroupMeeting[]> {
   const since = moment('2020-02-10').subtract(subtract, 'days').toDate();

   const groupMeetingsSince = await GroupMeetingModel.find({
      $and: [
         {
            // @ts-ignore
            group: groupID,
            meetingDay: { $gt: since },
         },
      ],
   });

   return groupMeetingsSince;
}

export async function fetchAllMeetingsSince(subtract: string): Promise<GroupMeeting[]> {
   const since = moment().startOf('day').subtract(subtract, 'days').toDate();

   const groupMeetingsSince = await GroupMeetingModel.find({
      $and: [
         {
            // @ts-ignore
            group: groupID,
            meetingDay: { $gt: since },
         },
      ],
   });

   return groupMeetingsSince;
}

export async function fetchMeetingsPerGroup(): Promise<Array<any>> {
   const meetingsPerGroup = await GroupMeetingModel.aggregate([
      { $match: { state: 'ENDED' } },
      { $group: { _id: '$group', count: { $sum: 1 } } },
      {
         $sort: { count: -1 },
      },
   ]);

   return meetingsPerGroup;
}

export async function fetchMeetingShares(): Promise<GroupMeeting[]> {
   const meetingShares = await GroupMeetingModel.find({
      $expr: { $gte: [{ $size: '$shares' }, 1] },
      state: GroupMeetingState.ENDED,
   });

   return meetingShares;
}

export async function fetchMeetingsLastMonth() {
   const since = moment('2020-02-10').subtract(30, 'days').toDate();

   const dbResult = await GroupMeetingModel.aggregate([
      {
         $match: {
            meetingDay: { $gt: since },
         },
      },
      {
         $group: {
            _id: {
               year: { $year: '$meetingDay' },
               month: { $month: '$meetingDay' },
               day: { $dayOfMonth: '$meetingDay' },
            },
            count: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   const meetings = dbResult.map((element) => {
      return {
         day: {
            year: element._id.year,
            month: element._id.month,
            day: element._id.day,
         },
         count: element.count,
      };
   });

   return meetings;

}


export async function fetchMeetingLastYear() {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await GroupMeetingModel.aggregate([
      {
         $match: {
            meetingDay: { $gt: since },
         },
      },
      {
         $group: {
            _id: {
               month: { $month: '$meetingDay' },
               year: { $year: '$meetingDay' },
            },
            count: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   const meetings = dbResult
      .map((element: any) => {
         return {
            year: element._id.year,
            month: element._id.month,
            count: element.count,
         };
      })
      .sort((el1, el2) => el1.year - el2.year);

   return meetings;

}
