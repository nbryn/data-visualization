const { fetchNumberOfGroupsWith } = require("../../data/mappers/GroupMapper");
const {
  fetchNumberOfUsersFrom,
  fetchUsersPerCountry,
} = require("../../data/mappers/UserMapper");

const getCountry = require("country-currency-map").getCountry;

const countryCodes = require("country-codes-list");

const countries = countryCodes.customList(
  "countryNameEn",
  "{countryCode} {countryNameEn}: {countryCallingCode}"
);

async function calculateNumberOfUsersForAllCountries() {
  const result = await fetchUsersPerCountry();

  const usersPerCountry = result.map((country) => {
    return {
      name: Object.keys(countries).find(
        (ele) =>
          countries[ele].substring(countries[ele].lastIndexOf(":") + 2) ===
          country._id
      ),
      count: country.count,
    };
  });

  return usersPerCountry;
}

async function calculateNumberOfGroups(country) {
  const currency = getCountry(country).currency;

  const numberOfGroups = await fetchNumberOfGroupsWith(currency);

  return numberOfGroups;
}

async function calculateNumberOfUsers(country) {
  const phoneCode = countries[country].substring(
    countries[country].lastIndexOf(":") + 2
  );

  console.log(countries);

  const users = await fetchNumberOfUsersFrom(phoneCode);

  return users;
}

module.exports = {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
  calculateNumberOfUsersForAllCountries,
};
