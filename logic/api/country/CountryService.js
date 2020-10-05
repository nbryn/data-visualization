import countryCodes from 'country-codes-list';
import {getCountry} from 'country-currency-map';
import isoCurrency from 'iso-country-currency';

import {fetchTeamsByCurrency} from '../../../data/mappers/TeamMapper';
import * as UserMapper from '../../../data/mappers/UserMapper';
import {calculateMatchesPerTeam} from '../match/MatchService';

const countries = countryCodes.customList(
   'countryNameEn',
   '{countryCode} {countryNameEn}: {countryCallingCode}'
);

export async function calculateUsersPerCountry() {
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

export async function calculateMatchesPerCountry() {
   const matchesPerTeams = await calculateMatchesPerTeam();

   const matchesPerCountry = [];

   matchesPerTeams.forEach((element) => {
      const index = matchesPerCountry.findIndex((x) => x.currency === element.currency);
      if (index === -1) {
         const countries = isoCurrency.getAllCountriesByCurrencyOrSymbol('currency', element.currency);
         let country;

         if (element.currency === 'USD') country = 'United States';
         else if (element.currency === 'DKK') country = 'Denmark';
         else country = countries[0];

         matchesPerCountry.push({
            name: country,
            count: element.count,
            currency: element.currency,
         });
      } else {
         matchesPerCountry[index].count += element.count;
      }
   });

   return matchesPerCountry;
}

export async function calculateNumberOfTeamsPerCountry(country) {
   const currency = getCountry(country).currency;

   const numberOfTeams = await fetchTeamsByCurrency(currency);

   return numberOfTeams;
}

export async function calculateNumberOfUsers(country) {
   const phoneCode = countries[country].substring(countries[country].lastIndexOf(':') + 2);

   const users = await UserMapper.fetchNumberOfUsersFrom(phoneCode);

   return users;
}
