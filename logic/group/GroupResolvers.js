const { fetchGroupTotal } = require("../../data/actions/GroupActions");
const { fetchGroupsLastMonth } = require("../../data/actions/GroupActions");
const { fetchGroupsLastYear } = require("../../data/actions/GroupActions");

const groupResolvers = {
  Query: {
    groupTotal: async (parent, args, context, info) => {
      const result = await fetchGroupTotal();

      return result;
    },
    groupsLastMonth: async (parent, args, context, info) => {
      const result = await fetchGroupsLastMonth();

      return {
        signups: result
      };
    },

    groupsLastYear: async (parent, args, context, info) => {
      const result = await fetchGroupsLastYear();

      return {
        signups: result
      };
    }
  }
};

module.exports = groupResolvers;
