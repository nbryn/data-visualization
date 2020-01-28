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
                  count: { $sum: 1 }
                }
              }
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
                count: { $sum: 1 }
              }
            }
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
                  as: "meetings"
                }
              }
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

async function fetchSharesByGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupaccounts", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({ group: groupID })
            .project({ totalShares: 1, boxBalance: 1 })
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

async function fetchLoansByGroup(groupID) {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("groupmeetingloans", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection.count({ group: groupID });

          if (dbResult < 1) {
            resolve(dbResult);
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
              group: groupID
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
              $and: [{ group: groupID }, { groupRoles: role }]
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

async function fetchLoanData() {
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
                  from: "groupaccounts",
                  localField: "_id",
                  foreignField: "group",
                  as: "shares"
                }
              }
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

module.exports = {
  fetchGroup,
  fetchGroupMembersData,
  fetchAllGroups,
  fetchGroupStats,
  fetchGroupSizeData,
  fetchGroupMeetingData,
  fetchAllGroupData,
  fetchGroupsByNGO,
  fetchSharesByGroup,
  fetchLoansByGroup,
  fetchUserIDByRole,
  fetchAllMemberIDsFromGroup,
  fetchLoanData
};
