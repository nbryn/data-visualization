import {actionRunner} from '../util/ActionRunner';
import {Error} from '../util/Error';
import {validateLogin} from '../../data/mappers/UserMapper';
import {User} from '../entities/User';

export const defaultResolvers = {
   Signin: {
      __resolveType: (obj: User | Error) => {
         if (obj instanceof Error) return 'Error';

         return 'User';
      },
   },
   Mutation: {
      signin: async (parent: any, args: unknown): Promise<User | Error> => {
         return actionRunner(async () => {
            const result = await validateLogin(args);

            return result;
         });
      },
   },
};
