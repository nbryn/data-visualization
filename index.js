const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");

const DefaultSchema = require("./logic/DefaultSchema");
const FinanceSchema = require("./logic/finance/FinanceSchema");
const GroupSchema = require("./logic/group/GroupSchema");
const MeetingSchema = require("./logic/meeting/MeetingSchema");
const UserSchema = require("./logic/user/UserSchema");
const NGOSchema = require("./logic/ngo/NGOSchema");
const CountrySchema = require("./logic/country/CountrySchema");

const financeResolvers = require("./logic/finance/FinanceResolvers");
const groupResolvers = require("./logic/group/GroupResolvers");
const meetingResolvers = require("./logic/meeting/MeetingResolvers");
const userResolvers = require("./logic/user/UserResolvers");
const ngoResolvers = require("./logic/ngo/NGOResolvers")
const countryResolvers = require("./logic/country/CountryResolvers");

const app = express();

app.use(express.static("presentation/build"));

const resolvers = merge(
  financeResolvers,
  groupResolvers,
  meetingResolvers,
  userResolvers,
  ngoResolvers,
  countryResolvers
  
);

const schema = makeExecutableSchema({
  typeDefs: [
    DefaultSchema,
    FinanceSchema,
    GroupSchema,
    MeetingSchema,
    UserSchema,
    NGOSchema,
    CountrySchema 
  ],
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

if (process.env.NODE_ENV === "PRODUCTION") {
  const path = require("path");
  app.get("/*", (request, response) => {
    response.sendfile(
      path.resolve(__dirname, "/presentation", "build", "index.js")
    );
  });
}

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server ready at http://localhost:4000/graphql`)
);
