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
        const members = await collection
          .aggregate([
            {
              $project: {
                item: 1,
                numberOfMembers: {
                  $cond: {
                    if: { $isArray: "$members" },
                    then: { $size: "$members" },
                    else: "NA"
                  }
                }
              }
            }
          ])
          .toArray();

        let size = {
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
          12: 0,
          13: 0,
          14: 0,
          15: 0,
          16: 0,
          17: 0,
          18: 0,
          19: 0,
          20: 0,
          21: 0,
          22: 0,
          23: 0,
          24: 0,
          25: 0,
          26: 0,
          27: 0,
          28: 0,
          29: 0,
          30: 0,
          31: 0,
          32: 0
        };

        for (let i = 0; i < members.length; i++) {
          let temp = members[i].numberOfMembers;

          if (size.hasOwnProperty(temp)) {
            size[temp]++;
          }
        }

        let groupSize,
          groupSizeTemp = [];

        for (let key in size) {
          if (size[key] > 0) {
            let temp = {
              value: key,
              count: size[key]
            };
            groupSizeTemp.push(temp);
          }
        }

        groupSize = groupSizeTemp.filter(element => element.count > 2);

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
          const result = await collection
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

          result.forEach(element => {
            const currentDate = new Date();

            if (element.members.length < 6) {
              testGroups++;
            } else {
              const regDate = element.registrationDate;

              const secondsSinceReg =
                (currentDate.getTime() - regDate.getTime()) / 1000;

              const daysSinceReg = Math.floor(secondsSinceReg / (3600 * 24));

              console.log("RegDate: " + regDate.toString());
              console.log("Days: " + daysSinceReg);

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

          const data = {
            testGroups: testGroups,
            newGroups: newGroups,
            meetingLastMonth: meetingLastMonth,
            meetingLast2Months: meetingLast2Months,
            meetingOver2Months: meetingOver2Months
          };

          console.log("Test Groups: " + testGroups);
          console.log("New Groups: " + newGroups);
          console.log("MeetingLastMonth: " + meetingLastMonth);
          console.log("MeetingLastTwoMonths: " + meetingLast2Months);
          console.log("MeetingOverTwoMonths: " + meetingOver2Months);

          console.log(result);
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
