const {
  fetchGroupSizeData,
  fetchGroupMeetingData,
  fetchAllGroupData
} = require("../../data/mappers/GroupMapper");

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

  groupSize = tempResult.filter(element => element.count > 2);

  return groupSize;
}

async function getGroupEngagementStats() {
  const meetingData = await fetchGroupMeetingData();

  //Test groups < 6 members & New groups regDate < 14 days
  let testGroups = 0;
  let newGroups = 0;
  let meetingLastMonth = 0;
  let meetingLast2Months = 0;
  let meetingOver2Months = 0;

  meetingData.forEach(element => {
    const currentDate = new Date();

    if (element.members.length < 6) {
      testGroups++;
    } else {
      const regDate = element.registrationDate;

      const secondsSinceReg =
        (currentDate.getTime() - regDate.getTime()) / 1000;

      const daysSinceReg = Math.floor(secondsSinceReg / (3600 * 24));

      if (daysSinceReg < 14) {
        newGroups++;
      } else {
        if (element.meetings[element.meetings.length - 1]) {
          const lastMeetingDate =
            element.meetings[element.meetings.length - 1].meetingDay;

          const secondsSinceLastMeeting =
            (currentDate.getTime() - lastMeetingDate.getTime()) / 1000;

          const daysSinceLastMeeting = Math.floor(
            secondsSinceLastMeeting / (3600 * 24)
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

  const groupEngagement = [];

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

async function getGroupMeetingStats() {
  const result = await fetchAllGroupData();

  const groupMeetingData = result.map(element => {
    const currentDate = new Date();
    // const currentDate = new Date(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDay()
    // );

    const regYear = element.registrationDate.getFullYear();
    const regMonth = element.registrationDate.getMonth();
    const regDay = element.registrationDate.getDay();

    const regDateObj = new Date(regYear, regMonth, regDay);

    const regMonthActual = regMonth + 1;

    const regDate = regDay + "/" + regMonthActual + "/" + regYear;

    monthsSinceReg =
      currentDate.getMonth() -
      regDateObj.getMonth() +
      12 * (currentDate.getFullYear() - regDateObj.getFullYear());

    let supposedMeetings = 0;

    const secondsSinceReg =
      (currentDate.getTime() - regDateObj.getTime()) / 1000;
    const daysSinceReg = Math.floor(secondsSinceReg / (3600 * 24));

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
      regDate: regDate,
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
  getGroupEngagementStats,
  getGroupMeetingStats
};
