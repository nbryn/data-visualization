const { getGroupsLastMonth } = require("../../data/group/GroupLastMonthAction");
const { getGroupTotal } = require("../../data/group/GroupTotalAction");
const { getGroupsLastYear } = require("../../data/group/GroupLastYearAction");

const groupResolvers = {
  Query: {
    groupsTotal: async (parent, args, context, info) => {
      const result = await getGroupTotal();

      return result;
    },
    groupsLastMonth: async (parent, args, context, info) => {
      const result = await getGroupsLastMonth();

      return {
        signups: result
      };
    },

    groupsLastYear: async (parent, args, context, info) => {
      const result = await getGroupsLastYear();

      return {
        signups: result
      };
    }
  }
};

module.exports = groupResolvers;
