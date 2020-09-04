import countryCodes from 'country-codes-list';
import {getCountry} from 'country-currency-map';
import isoCurrency from 'iso-country-currency';

import {fetchNumberOfGroupsWith} from '../../../data/mappers/GroupMapper';
import * as UserMapper from '../../../data/mappers/UserMapper';
const {calculateMeetingsPerGroup} = require('../meeting/MeetingService');

const countries = countryCodes.customList('countryNameEn', '{countryCode} {countryNameEn}: {countryCallingCode}');

async function calculateUsersPerCountry() {
   const tempUsersPerCountry = await UserMapper.fetchUsersPerCountry();

   const usersPerCountry = tempUsersPerCountry.map((country) => {
      return {
         name: Object.keys(countries).find(
            (ele) => countries[ele].substring(countries[ele].lastIndexOf(':') + 2) === country._id
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
      const index = meetingsPerCountry.findIndex((x) => x.currency === element.currency);
      if (index === -1) {
         const countries = isoCurrency.getAllCountriesByCurrencyOrSymbol('currency', element.currency);
         let country;

         if (element.currency === 'USD') country = 'United States';
         else if (element.currency === 'DKK') country = 'Denmark';
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
   const phoneCode = countries[country].substring(countries[country].lastIndexOf(':') + 2);

   const users = await UserMapper.fetchNumberOfUsersFrom(phoneCode);

   return users;
}

module.exports = {
   calculateNumberOfGroups,
   calculateNumberOfUsers,
   calculateUsersPerCountry,
   calculateMeetingsPerCountry,
};
