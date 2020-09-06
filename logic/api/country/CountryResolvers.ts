import {fetchGroupStats} from '../../../data/mappers/GroupMapper';
import {actionRunner} from '../../util/ActionRunner';
const CountryService = require('./CountryService');

export const countryResolvers = {
   Query: {
      generalCountryStats: () => ({}),
      country: (obj: any, args: any) => ({obj, args}),
   },
   GeneralCountryStats: {
      groupsCountry: async () => {
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
      usersCountry: async () => {
         return actionRunner(async () => {
            const usersPerCountry = await CountryService.calculateUsersPerCountry();

            return usersPerCountry;
         });
      },
      meetingsCountry: async () => {
         return actionRunner(async () => {
            const meetingsPerCountry = await CountryService.calculateMeetingsPerCountry();

            return meetingsPerCountry;
         });
      },
   },
   CountryStats: {
      country: async (obj: any, args: any) => {
         return actionRunner(async () => {
            const groups = await CountryService.calculateNumberOfGroups(args.country);

            const users = await CountryService.calculateNumberOfUsers(args.country);

            return {
               groups,
               users,
            };
         });
      },
   },
};
