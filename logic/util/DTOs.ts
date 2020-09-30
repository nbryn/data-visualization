export type CountDTO = {
   name: string;
   count: number;
};

type Day = {
   day: string;
   month: string;
   year: string;
};

export type LastMonthDTO = {
   day: Day;
   count: number;
};

export type LastYearDTO = {
   year: string;
   month: string;
   count: number;
};

export type AccountDataDTO = {
   mostMeetings: CountDTO[];
   currencyData: CountDTO[];
   dollarData: CountDTO[];
};
