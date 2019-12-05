const axios = require("axios");
const {setTokenInHeader} = require("../../logic/auth/Auth");

const url =
  "https://yzembapdse.execute-api.eu-central-1.amazonaws.com/production/graphql";

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

module.exports = { fetchUserStats };
