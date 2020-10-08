import * as TeamMapper from '../../../data/mappers/TeamMapper';
import * as TeamService from './TeamService';
import {actionRunner} from '../../util/ActionRunner';
import {Error} from '../../util/Error';
import {CountDTO, LastMonthDTO, LastYearDTO, TeamDTO} from '../../util/DTOs';

export const teamResolvers = {
   Query: {
      teamData: () => ({}),
      orgTeamData: (obj: any, args: any) => ({obj, args}),
      teamSearch: async (obj: any, args: any): Promise<TeamDTO> => {
         return actionRunner<TeamDTO>(async () => {
            const teamData = await TeamService.listTeamData(args.input.team);

            return teamData;
         });
      },
   },
   TeamSearch: {
      __resolveType: (obj: any): string => {
         if (obj instanceof Error) return 'Error';

         return 'Team';
      },
   },
   TeamData: {
      teamCount: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const teamTotal = await TeamMapper.fetchTotalTeamCount();

            return teamTotal;
         });
      },
      teamSize: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const result = await TeamMapper.fetchTeamSizeData();

            return result;
         });
      },
      teamsLastWeek: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const teamsLastWeek = await TeamMapper.fetchTeamCountLastWeek();

            return teamsLastWeek;
         });
      },
      teamsLastMonth: async (): Promise<LastMonthDTO[]> => {
         return actionRunner<LastMonthDTO[]>(async () => {
            const teamsLastMonth = await TeamMapper.fetchTeamsLastMonth();

            return teamsLastMonth;
         });
      },
      teamsLastYear: async (): Promise<LastYearDTO[]> => {
         return actionRunner<LastYearDTO[]>(async () => {
            const teamsLastYear = await TeamMapper.fetchTeamsLastYear();

            return teamsLastYear;
         });
      },
   },
   OrgTeamData: {
      teamData: async (obj: any, args: any): Promise<TeamDTO[]> => {
         return actionRunner<TeamDTO[]>(async () => {
            const orgTeamData = await TeamService.listTeamsByOrg(args.org);

            return orgTeamData;
         });
      },
   },
};
