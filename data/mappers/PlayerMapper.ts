import {Player, PlayerState} from '../../logic/entities/Player';
import {PlayerModel} from '../connection';

export async function fetchAllPlayers(): Promise<Player[]> {
   const allPlayers = await PlayerModel.find({state: PlayerState.ACTIVE});

   return allPlayers;
}

export async function fetchAllPlayerIdsByTeam(teamId: string): Promise<Player[]> {
   const playerIds = await PlayerModel.find({
      // @ts-ignore
      group: teamId,
   });

   return playerIds;
}

export async function fetchPlayerByUser(): Promise<Player[]> {
   const usersTeams = await PlayerModel.aggregate([
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

export async function fetchUserIDByRole(role: string, teamId: string): Promise<Player[]> {
   const userIDs = await PlayerModel.find({
      // @ts-ignore
      $and: [{group: teamId}, {groupRoles: role}],
   });
   if (role === '(.*?)') {
      //console.log(userIDs);
   }

   return userIDs;
}
