const { ApolloServer } = require("apollo-server-express");
const { GraphQLJSON } = require("graphql-type-json");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const UserSchema = require("./logic/schemas/UserSchema");

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

const typeDefs = UserSchema;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

const resolvers = {
  JSON: GraphQLJSON,

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

      const response = await axios({
        url,
        method: "post",
        data: {
          query: data
        }
      });

      const error = response.data.data.signin.result;

      console.log(error);
      if (error) {
        if (
          error[0].errors[0] === "NO_SEARCH" ||
          error[0].errors[0] === "TO_SHORT"
        ) {
          return {
            error: "Wrong Email/Username"
          };
        } else {
          return {
            error: "Wrong Password"
          };
        }
      } else {
        return {
          token: response.data.data.signin.token,
          refreshToken: response.data.data.signin.refreshToken,
          deviceId: response.data.data.signin.deviceId,
          email: response.data.data.signin.user.email
        };
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  cors: cors(corsOptions),
  resolvers
});

server.applyMiddleware({
  app,
  cors: corsOptions
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
