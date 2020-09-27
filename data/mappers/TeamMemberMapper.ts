import {TeamMember, TeamMemberState} from '../../logic/entities/TeamMember';
import {TeamMemberModel} from '../connection';

export async function fetchAllTeamMembers(): Promise<TeamMember[]> {
   const allTeamMembers = await TeamMemberModel.find({state: TeamMemberState.ACTIVE});

   return allTeamMembers;
}

export async function fetchAllMemberIDsByTeam(teamId: string): Promise<TeamMember[]> {
   const memberIds = await TeamMemberModel.find({
      // @ts-ignore
      group: teamId,
   });

   return memberIds;
}

export async function fetchTeamMemberByUser(): Promise<TeamMember[]> {
   const usersTeams = await TeamMemberModel.aggregate([
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

   return usersTeams;
}

export async function fetchUserIDByRole(role: string, teamId: string): Promise<TeamMember[]> {
   const userIDs = await TeamMemberModel.find({
      // @ts-ignore
      $and: [{group: teamId}, {groupRoles: role}],
   });
   if (role === '(.*?)') {
      //console.log(userIDs);
   }

   return userIDs;
}
