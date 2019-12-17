const axios = require("axios");

const { connectToDB } = require("../connection");

const { fetchLastYear } = require("../fetch/fetchLastYear");
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
        query: data
      }
    });

    const error = response.data.data.signin.result;

    if (error) {
      return {
        error: "Wrong Email/Username"
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
        query: data
      }
    });

    return response.data.data.me;
  } catch (err) {
    console.log(err);
  }
}

async function fetchUserStats(context) {
  setTokenInHeader(context);

  const data = `query {
          userStats{
            numberOfUsers
            signups {
               count 
               day {
                 year
                 month
                 day
               }
              }    
          }
          }`;

  let response;

  try {
    response = await axios({
      url,
      method: "post",
      data: {
        query: data
      }
    });

    if (response.data.errors) {
      return response.data.errors[0].extensions.code;
    } else {
      return response.data.data.userStats;
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchUsersLastYear() {
  const result = await fetchLastYear("users", "signupDate");

  return result;
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
                $group: {
                  _id: "$gender",
                  count: { $sum: 1 }
                }
              }
            ])
            .toArray();

          const genders = {
            female: "",
            male: ""
          };

          result.forEach(element => {
            if (element._id === "FEMALE") {
              genders.female = element.count;
            } else if (element._id === "MALE") {
              genders.male = element.count;
            }
          });

          console.log(genders);

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
  fetchUserStats,
  fetchUsersLastYear,
  fetchGenderStats
};
