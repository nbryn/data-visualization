import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTOs';

export type AccountViewDTO = {
   numberOfCurrencies?: number;
   currencyData: ServerDTO[];
   eventTotal: number;
   eventsLastMonth: LastMonthDTO[];
   eventsLastYear: LastYearDTO[];
   meetingTotal: number;
   teamWithMostMeetings: string;
   mostMeetingData: ServerDTO[];
   meetingData: ServerDTO[];
   dollarEventCount: number;
   teamDollarEventData: ServerDTO[];
};
