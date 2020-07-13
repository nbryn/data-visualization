const { fetchGroupStats } = require("../../../data/mappers/GroupMapper");
const { calculateGroupsPerUser, calculateUsersPerNGO } = require("./NGOService");

const ngoResolvers = {
  Query: {
    ngoStats: async (root, context) => ({ root, context }),
  },
  NGOStats: {
    groupsNGO: async (root, context) => {
      const result = await fetchGroupStats("$ngoOrganization");

      const groupsNGO = result.map((element) => {
        return {
          name: element._id,
          count: element.count,
        };
      });

      return groupsNGO;
    },
    usersNGO: async (root, context) => {
      const usersNGO = await calculateUsersPerNGO();

      return usersNGO;
    },
    groupsUser: async (root, context) => {
      const groupsUser = await calculateGroupsPerUser();

      return groupsUser;
    },
  },
};

module.exports = ngoResolvers;
