const { getGroupSignups } = require("../../data/group/GroupSignupAction");
const { getGroupTotal } = require("../../data/group/GroupTotalAction");

const groupResolvers = {
  Query: {
    groupsTotal: async (parent, args, context, info) => {
      const result = await getGroupTotal();

      return result;
    },
    groupsLastMonth: async (parent, args, context, info) => {
      return fetchGroups(30);
    },
    groupsLastThreeMonths: async (parent, args, context, info) => {
      return fetchGroups(90);
    },
    groupsLastSixMonths: async (parent, args, context, info) => {
      return fetchGroups(180);
    },
    groupsLastYear: async (parent, args, context, info) => {
      return fetchGroups(365);
    }
  }
};

async function fetchGroups(days) {
  const result = await getGroupSignups(days);

  return {
    signups: result
  };
}

module.exports = groupResolvers;
