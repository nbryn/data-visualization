const moment = require("moment");
const { connectToDB } = require("../connection");

async function fetchGroupStats(groupBy) {
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
                $group: {
                  _id: groupBy,
                  count: { $sum: 1 },
                },
              },
            ])
            .toArray();

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

async function fetchGroupMembersData() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmembers", async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const result = await collection.find({ state: "ACTIVE" }).toArray();

        if (result) {
          resolve(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupBy(criteria, identifier) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const result = await collection
          .find({ [criteria]: identifier })
          .toArray();

        if (result) {
          resolve(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

//Only field fetched is members
async function fetchAllGroups() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        }
        const result = await collection
          .find({ state: "ACTIVE" })
          .project({ _id: 1, members: 1 })
          .toArray();

        if (result) {
          resolve(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupSizeData() {
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
                count: { $sum: 1 },
              },
            },
          ])
          .toArray();

        if (dbResult) {
          resolve(dbResult);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchAllGroupData() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection.find({}).toArray();

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

async function fetchGroupMeetingData() {
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
                  as: "meetings",
                },
              },
            ])
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupsByNGO(ngo) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({ ngoOrganization: ngo })
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchAllMemberIDsFromGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmembers", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({
              group: groupID,
            })
            .project({ user: 1 })
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchUserIDByRole(role, groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmembers", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({
              $and: [{ group: groupID }, { groupRoles: role }],
            })
            .project({ user: 1 })
            .toArray();

          if (role === "(.*?)") {
            console.log(dbResult);
          }

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchGroupsRegBefore(subtract) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groups", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const before = moment()
            .startOf("day")
            .subtract(subtract, "days")
            .toDate();
          const dbResult = await collection
            .find({
              $and: [
                {
                  state: "ACTIVE",
                  registrationDate: { $lt: before },
                },
              ],
            })
            .project({ id_: 1, members: 1, meetings: 1 })
            .toArray();

          const result = [];

          dbResult.forEach((element) => {
            if (element.members.length > 6 && element.meetings.length > 2) {
              let group = {
                _id: element._id,
                size: element.members.length,
                meetings: element.meetings.length,
              };
              result.push(group);
            }
          });

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

async function fetchGroupMeetingsSince(groupID, subtract) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetings", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const since = moment()
            .startOf("day")
            .subtract(subtract, "days")
            .toDate();
          const dbResult = await collection
            .find({
              $and: [
                {
                  group: groupID,
                  meetingDay: { $gt: since },
                },
              ],
            })
            .toArray();

          if (dbResult) {
            resolve(dbResult);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  fetchGroupBy,
  fetchGroupMembersData,
  fetchAllGroups,
  fetchGroupStats,
  fetchGroupSizeData,
  fetchGroupMeetingData,
  fetchAllGroupData,
  fetchGroupsByNGO,
  fetchUserIDByRole,
  fetchAllMemberIDsFromGroup,
  fetchGroupsRegBefore,
  fetchGroupMeetingsSince
};
