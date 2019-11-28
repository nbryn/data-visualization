const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const UserSchema = require("./logic/user/UserSchema");
const UserResolvers = require("./logic/user/UserResolvers");

const typeDefs = UserSchema;
const resolvers = UserResolvers;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    token: req.headers["authorization"]
  })
});

server.applyMiddleware({
  app,
  cors: corsOptions
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
