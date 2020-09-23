import * as NGOService from './NGOService';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO} from '../../util/DTOs';
import {fetchGroupStats} from '../../../data/mappers/GroupMapper';

export const ngoResolvers = {
   Query: {
      ngoStats: async () => ({}),
   },
   NGOStats: {
      groupsNGO: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const result = await fetchGroupStats('$ngoOrganization');

            const groupsNGO = result
               .map((element) => {
                  return {
                     name: element._id,
                     count: element.count,
                  };
               })
               .sort((a, b) => a.count - b.count);

            return groupsNGO;
         });
      },
      usersNGO: async (): Promise<CountDTO[]> => {
         return actionRunner<CountDTO[]>(async () => {
            const usersNGO = await NGOService.calculateUsersPerNGO();

            return usersNGO;
         });
      },
      groupsUser: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const groupsUser = await NGOService.calculateGroupsPerUser();

            return groupsUser;
         });
      },
   },
};
