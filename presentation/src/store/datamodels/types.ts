export enum Model {
   Account = 'account',
   Chartjs = 'chartjs',
   Main = 'main',
   Match = 'matches',
   Team = 'teams',
   User = 'users',
}

export type Data = {
   model: Model;
   modelData: AccountData | ChartjsData | MainData | MatchData | TeamData | UserData;
};

export enum AccountData {
   CurrencyData = 'currencyData',
   DollarEventCount = 'dollarEventCount',
   EventTotal = 'eventTotal',
   EventsLastMonthData = 'eventsLastMonthData',
   EventsLastYearLineChartData = 'eventsLastYearLineChartData',
   EventsLastYearBarChartData = 'eventsLastYearBarChartData',
   MeetingTotal = 'meetingTotal',
   MeetingsPerTeam = 'meetingsPerTeam',
   MostMeetings = 'mostMeetings',
   TeamDollarEventData = 'teamDollarEventData',
}

export enum ChartjsData {
   TeamsLastWeekBarChart = 'teamsLastWeekBarChart',
   TeamsLastMonthBarChart = 'teamLastMonthBarChart',
   TeamsLastYearBarChart = 'teamsLastYearBarChart',
   TeamsLastWeekLineChart = 'teamsLastWeekLineChart',
   TeamsLastMonthLineChart = 'teamsLastMonthLineChart',
   TeamsLastYearLineChart = 'teamsLastYearLineChart',
   UsersLastMonthLineChart = 'usersLastMonthLineChart',
   UsersLastWeekLineChart = 'usersLastWeekLineChart',
   UsersLastYearLineChart = 'usersLastYearLineChart',
   UsersLastMonthBarChart = 'usersLastMonthBarChart',
   UsersLastWeekBarChart = 'usersLastWeekBarChart',
   UsersLastYearBarChart = 'usersLastYearBarChart',
   GenderData = 'genderData',
   UsersTotal = 'usersTotal',
   TeamsTotal = 'teamsTotal',
   MatchTotal = 'matchTotal',
   MeetingTotal = 'meetingTotal',
}

export enum MainData {
   UsersTotal = 'usersTotal',
   TeamsTotal = 'teamsTotal',
   MatchTotal = 'matchTotal',
   MeetingTotal = 'meetingTotal',
   UsersLastYearBarChartData = 'usersLastYearBarChartData',
   UsersLastYearLineChartData = 'usersLastYearLineChartData',
   TeamsLastYearData = 'teamsLastYearData',
   MatchesLastYearData = 'matchesLastYearData',
   TeamsLastMonthData = 'teamsLastMonthData',
   UserGenderStats = 'userGenderStats',
}

export enum MatchData {
   TotalData = 'totalData',
   LastMonthCount = 'lastMonthCount',
   LastYearCount = 'lastYearCount',
   LastWeekData = 'lastWeekData',
   LastMonthBarChartData = 'lastMonthBarChartData',
   LastYearBarChartData = 'lastYearBarChartData',
   LastYearData = 'lastYearData',
   MeetingsPerMatchData = 'meetingsPerMatchData',
   PerTeamData = 'perTeamData',
   PerCountryData = 'perCountryData',
   TodayCount = 'todayCount',
   TodayDate = 'todayDate',
}

export enum TeamData {
   TeamSizeStats = 'teamSizeStats',
   Total = 'total',
   TodayCount = 'todayCount',
   TodayDate = 'todayDate',
   LastMonthCount = 'lastMonthCount',
   LastYearCount = 'lastYearCount',
   LastMonthBarChartData = 'lastMonthBarChartData',
   LastYearBarChartData = 'lastYearBarChartData',
   LastMonthLineChartData = 'lastMonthLineChartData',
   LastYearLineChartData = 'lastYearLineChartData',
   PerCountryData = 'perCountryData',
   PerOrgData = 'perOrgData',
   SearchData = 'searchData',
   OrgTeamData = 'orgTeamData',
}

export enum UserData {
   LastMonthBarChartData = 'lastMonthBarChartData',
   LastMonthCount = 'lastMonthCount',
   LastMonthLineChartData = 'lastMonthLineChartData',
   LastYearBarChartData = 'lastYearBarChartData',
   LastYearCount = 'lastYearCount',
   LastYearLineChartData = 'lastYearLineChartData',
   LastWeek = 'lastWeek',
   PerCountryData = 'perCountryData',
   PerOrgData = 'perOrgData',
   GenderStats = 'genderStats',
   Total = 'total',
   TodayDate = 'todayDate',
   TodayCount = 'todayCount',
}
