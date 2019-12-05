const { fetchGroupsLastMonth } = require("../../data/group/GroupLastMonthAction");
const { fetchGroupTotal } = require("../../data/group/GroupTotalAction");
const { fetchGroupsLastYear } = require("../../data/group/GroupLastYearAction");

const groupResolvers = {
  Query: {
    groupsTotal: async (parent, args, context, info) => {
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
