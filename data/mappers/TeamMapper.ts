import moment from 'moment';

import {CountDTO, LastMonthDTO, LastYearDTO, OrgTeamCountDTO} from '../../logic/util/DTOs';
import {Error} from '../../logic/util/Error';
import {Team, TeamState} from '../../logic/entities/Team';
import {TeamModel} from '../connection';

export async function fetchTeamById(id: string): Promise<Team | null> {
   const team = await TeamModel.findById(id);

   return team;
}

export async function fetchTeamData(groupBy: string): Promise<CountDTO[]> {
   const teamData = await TeamModel.aggregate([
      {
         $match: {state: 'ACTIVE'},
      },
      {
         $group: {
            _id: groupBy,
            count: {$sum: 1},
         },
      },
      {
         $sort: {count: 1},
      },
   ]);

   const result = teamData.map((x) => ({
      name: x._id,
      count: x.count,
   }));

   return result;
}

export async function fetchOrgPlayerCount(): Promise<OrgTeamCountDTO[]> {
   const playersPerOrg = await TeamModel.aggregate([
      {
         $match: {state: 'ACTIVE'},
      },
      {
         $group: {
            _id: '$ngoOrganization',
            numberOfTeams: {$sum: 1},
            teams: {$push: {size: {$size: '$members'}}},
         },
      },
   ]);

   return playersPerOrg;
}

export async function fetchTeamByName(teamName: string): Promise<Team[]> {
   const team = await TeamModel.find({name: teamName});

   if (team.length < 1) {
      throw new Error('Team not found');
   }

   return team;
}

//Only field fetched is member id's
export async function fetchAllTeams(): Promise<Team[]> {
   const teams = await TeamModel.find({state: TeamState.ACTIVE}, {projection: {_id: 1, members: 1}});

   return teams;
}

export async function fetchTeamSizeData(): Promise<CountDTO[]> {
   const temp = await TeamModel.aggregate([
      {
         $group: {
            _id: {size: {$size: '$members'}},
            count: {$sum: 1},
         },
      },
   ]);

   const teamSizeData = temp
      .filter((element) => element._id.size > 6 && element.count > 2)
      .map((element) => ({
         name: element._id.size,
         count: element.count,
      }));

   return teamSizeData;
}

export async function fetchAllTeamData(): Promise<Team[]> {
   const allTeamData = await TeamModel.find({});

   return allTeamData;
}

export async function fetchTeamMatchData(): Promise<Team[]> {
   const teamMatchData = await TeamModel.aggregate([
      {
         $lookup: {
            from: 'groupmeetings',
            localField: '_id',
            foreignField: 'group',
            as: 'meetings',
         },
      },
   ]);

   return teamMatchData;
}

export async function fetchTeamsByOrg(org: string): Promise<Team[]> {
   const teamsOrg = await TeamModel.find({ngoOrganization: org});

   return teamsOrg;
}

export async function fetchTeamCountByCurrency(currency: string): Promise<number> {
   const teamsWithCurrency = await TeamModel.find({state: TeamState.ACTIVE, currency}).count();

   return teamsWithCurrency;
}

export async function fetchTeamsByRegDate(subtract: string): Promise<Team[]> {
   const before = moment('2020-02-10').subtract(subtract, 'days').toDate();
   const dbResult = await TeamModel.find(
      {
         state: TeamState.ACTIVE,
         registrationDate: {$lt: before},
      },
      'id members meetings'
   );

   return dbResult;
}

export async function fetchTotalTeamCount(): Promise<number> {
   const teamCount = await TeamModel.countDocuments();

   return teamCount;
}
export async function fetchTeamCountLastWeek(): Promise<number> {
   const since = moment('2020-02-10').subtract(7, 'days').toDate();

   const teamCount = await TeamModel.find({
      $match: {
         registrationDate: {$gt: since},
         state: 'ACTIVE',
      },
   }).countDocuments();

   return teamCount;
}

export async function fetchTeamsLastMonth(): Promise<LastMonthDTO[]> {
   const since = moment('2020-02-01').subtract(30, 'days').toDate();

   const dbResult = await TeamModel.aggregate([
      {
         $match: {
            registrationDate: {$gt: since},
            state: 'ACTIVE',
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
      {$sort: {_id: 1}},
   ]);

   const signups = dbResult.map((element) => ({
      day: {
         year: element._id.year,
         month: element._id.month,
         day: element._id.day,
      },
      count: element.count,
   }));

   return signups;
}

export async function fetchTeamsLastYear(): Promise<LastYearDTO[]> {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await TeamModel.aggregate([
      {
         $match: {
            registrationDate: {$gt: since},
            state: 'ACTIVE',
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

   const teams = dbResult
      .map((element: any) => ({
         year: element._id.year,
         month: element._id.month,
         count: element.count,
      }))
      .sort((el1, el2) => el1.year - el2.year);

   return teams;
}

export async function fetchTeamEventData(): Promise<any[]> {
   const teamEventData = await TeamModel.aggregate([
      {
         $lookup: {
            from: 'groupaccounts',
            localField: '_id',
            foreignField: 'group',
            as: 'shares',
         },
      },
   ]);

   return teamEventData;
}
