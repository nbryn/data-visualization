const { connectToDB } = require("../connection");

const { fetchGroupStats } = require("../fetch/fetchGroupStats");
const { fetchLastMonth } = require("../fetch/fetchLastMonth");
const { fetchLastYear } = require("../fetch/fetchLastYear");
const { fetchTotal } = require("../fetch/fetchTotal");

async function fetchGroupTotal() {
  const result = await fetchTotal("groups");

  return result;
}

async function fetchGroupsLastMonth() {
  const result = await fetchLastMonth("groups", "registrationDate");

  return result;
}

async function fetchGroupsLastYear() {
  const result = await fetchLastYear("groups", "registrationDate");

  return result;
}

async function fetchGroupsPerCountry() {
  const result = await fetchGroupStats("$country");

  const groups = result.map(element => {
    return {
      name: element._id,
      count: element.count
    };
  });

  return groups;
}

async function fetchGroupsPerNGO() {
  const result = await fetchGroupStats("$ngoOrganization");

  const groups = result.map(element => {
    return {
      name: element._id,
      count: element.count
    };
  });

  return groups;
}

async function fetchGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const result = await collection.find({ _id: groupID });

        if (result) {
          resolve(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupSize() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const dbResult = await collection
          .aggregate([
            {
              $group: {
                _id: { groupSize: { $size: "$members" } },
                count: { $sum: 1 }
              }
            }
          ])
          .toArray();

        const result = dbResult
          .filter(element => element._id.groupSize > 6)
          .map(element => {
            return {
              value: element._id.groupSize,
              count: element.count
            };
          });

        groupSize = result.filter(element => element.count > 2);

        console.log(groupSize);

        if (groupSize) {
          resolve(groupSize);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupMeetingStats() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection.find({}).toArray();

          const data = result.map(element => {
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
              name: element._id.toString().substring(0, 5),
              regDate: regDate,
              memberCount: element.members.length + 1,
              meetingSupposed: supposedMeetings,
              meetingActual: element.meetings.length + 1
            };
          });

          console.log(data);

          if (result) {
            resolve(result);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupActivityStats() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .aggregate([
              {
                $lookup: {
                  from: "groupmeetings",
                  localField: "_id",
                  foreignField: "group",
                  as: "meetings"
                }
              }
            ])
            .toArray();

          //Test groups < 6 members & New groups regDate < 14 days
          let testGroups = 0;
          let newGroups = 0;
          let meetingLastMonth = 0;
          let meetingLast2Months = 0;
          let meetingOver2Months = 0;

          dbResult.forEach(element => {
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

          const result = [];

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

          result.push(testGroupData);
          result.push(lastMonthData);
          result.push(lastTwoMonthsData);
          result.push(overTwoMonthsData);

          if (result) {
            resolve(result);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  fetchGroup,
  fetchGroupTotal,
  fetchGroupsLastMonth,
  fetchGroupsLastYear,
  fetchGroupsPerCountry,
  fetchGroupsPerNGO,
  fetchGroupSize,
  fetchGroupMeetingStats,
  fetchGroupActivityStats
};
