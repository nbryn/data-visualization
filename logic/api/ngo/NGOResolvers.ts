import {actionRunner} from '../../util/ActionRunner';
import {fetchGroupStats} from '../../../data/mappers/GroupMapper';
const {calculateGroupsPerUser, calculateUsersPerNGO} = require('./NGOService');

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
      usersNGO: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const usersNGO = await calculateUsersPerNGO();

            return usersNGO;
         });
      },
      groupsUser: async (): Promise<any[]> => {
         return actionRunner(async () => {
            const groupsUser = await calculateGroupsPerUser();

            return groupsUser;
         });
      },
   },
};
