const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");

const DefaultSchema = require("./logic/index");
const UserSchema = require("./logic/user/UserSchema");
const GroupSchema = require("./logic/group/GroupSchema");
const MeetingSchema = require("./logic/meeting/MeetingSchema");

const userResolvers = require("./logic/user/UserResolvers");
const groupResolvers = require("./logic/group/GroupResolvers");
const meetingResolvers = require("./logic/meeting/MeetingResolvers");

const app = express();

const resolvers = merge(userResolvers, groupResolvers, meetingResolvers);

const schema = makeExecutableSchema({
  typeDefs: [DefaultSchema, UserSchema, GroupSchema, MeetingSchema],
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
