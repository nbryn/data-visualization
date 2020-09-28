import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTO';

export type MatchViewDTO = {
   matchTotal: number;
   matchesLastMonth: LastMonthDTO[];
   matchesLastYear: LastYearDTO[];
   matchesPerTeam: ServerDTO[];
   meetingsPerMatch: ServerDTO[];
};
