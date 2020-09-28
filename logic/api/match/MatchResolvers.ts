import * as MatchService from './MatchService';
import * as MatchMapper from '../../../data/mappers/MatchMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO, LastMonthDTO, LastYearDTO} from '../../util/DTOs';

export const matchResolvers = {
   Query: {
      matchData: () => ({}),
   },
   MatchData: {
      matchTotal: async (): Promise<number> => {
         return actionRunner(async () => {
            const matchTotal = await MatchMapper.fetchTotalMatchCount();

            return matchTotal;
         });
      },
      matchesLastMonth: async (): Promise<LastMonthDTO[]> => {
         return actionRunner<LastMonthDTO[]>(async () => {
            const matchesLastMonth = await MatchMapper.fetchMatchesLastMonth();

            return matchesLastMonth;
         });
      },
      matchesLastYear: async (): Promise<LastYearDTO[]> => {
         return actionRunner<LastYearDTO[]>(async () => {
            const matchesLastYear = await MatchMapper.fetchMatchesLastYear();

            return matchesLastYear;
         });
      },
      matchesPerTeam: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const matchesPerTeam = await MatchService.calculateMatchesPerTeam();

            return matchesPerTeam.slice(0, 10);
         });
      },
      meetingsPerMatch: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const meetingsPerMatch = await MatchService.calculateMeetingsPerMatch();

            return meetingsPerMatch;
         });
      },
   },
};
