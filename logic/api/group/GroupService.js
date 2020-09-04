import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import * as GroupMeetingMapper from '../../../data/mappers/GroupMeetingMapper';
import * as GroupMemberMapper from '../../../data/mappers/GroupMemberMapper';
import * as GroupMapper from '../../../data/mappers/GroupMapper';
import * as UserMapper from '../../../data/mappers/UserMapper';

async function listGroupData(groupName) {
   const generalData = await GroupMapper.fetchGroupByName(groupName);

   const allGroupData = await retrieveGroupData(generalData[0]);

   return allGroupData;
}

async function listGroupsByNGO(ngo) {
   const generalGroupData = await GroupMapper.fetchGroupsByNGO(ngo);

   const allGroupData = await Promise.all(
      generalGroupData.map(async (group) => {
         const groupData = retrieveGroupData(group);

         return groupData;
      })
   );

   return allGroupData;
}

async function calculateMeetingFrequency() {
   const meetingData = await GroupMapper.fetchGroupMeetingData();

   //Test groups < 6 members & New groups regDate < 14 days
   let testGroups = 0;
   let meetingsLastMonth, meetingsLast2Months, meetingOver2Months;

   meetingData.forEach((element) => {
      if (element.members.length < 6) {
         testGroups++;
      } else {
         const {daysSinceReg} = calculateTimeSinceReg(element.registrationDate);

         if (daysSinceReg < 14) {
            newGroups++;
         } else {
            if (element.meetings[element.meetings.length - 1]) {
               const meetingData = calculateTimeSinceLastMeeting(element.meetings);

               [meetingsLastMonth, meetingsLast2Months, meetingOver2Months] = meetingData;
            }
         }
      }
   });

   let groupEngagement = [];

   const testGroupData = {
      value: 'Test Groups',
      count: testGroups,
   };

   const lastMonthData = {
      value: '< 1',
      count: meetingsLastMonth,
   };

   const lastTwoMonthsData = {
      value: '< 2',
      count: meetingsLast2Months,
   };

   const overTwoMonthsData = {
      value: '> 2',
      count: meetingOver2Months,
   };

   groupEngagement.push(testGroupData, lastMonthData, lastTwoMonthsData, overTwoMonthsData);

   return groupEngagement;
}

async function generateMeetingOverview() {
   const result = await GroupMapper.fetchAllGroupData();

   const groupMeetingData = result.map((element) => {
      const sinceReg = calculateTimeSinceReg(element.registrationDate);

      const {daysSinceReg} = sinceReg;
      const {monthsSinceReg} = sinceReg;

      let supposedMeetings = 0;

      if (daysSinceReg < 14) {
         supposedMeetings = 1;
      } else {
         //Groups have 1, 2, 3 or 4 weeks between meetings
         switch (element.meetingWeeksBetween) {
            case 1:
               supposedMeetings = monthsSinceReg * 4;
               break;
            case 2:
               supposedMeetings = monthsSinceReg * 2;
               break;
            case 3:
               supposedMeetings = monthsSinceReg * 1.5;
               break;
            case 4:
               supposedMeetings = monthsSinceReg * 1;
               break;
            // For groups where weeksBetween is not set
            default:
               supposedMeetings = monthsSinceReg * 2;
               break;
         }
      }

      return {
         name: element._id,
         regDate: sinceReg.regDate,
         memberCount: element.members.length + 1,
         members: element.members,
         meetingSupposed: supposedMeetings,
         meetingActual: element.meetings.length + 1,
      };
   });

   return groupMeetingData;
}

module.exports = {
   listGroupData,
   listGroupsByNGO,
   calculateMeetingFrequency,
   generateMeetingOverview,
};

// ---- Helper Functions ---- //

async function retrieveGroupData(group) {
   const accountData = await FinanceMapper.fetchAccountDataForGroup(group._id);
   const loans = await FinanceMapper.fetchLoanCountForGroup(group._id);
   const lastMeetingData = await GroupMeetingMapper.fetchGroupMeetingById(
      group.meetings[group.meetings.length - 1]
   );
   const memberIDs = await GroupMemberMapper.fetchAllMemberIDsFromGroup(group._id);
   const adminIDs = await GroupMemberMapper.fetchUserIDByRole('ADMINISTRATOR', group._id);
   const ownerIDs = await GroupMemberMapper.fetchUserIDByRole('OWNER', group._id);

   const lastMeeting = extractLastMeetingDate(lastMeetingData);

   const members = await mapIDtoUser(memberIDs);
   const admins = await mapIDtoUser(adminIDs);
   const owners = await mapIDtoUser(ownerIDs);

   const regDate = extractRegDate(group.registrationDate);

   const {totalShares, boxBalance} = accountData[0];

   return {
      ...group,
      id: group._id,
      regDate: regDate,
      cycle: group.cycleNumber,
      type: group.groupType,
      ngo: group.ngoState,
      lastMeeting,
      meetingsTotal: group.meetings.length,
      perShare: group.amountPerShare,
      serviceFee: group.loanServiceFee,
      shares: totalShares,
      boxBalance,
      loans,
      members,
      owner: owners[0],
      admin: admins[1] || admins[0],
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

function extractLastMeetingDate(meetingData) {
   const lastMeetingDate = meetingData.meetingDay;
   const lastMeetingDay = lastMeetingDate.getDate();
   const lastMeetingM = lastMeetingDate.getMonth() + 1;
   const lastMeetingYear = lastMeetingDate.getFullYear();

   let lastMeetingMonth = lastMeetingM.toString();

   lastMeetingMonth.length < 2 ? (lastMeetingMonth = '0' + lastMeetingMonth) : lastMeetingMonth;

   const lastMeeting = lastMeetingDay + '/' + lastMeetingMonth + '/' + lastMeetingYear;

   return lastMeeting;
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
      currentDate.getMonth() - regDateObj.getMonth() + 12 * (currentDate.getFullYear() - regDateObj.getFullYear());

   const secondsSinceReg = (currentDate.getTime() - regDateObj.getTime()) / 1000;
   timeSinceReg.daysSinceReg = Math.floor(secondsSinceReg / (3600 * 24));

   return timeSinceReg;
}

function calculateTimeSinceLastMeeting(meetings) {
   let meetingLastMonth = 0;
   let meetingLast2Months = 0;
   let meetingOver2Months = 0;

   const lastMeetingDate = meetings[meetings.length - 1].meetingDay;
   const daysSinceLastMeeting = calculateDaysSinceLastMeeting(lastMeetingDate);
   if (daysSinceLastMeeting < 30) {
      meetingLastMonth++;
   } else if (daysSinceLastMeeting < 60) {
      meetingLast2Months++;
   } else {
      meetingOver2Months++;
   }

   return [meetingLastMonth, meetingLast2Months, meetingOver2Months];
}

function calculateDaysSinceLastMeeting(lastMeetingDate) {
   const currentDate = new Date();

   const secondsSinceLastMeeting = (currentDate.getTime() - lastMeetingDate.getTime()) / 1000;

   const daysSinceLastMeeting = Math.floor(secondsSinceLastMeeting / (3600 * 24));

   return daysSinceLastMeeting;
}
