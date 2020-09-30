import {ApolloServer} from 'apollo-server-express';
import {merge} from 'lodash';
import {makeExecutableSchema} from 'graphql-tools';
import express from 'express';

import {connectToDB} from './data/connection';
import {DefaultSchema} from './logic/api/DefaultSchema.ts';
import {AccountSchema} from './logic/api/account/AccountSchema.ts';
import {TeamSchema} from './logic/api/team/TeamSchema.ts';
import {MatchSchema} from './logic/api/match/MatchSchema.ts';
import {UserSchema} from './logic/api/user/UserSchema.ts';
import {OrgSchema} from './logic/api/organization/OrgSchema.ts';
import {CountrySchema} from './logic/api/country/CountrySchema.ts';

import {defaultResolvers} from './logic/api/DefaultResolvers';
import {accountResolvers} from './logic/api/account/AccountResolvers';
import {teamResolvers} from './logic/api/team/TeamResolvers';
import {matchResolvers} from './logic/api/match/MatchResolvers';
import {userResolvers} from './logic/api/user/UserResolvers';
import {orgResolvers} from './logic/api/organization/OrgResolvers';
import {countryResolvers} from './logic/api/country/CountryResolvers';

const app = express();

app.use(express.static('presentation/build'));

const resolvers = merge(
   defaultResolvers,
   accountResolvers,
   teamResolvers,
   matchResolvers,
   userResolvers,
   orgResolvers,
   countryResolvers
);

const schema = makeExecutableSchema({
   typeDefs: [DefaultSchema, AccountSchema, TeamSchema, MatchSchema, UserSchema, OrgSchema, CountrySchema],
   resolvers,
});

const corsOptions = {
   origin: 'http://localhost:3000',
   credentials: true,
};

const server = new ApolloServer({
   schema: schema,
   context: async ({req}) => ({
      token: req.headers['authorization'],
   }),
});

server.applyMiddleware({
   app,
   cors: corsOptions,
});

if (process.env.NODE_ENV === 'PRODUCTION') {
   const path = require('path');
   app.get('/*', (request, response) => {
      response.sendfile(path.resolve(__dirname, '/presentation', 'build', 'index.js'));
   });
}

connectToDB();

app.listen(process.env.PORT || 4000, () => console.log('Server ready at http://localhost:4000/graphql'));
