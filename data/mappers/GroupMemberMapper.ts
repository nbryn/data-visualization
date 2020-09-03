import {GroupMember, GroupMemberState} from '../../logic/entities/GroupMember';
import {GroupMemberModel} from '../connection';

export async function fetchAllGroupMembers(): Promise<GroupMember[]> {
   const allGroupMembers = await GroupMemberModel.find({state: GroupMemberState.ACTIVE});

   return allGroupMembers;
}

export async function fetchAllMemberIDsFromGroup(groupID: string): Promise<GroupMember[]> {
   const memberIDs = await GroupMemberModel.find({
      // @ts-ignore
      group: groupID,
   });

   return memberIDs;
}

export async function fetchGroupMemberByUser(): Promise<GroupMember[]> {
   const groupMemberUsers = await GroupMemberModel.aggregate([
      {
         $lookup: {
            from: 'users',
            let: {
               id: '$_id',
               firstName: '$firstName',
               lastName: 'lastName',
            },
            pipeline: [
               {
                  $match: {
                     $expr: {
                        $and: [{$eq: ['$$id', '$user']}],
                     },
                  },
               },
            ],
            as: 'userGroups',
         },
      },
   ]);

   return groupMemberUsers;
}

export async function fetchUserIDByRole(role: string, groupID: string): Promise<GroupMember[]> {
   const userIDs = await GroupMemberModel.find({
      // @ts-ignore
      $and: [{group: groupID}, {groupRoles: role}],
   });
   if (role === '(.*?)') {
      console.log(userIDs);
   }

   return userIDs;
}
