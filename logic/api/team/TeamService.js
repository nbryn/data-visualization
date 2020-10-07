import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import * as MatchMapper from '../../../data/mappers/MatchMapper';
import * as TeamMemberMapper from '../../../data/mappers/PlayerMapper';
import * as TeamMapper from '../../../data/mappers/TeamMapper';
import * as UserMapper from '../../../data/mappers/UserMapper';

export async function listTeamData(teamName) {
   const generalData = await TeamMapper.fetchTeamByName(teamName);

   const allTeamData = await retrieveTeamData(generalData[0]);

   return allTeamData;
}

export async function listTeamsByOrg(org) {
   const generalTeamData = await TeamMapper.fetchTeamsByOrg(org);

   const allTeamData = await Promise.all(
      generalTeamData.map(async (team) => {
         const teamData = retrieveTeamData(team);

         return teamData;
      })
   );

   return allTeamData;
}

export async function calculateMatchFrequency() {
   const matchData = await TeamMapper.fetchTeamMatchData();

   let testTeams,
      newTeams = 0;
   let matchesLastMonth, matchesLast2Months, matchesOver2Months;

   matchData.forEach((element) => {
      if (element.members.length < 6) {
         testTeams++;
      } else {
         const {daysSinceReg} = calculateTimeSinceReg(element.registrationDate);

         if (daysSinceReg < 14) {
            newTeams++;
         } else {
            if (element.Matchs[element.Matchs.length - 1]) {
               const matchData = calculateTimeSinceLastMatch(element.Matchs);

               [matchesLastMonth, matchesLast2Months, matchesOver2Months] = matchData;
            }
         }
      }
   });

   let teamEngagement = [];

   const testTeamData = {
      value: 'Test teams',
      count: testTeams,
   };

   const lastMonthData = {
      value: '< 1',
      count: matchesLastMonth,
   };

   const lastTwoMonthsData = {
      value: '< 2',
      count: matchesLast2Months,
   };

   const overTwoMonthsData = {
      value: '> 2',
      count: matchesOver2Months,
   };

   teamEngagement.push(testTeamData, lastMonthData, lastTwoMonthsData, overTwoMonthsData);

   return teamEngagement;
}

export async function generateMatchOverview() {
   const result = await TeamMapper.fetchAllTeamData();

   const teamMatchData = result.map((element) => {
      const sinceReg = calculateTimeSinceReg(element.registrationDate);

      const {daysSinceReg} = sinceReg;
      const {monthsSinceReg} = sinceReg;

      let supposedMatches = 0;

      if (daysSinceReg < 14) {
         supposedMatches = 1;
      } else {
         //teams have 1, 2, 3 or 4 weeks between Matchs
         switch (element.MatchWeeksBetween) {
            case 1:
               supposedMatches = monthsSinceReg * 4;
               break;
            case 2:
               supposedMatches = monthsSinceReg * 2;
               break;
            case 3:
               supposedMatches = monthsSinceReg * 1.5;
               break;
            case 4:
               supposedMatches = monthsSinceReg * 1;
               break;
            // For teams where weeksBetween is not set
            default:
               supposedMatches = monthsSinceReg * 2;
               break;
         }
      }

      return {
         name: element._id,
         regDate: sinceReg.regDate,
         memberCount: element.members.length + 1,
         members: element.members,
         meetingsSupposed: supposedMatches,
         meetingsActual: element.Matchs.length + 1,
      };
   });

   return teamMatchData;
}

// ---- Helper Functions ---- //

