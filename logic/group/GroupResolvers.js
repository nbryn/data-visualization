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

  let months = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
  ]);

  // console.log(result);

  // console.log(result[0].day.month)
  // console.log(result[0].count);

  for (let i = 0; i < result.length; i++) {
    const current = result[i].day.month;
    const count = result[i].count;

    if (months.has(current)) {
      const currentValue = months.get(current);
      months.set(current, count + currentValue);
    }
  }

 
  console.log(months);

  return {
    signups: result
  };
}

module.exports = groupResolvers;
