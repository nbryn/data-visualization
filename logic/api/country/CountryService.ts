import isoCurrency from 'iso-country-currency';

import * as UserMapper from '../../../data/mappers/UserMapper';
import {calculateMatchesPerTeam} from '../match/MatchService';
import {CountDTO} from '../../util/DTOs';
import {fetchTeamCountByCurrency} from '../../../data/mappers/TeamMapper';

const countryCodes = require('country-codes-list');
const {getCountry} = require('country-currency-map');

const countries = countryCodes.customList(
   'countryNameEn',
   '{countryCode} {countryNameEn}: {countryCallingCode}'
);

export async function calculateUsersPerCountry(): Promise<CountDTO[]> {
   const tempUsersPerCountry = await UserMapper.fetchUsersGroupedByPhoneCode();

   const usersPerCountry = tempUsersPerCountry.map((country) => ({
      name: Object.keys(countries).find(
         (ele) => countries[ele].substring(countries[ele].lastIndexOf(':') + 2) === country.name
      ),
      count: country.count,
   }));

   return usersPerCountry as CountDTO[];
}

export async function calculateMatchesPerCountry(): Promise<CountDTO[]> {
   const matchesPerTeams = await calculateMatchesPerTeam();

   const matchesPerCountry: CountDTO[] = [];

   matchesPerTeams.forEach((element) => {
      const index = matchesPerCountry.findIndex((x) => x.currency === element.currency);
      if (index === -1) {
         const countries = isoCurrency.getAllCountriesByCurrencyOrSymbol('currency', element.currency!);
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

   return matchesPerCountry.sort((a: CountDTO, b: CountDTO) => a.count - b.count);
}

export async function calculateTeamCountByCountry(country: string): Promise<number> {
   const currency = getCountry(country).currency;

   const numberOfTeams = await fetchTeamCountByCurrency(currency);

   return numberOfTeams;
}

export async function calculateUserCountByCountry(country: string): Promise<number> {
   const phoneCode = countries[country].substring(countries[country].lastIndexOf(':') + 2);

   const users = await UserMapper.fetchUserCountByPhoneCode(phoneCode);

   return users;
}
