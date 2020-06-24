const axios = require("axios");
const { connectToDB } = require("../connection");
const { setTokenInHeader } = require("../../logic/auth/Auth");

const url =
  "https://yzembapdse.execute-api.eu-central-1.amazonaws.com/production/graphql";

async function validateLogin(args) {
  try {
    const data = `mutation {
        signin(input: {
          channel: ANDROID
          username: "${args.input.username}"
          password: "${args.input.password}"
        }) {
          ... on ValidationError {
            result {
              field
              errors
            }
          }
    
          ... on Login {
            token
            refreshToken
            deviceId
            user {
              email
            }  
          }
        }
      }`;

    const response = await axios({
      url,
      method: "post",
      data: {
        query: data,
      },
    });

    const error = response.data.data.signin.result;

    if (error) {
      return {
        error: "Wrong Email/Username",
      };
    } else {
      return response.data.data.signin;
    }
  } catch (err) {
    console.log(err);
  }
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
          .find({ email: { $ne: null } })
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
          .find({ phoneNumber: { $ne: null } })
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
