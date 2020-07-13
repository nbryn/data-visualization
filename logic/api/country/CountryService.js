const { fetchNumberOfGroupsWith } = require("../../../data/mappers/GroupMapper");
const { calculateMeetingsPerGroup } = require("../meeting/MeetingService");
const {
  fetchNumberOfUsersFrom,
  fetchUsersPerCountry,
} = require("../../../data/mappers/UserMapper");

const isoCurrency = require("iso-country-currency");
const getCountry = require("country-currency-map").getCountry;
const countryCodes = require("country-codes-list");

const countries = countryCodes.customList(
  "countryNameEn",
  "{countryCode} {countryNameEn}: {countryCallingCode}"
);

async function calculateUsersPerCountry() {
  const tempUsersPerCountry = await fetchUsersPerCountry();

  const usersPerCountry = tempUsersPerCountry.map((country) => {
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

async function calculateMeetingsPerCountry() {
  const meetingsPerGroup = await calculateMeetingsPerGroup();

  const meetingsPerCountry = [];

  meetingsPerGroup.forEach((element) => {
    const index = meetingsPerCountry.findIndex(
      (x) => x.currency === element.currency
    );
    if (index === -1) {
      const countries = isoCurrency.getAllCountriesByCurrencyOrSymbol(
        "currency",
        element.currency
      );
      let country;

      if (element.currency === "USD") country = "United States";
      else if (element.currency === "DKK") country = "Denmark";
      else country = countries[0];

      meetingsPerCountry.push({
        name: country,
        count: element.count,
        currency: element.currency,
      });
    } else {
      meetingsPerCountry[index].count += element.count;
    }
  });

  return meetingsPerCountry;
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

  const users = await fetchNumberOfUsersFrom(phoneCode);

  return users;
}

module.exports = {
  calculateNumberOfGroups,
  calculateNumberOfUsers,
  calculateUsersPerCountry,
  calculateMeetingsPerCountry,
};
