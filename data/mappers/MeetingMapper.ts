import moment from 'moment';

import {GroupMeeting, GroupMeetingState} from '../../logic/entities/GroupMeeting';
import {GroupMeetingModel} from '../connection';

export async function fetchAllMeetings(): Promise<GroupMeeting[]> {
   const allMeetingData = await GroupMeetingModel.aggregate([
      {
         $match: {state: 'ENDED'},
      },
   ]);

   return allMeetingData;
}

export async function fetchGroupMeetingsSince(groupID: string, subtract: string): Promise<GroupMeeting[]> {
   const since = moment().startOf('day').subtract(subtract, 'days').toDate();

   const groupMeetingsSince = await GroupMeetingModel.find({
      $and: [
         {
            // @ts-ignore
            group: groupID,
            meetingDay: {$gt: since},
         },
      ],
   });

   return groupMeetingsSince;
}

export async function fetchMeetingsPerGroup(): Promise<Array<any>> {
   const meetingsPerGroup = await GroupMeetingModel.aggregate([
      {$match: {state: 'ENDED'}},
      {$group: {_id: '$group', count: {$sum: 1}}},
      {
         $sort: {count: -1},
      },
   ]);

   return meetingsPerGroup;
}

export async function fetchMeetingShares(): Promise<GroupMeeting[]> {
   const meetingShares = await GroupMeetingModel.find({
      $expr: {$gte: [{$size: '$shares'}, 1]},
      state: GroupMeetingState.ENDED,
   });

   return meetingShares;
}
