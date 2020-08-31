export type Name = {
   firstName: string;
   lastName: string;
};

export type GroupDto = {
   [key: string]: string | number | Name | Name[];
   admin: Name;
   amountPerShare: number;
   boxBalance: number;
   currency: string;
   lastMeeting: string;
   name: string;
   members: Name[];
   owner: Name;
   registrationDate: string;
   totalMeetings: number;
   totalLoans: number;
   totalShares: number;
};
