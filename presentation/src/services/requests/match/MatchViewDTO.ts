import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTOs';

export type MatchViewDTO = {
   matchTotal: number;
   matchesLastMonth: LastMonthDTO[];
   matchesLastYear: LastYearDTO[];
   matchesPerTeam: ServerDTO[];
   meetingsPerMatch: ServerDTO[];
};
