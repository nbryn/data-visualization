export type ServerDTO = {
   name: string;
   count: number;
};

export type Day = {
   year: string;
   month: string;
   day: string;
};

export type LastMonthDTO = {
   count: number;
   day: Day;
};

export type LastYearDTO = {
   month: string;
   year: string;
   count: number;
};

export type UserDTO = {
   token: string;
   firstName: string;
   lastName: string;
   phoneNumber: string;
   email: string;
   gender: string;
};

export type IntervalDTO = LastMonthDTO | LastYearDTO;
