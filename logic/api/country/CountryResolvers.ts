import * as CountryService from './CountryService';
import {fetchTeamData} from '../../../data/mappers/TeamMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO} from '../../util/DTOs';

export const countryResolvers = {
   Query: {
      generalCountryData: () => ({}),
      country: (obj: any, args: any) => ({obj, args}),
   },
   GeneralCountryData: {
      teamsCountry: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const teamsCountry = await fetchTeamData('$country');

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

            return matchesPerCountry;
         });
      },
   },
   CountryData: {
      country: async (obj: any, args: any): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const groups = await CountryService.calculateTeamCountByCountry(args.country);

            const users = await CountryService.calculateUserCountByCountry(args.country);

            return {
               groups,
               users,
            };
         });
      },
   },
};
