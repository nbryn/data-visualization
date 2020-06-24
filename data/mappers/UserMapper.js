const { connectToDB } = require("../connection");

async function validateLogin(args) {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("users", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const dbResult = await collection
            .find({ email: `${args.input.username}` })
            .toArray();

          const error = {
            error: "Wrong Email/Username"
          };

          if (dbResult[0] == undefined) {
            resolve(error);
          } else {
            const { password } = dbResult[0];

            if (!password || password !== args.input.password) {
              resolve(error);
            } else {
              const succes = {
                token: "123456"
              };
              resolve(succes);
            }
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function fetchCurrentUser(context) {
  setTokenInHeader(context);

  const data = `query{
        me{
          id
          updatedAt
          email
          phoneCode
          phoneNumber
          username
          firstName
          lastName
          image
          gender
          active
          verified
          language
        }
      }`;

  let response;

  try {
    response = await axios({
      url,
      method: "post",
      data: {
        query: data,
      },
    });

    return response.data.data.me;
  } catch (err) {
    console.log(err);
  }
}

async function fetchUserCount() {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection("users", async (err, collection) => {
      if (err) {
        console.log(err);
      } else {
        const total = await collection.countDocuments({ state: "ACTIVE" });

        if (total) {
          resolve(total);
        }
      }
    });
  });
}

async function fetchAllUsers() {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection("users", async (err, collection) => {
      if (err) {
        console.log(err);
      } else {
        const activeUsers = await collection.distinct("_id", {
          state: "ACTIVE",
        });

        if (activeUsers) {
          resolve(activeUsers);
        }
      }
    });
  });
}

async function fetchUsersWithEmail() {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection("users", async (err, collection) => {
      if (err) {
        console.log(err);
      } else {
        const dbResult = await collection
          .find({ email: { $ne: null }, state: "ACTIVE" })
          .project({ _id: 1, firstName: 1, lastName: 1, email: 1 })
          .toArray();

        if (dbResult) {
          resolve(dbResult);
        }
      }
    });
  });
}

async function fetchUsersWithPhone() {
  const connection = await connectToDB();

  return new Promise((resolve, reject) => {
    connection.db.collection("users", async (err, collection) => {
      if (err) {
        console.log(err);
      } else {
        const dbResult = await collection
          .find({ phoneNumber: { $ne: null }, state: "ACTIVE" })
          .project({ _id: 1, firstName: 1, lastName: 1, phoneNumber: 1 })
          .toArray();

        if (dbResult) {
          resolve(dbResult);
        }
      }
    });
  });
}

async function fetchGenderStats() {
  const connection = await connectToDB();
  return new Promise((resolve, reject) => {
    try {
      connection.db.collection("users", async (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          const result = await collection
            .aggregate([
              {
                $match: {
                  $or: [{ gender: "FEMALE" }, { gender: "MALE" }],
                },
              },
              {
                $group: {
                  _id: "$gender",
                  count: { $sum: 1 },
                },
              },
            ])
            .toArray();

          const genders = result.map((element) => {
            return {
              value: element._id,
              count: element.count,
            };
          });

          if (genders) {
            resolve(genders);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  validateLogin,
  fetchCurrentUser,
  fetchUserCount,
  fetchAllUsers,
  fetchGenderStats,
  fetchUsersWithEmail,
  fetchUsersWithPhone
};
