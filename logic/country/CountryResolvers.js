const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const { fetchUsersPerCountry } = require("../../data/mappers/UserMapper");
const {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
} = require("./CountryService");

const countryResolvers = {
  Query: {
    generalCountryStats: (root, context) => ({ root, context }),
    country: (obj, args, root, context) => ({ obj, args, root, context }),
  },
  GeneralCountryStats: {
    groupsCountry: async (root, context) => {
      const result = await fetchGroupStats("$country");

      const groupsCountry = result.map((element) => {
        return {
          country: element._id,
          count: element.count,
        };
      });

      return groupsCountry;
    },
    usersCountry: async (root, context) => {
      const result = await fetchUsersPerCountry();

      const usersCountry = result.map((element) => {
        return {
          country: element._id,
          count: element.count,
        };
      });

      return usersCountry;
    },
  },
  CountryStats: {
    country: async (obj, args, root, context) => {
      const groups = await calculateNumberOfGroups(args.country);

      const users = await calculateNumberOfUsers(args.country);

      return {
        groups,
        users,
      };
    },
  },
};

module.exports = countryResolvers;
