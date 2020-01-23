const {
  fetchGroupSizeData,
  fetchGroupsByNGO,
  fetchSharesByGroup,
  fetchLoansByGroup,
  fetchGroupAdminID,
  fetchGroupMeetingData,
  fetchAllGroupData
} = require("../../data/mappers/GroupMapper");

const { fetchUserByID } = require("../../data/mappers/UserMapper");

async function getGroupSizeStats() {
  const result = await fetchGroupSizeData();

  const tempResult = result
    .filter(element => element._id.groupSize > 6)
    .map(element => {
      return {
        value: element._id.groupSize,
        count: element.count
      };
    });

  const groupSizeStats = tempResult.filter(element => element.count > 2);

  return groupSizeStats;
}

async function listGroupsByNGO(ngo) {
  const generalGroupData = await fetchGroupsByNGO(ngo);

  const allGroupData = await Promise.all(
    generalGroupData.map(async group => {
      const shares = await fetchSharesByGroup(group._id);
      const loans = await fetchLoansByGroup(group._id);
      const adminIDs = await fetchGroupAdminID(group._id);

      let admins = [];

      await adminIDs.forEach(async element => {
        const admin = await fetchUserByID(element.user);
        admins.push(admin);
      });

      const { totalShares, boxBalance } = shares[0];


      return {
        id: group._id,
        name: group.name,
        cycle: group.cycleNumber,
        meetings: group.meetings.length,
        shares: totalShares,
        inBox: boxBalance,
        loans: loans,
        admins: admins
      };
    })
  );


  return allGroupData;
}

async function calculateMeetingFrequency() {
  const meetingData = await fetchGroupMeetingData();

  //Test groups < 6 members & New groups regDate < 14 days
  let testGroups = 0;
  let newGroups = 0;
  let meetingLastMonth = 0;
  let meetingLast2Months = 0;
  let meetingOver2Months = 0;

  meetingData.forEach(element => {
    if (element.members.length < 6) {
      testGroups++;
    } else {
      const sinceReg = calculateTimeSinceReg(element.registrationDate);

      const { daysSinceReg } = sinceReg;

      if (daysSinceReg < 14) {
        newGroups++;
      } else {
        if (element.meetings[element.meetings.length - 1]) {
          const daysSinceLastMeeting = calculateDaysSinceLastMeeting(
            element.meetings[element.meetings.length - 1].meetingDay
          );

          if (daysSinceLastMeeting < 30) {
            meetingLastMonth++;
          } else if (daysSinceLastMeeting < 60) {
            meetingLast2Months++;
          } else {
            meetingOver2Months++;
          }
        }
      }
    }
  });

  let groupEngagement = [];

  const testGroupData = {
    value: "Test Groups",
    count: testGroups
  };

  const lastMonthData = {
    value: "< 1",
    count: meetingLastMonth
  };

  const lastTwoMonthsData = {
    value: "< 2",
    count: meetingLast2Months
  };

  const overTwoMonthsData = {
    value: "> 2",
    count: meetingOver2Months
  };

  groupEngagement.push(
    testGroupData,
    lastMonthData,
    lastTwoMonthsData,
    overTwoMonthsData
  );

  return groupEngagement;
}

async function calculateMeetingStats() {
  const result = await fetchAllGroupData();

  const groupMeetingData = result.map(element => {
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
      meetingActual: element.meetings.length + 1
    };
  });

  return groupMeetingData;
}

module.exports = {
  getGroupSizeStats,
  listGroupsByNGO,
  calculateMeetingFrequency,
  calculateMeetingStats
};

// ---- Helper Functions ---- //

function calculateTimeSinceReg(registrationDate) {
  let timeSinceReg = {
    daysSinceReg: "",
    monthsSinceReg: "",
    regDate: ""
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

function calculateDaysSinceLastMeeting(lastMeetingDate) {
  const currentDate = new Date();

  const secondsSinceLastMeeting =
    (currentDate.getTime() - lastMeetingDate.getTime()) / 1000;

  const daysSinceLastMeeting = Math.floor(
    secondsSinceLastMeeting / (3600 * 24)
  );

  return daysSinceLastMeeting;
}
