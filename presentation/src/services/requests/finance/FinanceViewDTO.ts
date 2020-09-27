import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTO';

export type FinanceViewDTO = {
   numberOfCurrencies?: number;
   currencyData: ServerDTO[];
   eventTotal: number;
   eventsLastMonth: LastMonthDTO[];
   eventsLastYear: LastYearDTO[];
   meetingTotal: number;
   teamWithMostMeetings: string;
   mostMeetingData: ServerDTO[];
   meetingData: ServerDTO[];
   etbEventCount: number;
   teamETBEventData: ServerDTO[];
};