async function retrieveTeamData(team) {
   const accountData = await FinanceMapper.fetchReportDataByTeamId(team._id);
   const events = await FinanceMapper.fetchEventCountByTeam(team._id);
   const lastMatchData = await MatchMapper.fetchMatchById(team.meetings[team.meetings.length - 1]);
   const memberIDs = await TeamMemberMapper.fetchAllPlayerIdsByTeam(team._id);
   const coachIDs = await TeamMemberMapper.fetchUserIDByRole('ADMINISTRATOR', team._id);
   const ownerIDs = await TeamMemberMapper.fetchUserIDByRole('OWNER', team._id);

   const lastMatchDate = extractLastMatchDate(lastMatchData);

   const players = await mapIDtoUser(memberIDs);
   const coaches = await mapIDtoUser(coachIDs);
   const owners = await mapIDtoUser(ownerIDs);

   const regDate = extractRegDate(team.registrationDate);

   const {totalShares, boxBalance} = accountData[0];

   return {
      id: team._id,
      regDate: regDate,
      name: team.name,
      type: team.teamType,
      org: team.ngoState,
      lastMatch: lastMatchDate,
      currency: team.currency,
      matchesTotal: team.meetings.length,
      perMeeting: team.amountPerShare,
      meetings: totalShares,
      balance: boxBalance,
      events: events,
      players: players,
      owner: owners[0],
      coach: coaches[1] || coaches[0],
   };
}

async function mapIDtoUser(users) {
   const result = await Promise.all(
      await users.map(async (element) => {
         const memberInfo = await UserMapper.fetchUserById(element.user);

         return {
            id: element.user,
            firstName: memberInfo.firstName,
            lastName: memberInfo.lastName,
            email: element.email,
            gender: element.gender,
         };
      })
   );

   return result;
}

function extractLastMatchDate(matchData) {
   const lastMatchDate = matchData.meetingDay;
   const lastMatchDay = lastMatchDate.getDate();
   const lastMatchM = lastMatchDate.getMonth() + 1;
   const lastMatchYear = lastMatchDate.getFullYear();

   let lastMatchMonth = lastMatchM.toString();

   lastMatchMonth.length < 2 ? (lastMatchMonth = '0' + lastMatchMonth) : lastMatchMonth;

   const lastMatch = lastMatchDay + '/' + lastMatchMonth + '/' + lastMatchYear;

   return lastMatch;
}

function extractRegDate(regDateObj) {
   const regMonthTemp = regDateObj.getMonth() + 1;
   let regMonth = regMonthTemp.toString();

   regMonth.length < 2 ? (regMonth = '0' + regMonth) : regMonth;

   const regDate = regMonth + '/' + regDateObj.getFullYear();

   return regDate;
}

function calculateTimeSinceReg(registrationDate) {
   let timeSinceReg = {
      daysSinceReg: '',
      monthsSinceReg: '',
      regDate: '',
   };
   const currentDate = new Date();

   const regYear = registrationDate.getFullYear();
   const regMonth = registrationDate.getMonth();
   const regDay = registrationDate.getDay();

   const regDateObj = new Date(regYear, regMonth, regDay);

   const regMonthActual = regMonth + 1;

   timeSinceReg.regDate = regDay + '/' + regMonthActual + '/' + regYear;

   timeSinceReg.monthsSinceReg =
      currentDate.getMonth() -
      regDateObj.getMonth() +
      12 * (currentDate.getFullYear() - regDateObj.getFullYear());

   const secondsSinceReg = (currentDate.getTime() - regDateObj.getTime()) / 1000;
   timeSinceReg.daysSinceReg = Math.floor(secondsSinceReg / (3600 * 24));

   return timeSinceReg;
}

function calculateTimeSinceLastMatch(Matchs) {
   let MatchLastMonth = 0;
   let MatchLast2Months = 0;
   let MatchOver2Months = 0;

   const lastMatchDate = Matchs[Matchs.length - 1].MatchDay;
   const daysSinceLastMatch = calculateDaysSinceLastMatch(lastMatchDate);
   if (daysSinceLastMatch < 30) {
      MatchLastMonth++;
   } else if (daysSinceLastMatch < 60) {
      MatchLast2Months++;
   } else {
      MatchOver2Months++;
   }

   return [MatchLastMonth, MatchLast2Months, MatchOver2Months];
}

function calculateDaysSinceLastMatch(lastMatchDate) {
   const currentDate = new Date();

   const secondsSinceLastMatch = (currentDate.getTime() - lastMatchDate.getTime()) / 1000;

   const daysSinceLastMatch = Math.floor(secondsSinceLastMatch / (3600 * 24));

   return daysSinceLastMatch;
}
