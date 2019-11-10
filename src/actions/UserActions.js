import axios from "axios";

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

export const login = async (username, password, history) => {
  const data = `mutation {
        signin(input: {
          channel: ANDROID
          username: "${username}"
          password: "${password}"
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
              phoneCode
              phoneNumber
              username
              firstName
              lastName
              image
              gender
              language
              active
              verified
            }  
          }
        }
      }`;

  let result;

  try {
    result = await axios({
      url,
      method: "post",
      data: {
        query: data
      }
    });
  } catch (err) {
    console.log(err);
  }

  if (Array.isArray(result.data.data.signin.result)) {
    return result.data.data.signin.result[0].errors;
  } else {
    //console.log(result);
    history.push({
      pathname: "/dashboard",
      state: {
        userInfo: result.data.data.signin.user
      }
    });
  }
};
