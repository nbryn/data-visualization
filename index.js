const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");

require("dotenv").config();

const UserSchema = require("./logic/user/UserSchema");
const GroupSchema = require("./logic/group/GroupSchema");
const userResolvers = require("./logic/user/UserResolvers");
const groupResolvers = require("./logic/group/GroupResolvers");
const DefSchema = require("./logic/index");

const app = express();

const resolvers = merge(userResolvers, groupResolvers);


const schema = makeExecutableSchema({
  typeDefs: [DefSchema, UserSchema, GroupSchema],
  resolvers
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const server = new ApolloServer({
  schema: schema,
  context: async ({ req }) => ({
    token: req.headers["authorization"]
  })
});

async function connectToDB() {
  await mongoose.connect(process.env.MONGODB_URI_DEV, {
    useNewUrlParser: true
  });

  return mongoose.connection;
}

server.applyMiddleware({
  app,
  cors: corsOptions
});

connectToDB();

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
);
