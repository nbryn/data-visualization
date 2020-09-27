import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTO';

export type TeamViewDTO = {
   teamCount: number;
   teamSize: ServerDTO[];
   teamsLastMonth: LastMonthDTO[];
   teamsLastYear: LastYearDTO[];
};
