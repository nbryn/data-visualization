const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
  calculateUsersPerCountry,
  calculateMeetingsPerCountry,
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
      const usersPerCountry = await calculateUsersPerCountry();

      return usersPerCountry;
    },
    meetingsCountry: async (root, context) => {
      const meetingsPerCountry = await calculateMeetingsPerCountry();

      return meetingsPerCountry;
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
