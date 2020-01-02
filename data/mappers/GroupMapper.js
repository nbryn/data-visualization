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

async function fetchGroupActivity() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection.find({}).toArray();

          const data = result.map(element => {
            const date = new Date();
            currentDate = new Date(date.getFullYear(), date.getMonth());

            const regYear = element.registrationDate.getFullYear();
            const regMonth = element.registrationDate.getMonth();

            regDate = new Date(regYear, regMonth);

            monthsSinceReg =
              currentDate.getMonth() -
              regDate.getMonth() +
              12 * (currentDate.getFullYear() - regDate.getFullYear());

            let supposedMeetings = 0;

            switch (element.meetingWeeksBetween) {
              case 1:
                supposedMeetings = monthsSinceReg;
                break;
              case 2:
                supposedMeetings = monthsSinceReg * 2;
                break;
              case 3:
                supposedMeetings = monthsSinceReg * 3;
                break;
              case 4:
                supposedMeetings = monthsSinceReg * 4;
                break;
              default:
                supposedMeetings = monthsSinceReg * 2;
                break;
            }

            return {
              name: element._id,
              regDate: element.registrationDate,
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

module.exports = {
  fetchGroup,
  fetchGroupTotal,
  fetchGroupsLastMonth,
  fetchGroupsLastYear,
  fetchGroupsPerCountry,
  fetchGroupsPerNGO,
  fetchGroupSize,
  fetchGroupActivity
};
