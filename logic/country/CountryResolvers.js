const { fetchGroupStats } = require("../../data/mappers/GroupMapper");
const { fetchUsersPerCountry } = require("../../data/mappers/UserMapper");

const countryResolvers = {
  Query: {
    generalCountryStats: (root, context) => ({ root, context }),
    country: (root, context) => ({ root, context }),
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
  Country: {
    groups: async (root, context) => {
      //   const result = await fetchUsersPerCountry();
      //   const usersCountry = result.map((element) => {
      //     return {
      //       country: element._id,
      //       count: element.count,
      //     };
      //   });
      //   return usersCountry;
    },
    users: async (root, context) => {
      //   const result = await fetchUsersPerCountry();
      //   const usersCountry = result.map((element) => {
      //     return {
      //       country: element._id,
      //       count: element.count,
      //     };
      //   });
      //   return usersCountry;
    },
  },
};

module.exports = countryResolvers;
