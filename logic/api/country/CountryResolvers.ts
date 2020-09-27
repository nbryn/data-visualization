import {fetchTeamData} from '../../../data/mappers/TeamMapper';
import {actionRunner} from '../../util/ActionRunner';
const CountryService = require('./CountryService');

export const countryResolvers = {
   Query: {
      generalCountryData: () => ({}),
      country: (obj: any, args: any) => ({obj, args}),
   },
   GeneralCountryData: {
      teamsCountry: async () => {
         return actionRunner(async () => {
            const result = await fetchTeamData('$country');

            const teamsCountry = result
               .map((element) => {
                  return {
                     name: element._id,
                     count: element.count,
                  };
               })
               .sort((a, b) => a.count - b.count);

            return teamsCountry;
         });
      },
      usersCountry: async () => {
         return actionRunner(async () => {
            const usersPerCountry = await CountryService.calculateUsersPerCountry();

            return usersPerCountry;
         });
      },
      matchesCountry: async () => {
         return actionRunner(async () => {
            const matchesPerCountry = await CountryService.calculateMatchesPerCountry();

            return matchesPerCountry;
         });
      },
   },
   CountryData: {
      country: async (obj: any, args: any) => {
         return actionRunner(async () => {
            const groups = await CountryService.calculateNumberOfTeamPerCountry(args.country);

            const users = await CountryService.calculateNumberOfUsers(args.country);

            return {
               groups,
               users,
            };
         });
      },
   },
};
