import moment from 'moment';

import { Error } from '../../logic/util/Error';
import { Group, GroupState } from '../../logic/entities/Group';
import { GroupModel } from '../connection';

export async function fetchGroupByID(id: string): Promise<Group | null> {
   const group = await GroupModel.findById(id);

   return group;
}

export async function fetchGroupStats(groupBy: string): Promise<Group[]> {
   const groupStats = await GroupModel.aggregate([
      {
         $match: { state: 'ACTIVE' },
      },
      {
         $group: {
            _id: groupBy,
            count: { $sum: 1 },
         },
      },
      {
         $sort: { count: -1 },
      },
   ]);

   return groupStats;
}

export async function fetchGroupMembersPerNGO(): Promise<Group[]> {
   const groupMembersPerNGO = await GroupModel.aggregate([
      {
         $match: { state: 'ACTIVE' },
      },
      {
         $group: {
            _id: '$ngoOrganization',
            count: { $sum: 1 },
            groups: { $push: { groupSize: { $size: '$members' } } },
         },
      },
   ]);

   return groupMembersPerNGO;
}

export async function fetchGroupByName(groupName: string): Promise<Group[]> {
   const result = await GroupModel.find({ name: groupName });

   if (result.length < 1) {
      throw new Error('Group not found');
   }

   return result;
}

//Only field fetched is member id's
export async function fetchAllGroups(): Promise<Group[]> {
   const groupMembers = await GroupModel.find({ state: GroupState.ACTIVE }, { projection: { _id: 1, members: 1 } });

   return groupMembers;
}

export async function fetchGroupSizeData() {
   const groupSizeData = await GroupModel.aggregate([
      {
         $group: {
            _id: { groupSize: { $size: '$members' } },
            count: { $sum: 1 },
         },
      },
   ]);

   return groupSizeData;
}

export async function fetchAllGroupData(): Promise<Group[]> {
   const allGroupData = await GroupModel.find({});

   return allGroupData;
}

export async function fetchGroupMeetingData(): Promise<Group[]> {
   const groupMeetingData = await GroupModel.aggregate([
      {
         $lookup: {
            from: 'groupmeetings',
            localField: '_id',
            foreignField: 'group',
            as: 'meetings',
         },
      },
   ]);

   return groupMeetingData;
}

export async function fetchGroupsByNGO(ngo: string): Promise<Group[]> {
   const groupsNGO = await GroupModel.find({ ngoOrganization: ngo });

   return groupsNGO;
}

export async function fetchNumberOfGroupsWith(currency: string): Promise<number> {
   const groupsWithCurrency = await GroupModel.find({ state: GroupState.ACTIVE, currency }).count();

   return groupsWithCurrency;
}

export async function fetchGroupsRegBefore(subtract: string): Promise<any> {
   const before = moment().startOf('day').subtract(subtract, 'days').toDate();
   const dbResult = await GroupModel.find(
      {
         $and: [
            {
               state: GroupState.ACTIVE,
               registrationDate: { $lt: before },
            },
         ],
      },
      { projection: { _id: 1, mebers: 1, meetings: 1 } }
   );

   const result: Array<any> = [];

   dbResult.forEach((element) => {
      if (element.members.length > 6 && element.meetings.length > 2) {
         let group = {
            _id: element._id,
            size: element.members.length,
            meetings: element.meetings.length,
         };
         result.push(group);
      }
   });

   return result;
}

export async function fetchTotalGroupCount(): Promise<number> {
   const groupCount = await GroupModel.countDocuments();

   return groupCount;
}
export async function fetchGroupCountLastWeek(): Promise<number> {
   const since = moment('2020-02-10').subtract(7, 'days').toDate();

   const groupCount = await GroupModel.find({
      $match: {
         registrationDate: { $gt: since },
         state: "ACTIVE",
      }
   }).countDocuments();

   return groupCount;
}

export async function fetchGroupsLastMonth() {
   const since = moment('2020-02-01').subtract(30, 'days').toDate();

   const dbResult = await GroupModel.aggregate([
      {
         $match: {
            registrationDate: { $gt: since },
            state: "ACTIVE",
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

   const signups = dbResult.map((element) => {
      return {
         day: {
            year: element._id.year,
            month: element._id.month,
            day: element._id.day,
         },
         count: element.count,
      };
   });

   return signups;

}


export async function fetchGroupsLastYear() {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await GroupModel.aggregate([
      {
         $match: {
            registrationDate: { $gt: since },
            state: 'ACTIVE',
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

   const groups = dbResult
      .map((element: any) => {
         return {
            year: element._id.year,
            month: element._id.month,
            count: element.count,
         };
      })
      .sort((el1, el2) => el1.year - el2.year);

   return groups;

}

export async function fetchLoanData(): Promise<any> {
   const loanData = await GroupModel.aggregate([
      {
         $lookup: {
            from: 'groupaccounts',
            localField: '_id',
            foreignField: 'group',
            as: 'shares',
         },
      },
   ]);

   return loanData;
}
