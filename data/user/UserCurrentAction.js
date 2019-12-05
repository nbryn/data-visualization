const axios = require("axios");

const {setTokenInHeader} = require("../../logic/auth/Auth");

const url =
  "https://yzembapdse.execute-api.eu-central-1.amazonaws.com/production/graphql";

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

module.exports = { fetchCurrentUser };
