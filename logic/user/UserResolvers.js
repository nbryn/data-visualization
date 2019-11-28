const axios = require("axios");
const { GraphQLJSON } = require("graphql-type-json");

const {setTokenInHeader} = require("../auth/Auth");

const url =
  "https://yzembapdse.execute-api.eu-central-1.amazonaws.com/production/graphql";

const UserResolvers = {
    JSON: GraphQLJSON,
  
    Mutation: {
      signin: async (parent, args, context, info) => {
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
    },
    Query: {
      userStats: async (parent, args, context, info) => {
        setTokenInHeader(context);
  
        const data = `query {
          userStats{
            numberOfUsers
            signups { count }    
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
      },
      me: async (parent, args, context, info) => {
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
    }
  };

 module.exports = UserResolvers;