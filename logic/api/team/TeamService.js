import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import * as MatchMapper from '../../../data/mappers/MatchMapper';
import * as PlayerMapper from '../../../data/mappers/PlayerMapper';
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

// ---- Helper Functions ---- //

async function retrieveTeamData(team) {
   const accountData = await FinanceMapper.fetchReportDataByTeam(team._id);
   const events = await FinanceMapper.fetchEventCountByTeam(team._id);
   const lastMatchData = await MatchMapper.fetchMatchById(team.meetings[team.meetings.length - 1]);
   const memberIDs = await PlayerMapper.fetchAllPlayerIdsByTeam(team._id);
   const coachIDs = await PlayerMapper.fetchUserIDByRole('ADMINISTRATOR', team._id);
   const ownerIDs = await PlayerMapper.fetchUserIDByRole('OWNER', team._id);

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
