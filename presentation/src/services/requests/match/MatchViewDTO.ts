import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTO';

export type MeetingViewDTO = {
   matchTotal: number;
   matchesLastMonth: LastMonthDTO[];
   matchesLastYear: LastYearDTO[];
   matchesPerTeam: ServerDTO[];
   meetingsPerEvent: ServerDTO[];
};
