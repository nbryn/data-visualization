const { fetchNumberOfGroupsWith } = require("../../data/mappers/GroupMapper");
var getCountry = require("country-currency-map").getCountry;

async function calculateNumberOfGroups(country) {
  const currency = getCountry(country).currency;

  const numberOfGroups = await fetchNumberOfGroupsWith(currency);

  return numberOfGroups;
}

async function calculateCountryStats(country) {}

module.exports = {
  calculateNumberOfGroups,
};
