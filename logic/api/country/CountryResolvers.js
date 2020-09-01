import {actionRunner} from '../../util/ActionRunner';
const {
   calculateNumberOfGroups,
   calculateNumberOfUsers,
   calculateUsersPerCountry,
   calculateMeetingsPerCountry,
} = require('./CountryService');
const {fetchGroupStats} = require('../../../data/mappers/GroupMapper');

const countryResolvers = {
   Query: {
      generalCountryStats: (root, context) => ({root, context}),
      country: (obj, args, root, context) => ({obj, args, root, context}),
   },
   GeneralCountryStats: {
      groupsCountry: async (root, context) => {
         return actionRunner(async () => {
            const result = await fetchGroupStats('$country');

            const groupsCountry = result
               .map((element) => {
                  return {
                     name: element._id,
                     count: element.count,
                  };
               })
               .sort((a, b) => a.count - b.count);

            return groupsCountry;
         });
      },
      usersCountry: async (root, context) => {
         return actionRunner(async () => {
            const usersPerCountry = await calculateUsersPerCountry();

            return usersPerCountry;
         });
      },
      meetingsCountry: async (root, context) => {
         return actionRunner(async () => {
            const meetingsPerCountry = await calculateMeetingsPerCountry();

            return meetingsPerCountry;
         });
      },
   },
   CountryStats: {
      country: async (obj, args, root, context) => {
         return actionRunner(async () => {
            const groups = await calculateNumberOfGroups(args.country);

            const users = await calculateNumberOfUsers(args.country);

            return {
               groups,
               users,
            };
         });
      },
   },
};

module.exports = countryResolvers;
