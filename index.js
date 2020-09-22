import {ApolloServer} from 'apollo-server-express';
import {merge} from 'lodash';
import {makeExecutableSchema} from 'graphql-tools';
import express from 'express';

import {connectToDB} from './data/connection';
import {DefaultSchema} from './logic/api/DefaultSchema.ts';
import {FinanceSchema} from './logic/api/finance/FinanceSchema.ts';
import {GroupSchema} from './logic/api/group/GroupSchema.ts';
import {MeetingSchema} from './logic/api/meeting/MeetingSchema.ts';
import {UserSchema} from './logic/api/user/UserSchema.ts';
import {NGOSchema} from './logic/api/ngo/NGOSchema.ts';
import {CountrySchema} from './logic/api/country/CountrySchema.ts';

import {defaultResolvers} from './logic/api/DefaultResolvers';
import {financeResolvers} from './logic/api/finance/FinanceResolvers';
import {groupResolvers} from './logic/api/group/GroupResolvers';
import {meetingResolvers} from './logic/api/meeting/MeetingResolvers';
import {userResolvers} from './logic/api/user/UserResolvers';
import {ngoResolvers} from './logic/api/ngo/NGOResolvers';
import {countryResolvers} from './logic/api/country/CountryResolvers';

const app = express();

app.use(express.static('presentation/build'));

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
   typeDefs: [DefaultSchema, FinanceSchema, GroupSchema, MeetingSchema, UserSchema, NGOSchema, CountrySchema],
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
