const { connectToDB } = require("../connection");

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

async function fetchGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
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
              numberOfMembers: key,
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

module.exports = {
  fetchGroup,
  fetchGroupTotal,
  fetchGroupsLastMonth,
  fetchGroupsLastYear,
  fetchGroupSize
};
