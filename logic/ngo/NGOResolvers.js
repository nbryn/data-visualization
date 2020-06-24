const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const { calculateGroupsPerUser } = require("./NGOService");
const { fetchGroupMemberByUser } = require("../../data/mappers/GroupMapper");
const ngoResolvers = {
  Query: {
    ngoStats: async (root, context) => ({ root, context }),
  },
  NGOStats: {
    groupsNGO: async (root, context) => {
      const result = await fetchGroupStats("$ngoOrganization");

      const groupsNGO = result
        .map((element) => {
          return {
            name: element._id,
            count: element.count,
          };
        })
        .sort((a, b) => {
          if (a.count < b.count) return 1;
          if (a.count === b.count) return 0;

          return -1;
        });

      return groupsNGO;
    },
    groupsUser: async (root, context) => {
      const groupsUser = await calculateGroupsPerUser();

      return groupsUser;
    },
  },
};

module.exports = ngoResolvers;
File logic/ngo/NGOSchema.js ADDED