export type Name = {
   firstName: string;
   lastName: string;
};

export type TeamDTO = {
   [key: string]: string | number | Name | Name[];
   coach: Name;
   perMeeting: number;
   balance: number;
   currency: string;
   lastMatch: string;
   name: string;
   players: Name[];
   owner: Name;
   registrationDate: string;
   totalMatches: number;
   totalMeetings: number;
   totalEvents: number;
};
