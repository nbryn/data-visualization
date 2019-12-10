const { fetchGroupTotal } = require("../../data/actions/GroupActions");
const { fetchGroupsLastMonth } = require("../../data/actions/GroupActions");
const { fetchGroupsLastYear } = require("../../data/actions/GroupActions");

const groupResolvers = {
  Query: {
    groupStats: async (parent, args, context, info) => {    
      const groupTotal = await fetchGroupTotal();

      const groupsPrevMonth = await fetchGroupsLastMonth();

      const groupsPrevYear = await fetchGroupsLastYear();

      return {
        groupTotal,
        groupsLastMonth: { data: groupsPrevMonth },
        groupsLastYear: { data: groupsPrevYear }
      };
    }
  }
};

module.exports = groupResolvers;
