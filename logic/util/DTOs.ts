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

export type UserDTO = {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   gender: string;
};

export type TeamDTO = {
   id: string;
   regDate: string;
   name: string;
   org: string;
   lastMatch: string;
   currency: string;
   matchesTotal: number;
   perMeeting: number;
   meetings: number;
   balance: number;
   events: number;
   players: UserDTO[];
   owner: UserDTO;
   coach: UserDTO;
};
