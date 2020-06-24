const { fetchNumberOfGroupsWith } = require("../../data/mappers/GroupMapper");
const { fetchNumberOfUsersFrom } = require("../../data/mappers/UserMapper");

const getCountry = require("country-currency-map").getCountry;

const countryCodes = require("country-codes-list");

const countries = countryCodes.customList(
  "countryNameEn",
  "[{countryCode}] {countryNameEn}: {countryCallingCode}"
);

async function calculateNumberOfGroups(country) {
  const currency = getCountry(country).currency;

  const numberOfGroups = await fetchNumberOfGroupsWith(currency);

  return numberOfGroups;
}

async function calculateNumberOfUsers(country) {
  const phoneCode = countries[country].substring(
    countries[country].lastIndexOf(":") + 2
  );
  const users = await fetchNumberOfUsersFrom(phoneCode);

  return users;
}

module.exports = {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
};
