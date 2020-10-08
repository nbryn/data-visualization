import moment from 'moment';

import {CountDTO, LastMonthDTO, LastYearDTO} from '../../logic/util/DTOs';
import {Error} from '../../logic/util/Error';
import {UserModel} from '../connection';
import {User, UserState} from '../../logic/entities/User';

export async function validateLogin(args: any): Promise<User | Error> {
   const dbResult: User[] = await UserModel.find({
      email: `${args.input.username}`,
   });

   if (dbResult[0] === undefined) {
      throw new Error('Wrong username/password');
   } else {
      const {password} = dbResult[0];

      if (!password || password !== args.input.password) {
         throw new Error('Wrong username/password');
      } else {
         dbResult[0].token = '123456';

         return dbResult[0];
      }
   }
}

export async function fetchUserById(id: string): Promise<User | null> {
   const user = await UserModel.findById(id);

   return user;
}

export async function fetchUserCount(): Promise<number> {
   const total = await UserModel.find({state: UserState.ACTIVE}).countDocuments();

   return total;
}

export async function fetchAllUsers(): Promise<User[]> {
   const activeUsers = await UserModel.find(
      {
         state: UserState.ACTIVE,
      },
      {projection: {_id: 1, firstName: 1, lastName: 1}}
   );

   return activeUsers;
}

export async function fetchUsersWithEmail(): Promise<User[]> {
   const fetchUsersWithEmail = await UserModel.find(
      {
         email: {$ne: null},
         state: UserState.ACTIVE,
      },
      {projection: {_id: 1, firstName: 1, lastName: 1, email: 1}}
   );

   return fetchUsersWithEmail;
}

export async function fetchUsersWithPhone(): Promise<User[]> {
   const usersUsersWithPhone = await UserModel.find(
      {
         phoneNumber: {$ne: null},
         state: UserState.ACTIVE,
      },
      {projection: {_id: 1, firstName: 1, lastName: 1, phoneNumber: 1}}
   );

   return usersUsersWithPhone;
}

export async function fetchGenderStats(): Promise<CountDTO[]> {
   const genderStats = await UserModel.aggregate([
      {
         $match: {
            $or: [{gender: 'FEMALE'}, {gender: 'MALE'}],
         },
      },
      {
         $group: {
            _id: '$gender',
            count: {$sum: 1},
         },
      },
   ]);

   const genders = genderStats.map((element) => ({
      name: element._id,
      count: element.count,
   }));

   return genders;
}

export async function fetchUsersGroupedByPhoneCode(): Promise<CountDTO[]> {
   const usersPerCountry = await UserModel.aggregate([
      {
         $match: {state: 'ACTIVE'},
      },
      {
         $group: {
            _id: '$phoneCode',
            count: {$sum: 1},
         },
      },
      {
         $sort: {count: 1},
      },
   ]);

   const result = usersPerCountry.map((x) => ({
      name: x._id,
      count: x.count,
   }));

   return result;
}

export async function fetchUserCountByPhoneCode(phoneCode: string): Promise<number> {
   const usersCountry = await UserModel.find({
      state: UserState.ACTIVE,
      phoneCode: phoneCode,
   }).count();

   return usersCountry;
}

export async function fetchUsersLastMonth(): Promise<LastMonthDTO[]> {
   const since = moment('2020-02-01').subtract(30, 'days').toDate();

   const dbResult = await UserModel.aggregate([
      {
         $match: {
            signupDate: {$gt: since},
            state: 'ACTIVE',
         },
      },
      {
         $group: {
            _id: {
               year: {$year: '$signupDate'},
               month: {$month: '$signupDate'},
               day: {$dayOfMonth: '$signupDate'},
            },
            count: {$sum: 1},
         },
      },
      {$sort: {_id: 1}},
   ]);

   const users = dbResult.map((element) => ({
      day: {
         year: element._id.year,
         month: element._id.month,
         day: element._id.day,
      },
      count: element.count,
   }));

   return users;
}

export async function fetchUsersLastYear(): Promise<LastYearDTO[]> {
   const since = moment('2020-02-01').subtract(365, 'days').toDate();

   const dbResult = await UserModel.aggregate([
      {
         $match: {
            signupDate: {$gt: since},
            state: 'ACTIVE',
         },
      },
      {
         $group: {
            _id: {
               month: {$month: '$signupDate'},
               year: {$year: '$signupDate'},
            },
            count: {$sum: 1},
         },
      },
      {$sort: {_id: 1}},
   ]);

   const users = dbResult.map((element) => {
      return {
         year: element._id.year,
         month: element._id.month,
         count: element.count,
      };
   });

   return users;
}
