const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

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

let isConnected;

async function connectToDB() {
  if (isConnected) {
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Connection Open");
    connection.db.collection("user", async (err, collection) => {
      let result;
      try {
        collection.find().toArray(function(err, data) {
          console.log(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
}

server.applyMiddleware({
  app,
  cors: corsOptions
});

connectToDB();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
