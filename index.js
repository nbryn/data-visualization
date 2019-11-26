const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const UserSchema = require("./UserSchema");

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

const typeDefs = UserSchema;

const resolvers = {
  Mutation: {
    signin: async (parent, args, context, info) => {
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

      const result = await axios({
        url,
        method: "post",
        data: {
          query: data
        }
      });
      return result;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 3001;

server.listen().then(({ url }) => {
  console.log(`Server @ ${url}`);
});
