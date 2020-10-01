import {fetchTeamData} from '../../../data/mappers/TeamMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO} from '../../util/DTOs';
const CountryService = require('./CountryService');

export const countryResolvers = {
   Query: {
      generalCountryData: () => ({}),
      country: (obj: any, args: any) => ({obj, args}),
   },
   GeneralCountryData: {
      teamsCountry: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
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
      usersCountry: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const usersPerCountry = await CountryService.calculateUsersPerCountry();

            return usersPerCountry;
         });
      },
      matchesCountry: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const matchesPerCountry: CountDTO[] = await CountryService.calculateMatchesPerCountry();

            return matchesPerCountry.sort((a, b) => a.count - b.count);
         });
      },
   },
   CountryData: {
      country: async (obj: any, args: any): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
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
