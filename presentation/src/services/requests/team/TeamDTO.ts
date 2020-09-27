export type Name = {
   firstName: string;
   lastName: string;
};

export type TeamDTO = {
   [key: string]: string | number | Name | Name[];
   admin: Name;
   perMeeting: number;
   boxBalance: number;
   currency: string;
   lastMatch: string;
   name: string;
   members: Name[];
   owner: Name;
   registrationDate: string;
   totalMatches: number;
   totalMeetings: number;
   totalEvents: number;
};
