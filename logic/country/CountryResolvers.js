const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
  calculateNumberOfUsersForAllCountries,
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
          name: element._id,
          count: element.count,
        };
      });

      return groupsCountry;
    },
    usersCountry: async (root, context) => {
      const usersPerCountry = await calculateNumberOfUsersForAllCountries();

      return usersPerCountry;
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
