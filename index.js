const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");

const DefaultSchema = require("./logic/api/DefaultSchema.ts").default;
const FinanceSchema = require("./logic/api/finance/FinanceSchema.ts").default;
const GroupSchema = require("./logic/api/group/GroupSchema.ts").default;
const MeetingSchema = require("./logic/api/meeting/MeetingSchema.ts").default;
const UserSchema = require("./logic/api/user/UserSchema.ts").default;
const NGOSchema = require("./logic/api/ngo/NGOSchema.ts").default;
const CountrySchema = require("./logic/api/country/CountrySchema.ts").default;

const defaultResolvers = require("./logic/api/DefaultResolvers");
const financeResolvers = require("./logic/api/finance/FinanceResolvers");
const groupResolvers = require("./logic/api/group/GroupResolvers");
const meetingResolvers = require("./logic/api/meeting/MeetingResolvers");
const userResolvers = require("./logic/api/user/UserResolvers");
const ngoResolvers = require("./logic/api/ngo/NGOResolvers");
const countryResolvers = require("./logic/api/country/CountryResolvers");

const app = express();

app.use(express.static("presentation/build"));

const resolvers = merge(
  defaultResolvers,
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
    CountrySchema,
  ],
  resolvers,
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const server = new ApolloServer({
  schema: schema,
  context: async ({ req }) => ({
    token: req.headers["authorization"],
  }),
});

server.applyMiddleware({
  app,
  cors: corsOptions,
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

