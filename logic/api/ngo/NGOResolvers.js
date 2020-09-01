import {actionRunner} from '../../util/ActionRunner';
const {calculateGroupsPerUser, calculateUsersPerNGO} = require('./NGOService');
const {fetchGroupStats} = require('../../../data/mappers/GroupMapper');

const ngoResolvers = {
   Query: {
      ngoStats: async (root, context) => ({root, context}),
   },
   NGOStats: {
      groupsNGO: async (root, context) => {
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
      usersNGO: async (root, context) => {
         return actionRunner(async () => {
            const usersNGO = await calculateUsersPerNGO();

            return usersNGO;
         });
      },
      groupsUser: async (root, context) => {
         return actionRunner(async () => {
            const groupsUser = await calculateGroupsPerUser();

            return groupsUser;
         });
      },
   },
};

module.exports = ngoResolvers;
