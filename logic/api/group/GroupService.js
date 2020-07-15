const {
  fetchGroupBy,
  fetchGroupsByNGO,
  fetchGroupMeetingData,
  fetchAllGroupData,
} = require("../../../data/mappers/GroupMapper");

const {
  fetchUserIDByRole,
  fetchAllMemberIDsFromGroup,
} = require("../../../data/mappers/GroupMemberMapper");

const {
  fetchAccountDataByGroup,
  fetchLoansByGroup,
} = require("../../../data/mappers/FinanceMapper");

const { fetchByID } = require("../../../data/common/fetchByID");

async function listGroupData(group) {
  const generalData = await fetchGroupBy("name", group);

  const allGroupData = await retrieveGroupData(generalData[0]);

  return allGroupData;
}

async function listGroupsByNGO(ngo) {
  const generalGroupData = await fetchGroupsByNGO(ngo);

  const allGroupData = await Promise.all(
    generalGroupData.map(async (group) => {
      const groupData = retrieveGroupData(group);

      return groupData;
    })
  );

  return allGroupData;
}

async function calculateMeetingFrequency() {
  const meetingData = await fetchGroupMeetingData();

  //Test groups < 6 members & New groups regDate < 14 days
  let testGroups = 0;
  let newGroups = 0;
  let meetingsLastMonth, meetingsLast2Months, meetingOver2Months;

  meetingData.forEach((element) => {
    if (element.members.length < 6) {
      testGroups++;
    } else {
      const { daysSinceReg } = calculateTimeSinceReg(element.registrationDate);

      if (daysSinceReg < 14) {
        newGroups++;
      } else {
        if (element.meetings[element.meetings.length - 1]) {
          const meetingData = calculateTimeSinceLastMeeting(element.meetings);

          [
            meetingsLastMonth,
            meetingsLast2Months,
            meetingOver2Months,
          ] = meetingData;
        }
      }
    }
  });

  let groupEngagement = [];

  const testGroupData = {
    value: "Test Groups",
    count: testGroups,
  };

  const lastMonthData = {
    value: "< 1",
    count: meetingsLastMonth,
  };

  const lastTwoMonthsData = {
    value: "< 2",
    count: meetingsLast2Months,
  };

  const overTwoMonthsData = {
    value: "> 2",
    count: meetingOver2Months,
  };

  groupEngagement.push(
    testGroupData,
    lastMonthData,
    lastTwoMonthsData,
    overTwoMonthsData
  );

  return groupEngagement;
}

async function generateMeetingOverview() {
  const result = await fetchAllGroupData();

  const groupMeetingData = result.map((element) => {
    const sinceReg = calculateTimeSinceReg(element.registrationDate);

    const { daysSinceReg } = sinceReg;
    const { monthsSinceReg } = sinceReg;

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
  const accountData = await fetchAccountDataByGroup(group._id);
  const loans = await fetchLoansByGroup(group._id);
  const lastMeetingData = await fetchByID(
    "GroupMeeting",
    group.meetings[group.meetings.length - 1]
  );
  const memberIDs = await fetchAllMemberIDsFromGroup(group._id);
  const adminIDs = await fetchUserIDByRole("ADMINISTRATOR", group._id);
  const ownerIDs = await fetchUserIDByRole("OWNER", group._id);

  const lastMeeting = extractLastMeetingDate(lastMeetingData);

  const members = await mapIDtoUser(memberIDs);
  const admins = await mapIDtoUser(adminIDs);
  const owners = await mapIDtoUser(ownerIDs);

  const regDate = extractRegDate(group.registrationDate);

  const { totalShares, boxBalance } = accountData[0];

  return {
    id: group._id,
    name: group.name,
    regDate: regDate,
    currency: group.currency,
    cycle: group.cycleNumber,
    type: group.groupType,
    ngo: group.ngoState,
    lastMeeting: lastMeeting,
    meetingsTotal: group.meetings.length,
    perShare: group.amountPerShare,
    serviceFee: group.loanServiceFee,
    loanLimit: group.loanLimit,
    shares: totalShares,
    boxBalance: boxBalance,
    loans: loans,
    members: members,
    owner: owners[0],
    admin: admins[1] || admins[0],
  };
}

async function mapIDtoUser(users) {
  const result = await Promise.all(
    await users.map(async (element) => {
      const memberInfo = await fetchByID("User", element.user);

      return {
        id: element.user,
        firstName: memberInfo[0].firstName,
        lastName: memberInfo[0].lastName,
        email: element.email,
        gender: element.gender,
      };
    })
  );

  return result;
}

function extractLastMeetingDate(meetingData) {
  const lastMeetingDate = meetingData[0].meetingDay;
  const lastMeetingDay = lastMeetingDate.getDate();
  const lastMeetingM = lastMeetingDate.getMonth() + 1;
  const lastMeetingYear = lastMeetingDate.getFullYear();

  let lastMeetingMonth = lastMeetingM.toString();

  lastMeetingMonth.length < 2
    ? (lastMeetingMonth = "0" + lastMeetingMonth)
    : lastMeetingMonth;

  const lastMeeting =
    lastMeetingDay + "/" + lastMeetingMonth + "/" + lastMeetingYear;

  return lastMeeting;
}

function extractRegDate(regDateObj) {
  const regMonthTemp = regDateObj.getMonth() + 1;
  let regMonth = regMonthTemp.toString();

  regMonth.length < 2 ? (regMonth = "0" + regMonth) : regMonth;

  const regDate = regMonth + "/" + regDateObj.getFullYear();

  return regDate;
}

function calculateTimeSinceReg(registrationDate) {
  let timeSinceReg = {
    daysSinceReg: "",
    monthsSinceReg: "",
    regDate: "",
  };
  const currentDate = new Date();

  const regYear = registrationDate.getFullYear();
  const regMonth = registrationDate.getMonth();
  const regDay = registrationDate.getDay();

  const regDateObj = new Date(regYear, regMonth, regDay);

  const regMonthActual = regMonth + 1;

  timeSinceReg.regDate = regDay + "/" + regMonthActual + "/" + regYear;

  timeSinceReg.monthsSinceReg =
    currentDate.getMonth() -
    regDateObj.getMonth() +
    12 * (currentDate.getFullYear() - regDateObj.getFullYear());

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

  const secondsSinceLastMeeting =
    (currentDate.getTime() - lastMeetingDate.getTime()) / 1000;

  const daysSinceLastMeeting = Math.floor(
    secondsSinceLastMeeting / (3600 * 24)
  );

  return daysSinceLastMeeting;
}
