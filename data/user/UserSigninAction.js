const axios = require("axios");

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

module.exports = { validateLogin };
