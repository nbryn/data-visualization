import * as OrgService from './OrgService';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO} from '../../util/DTOs';
import {fetchTeamData} from '../../../data/mappers/TeamMapper';

export const orgResolvers = {
   Query: {
      orgData: async () => ({}),
   },
   OrgData: {
      teamsPerOrg: async (): Promise<CountDTO[]> => {
         return actionRunner(async () => {
            const result = await fetchTeamData('$ngoOrganization');

            const teamsPerOrg = result
               .map((element) => {
                  return {
                     name: element._id,
                     count: element.count,
                  };
               })
               .sort((a, b) => a.count - b.count);

            return teamsPerOrg;
         });
      },
      usersPerOrg: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const usersOrg = await OrgService.calculateUsersPerOrg();

            return usersOrg;
         });
      },
      teamsPerUser: async (): Promise<CountDTO[]> => {
         return actionRunner(async () => {
            const teamsPerUser = await OrgService.calculateTeamsPerUser();

            return teamsPerUser;
         });
      },
   },
};
