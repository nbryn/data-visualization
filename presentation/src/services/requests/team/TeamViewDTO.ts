import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTOs';

export type TeamViewDTO = {
   teamCount: number;
   teamSize: ServerDTO[];
   teamsLastMonth: LastMonthDTO[];
   teamsLastYear: LastYearDTO[];
};
