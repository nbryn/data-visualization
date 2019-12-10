const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");

const DefaultSchema = require("./logic/index");
const GroupSchema = require("./logic/group/GroupSchema");
const MeetingSchema = require("./logic/meeting/MeetingSchema");
const MoneySchema = require("./logic/money/MoneySchema");
const UserSchema = require("./logic/user/UserSchema");

const groupResolvers = require("./logic/group/GroupResolvers");
const meetingResolvers = require("./logic/meeting/MeetingResolvers");
const moneyResolvers = require("./logic/money/MoneyResolvers");
const userResolvers = require("./logic/user/UserResolvers");

const app = express();

const resolvers = merge(groupResolvers, meetingResolvers, moneyResolvers, userResolvers);

const schema = makeExecutableSchema({
  typeDefs: [DefaultSchema, GroupSchema, MoneySchema, MeetingSchema, UserSchema],
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

server.applyMiddleware({
  app,
  cors: corsOptions
});

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
);
