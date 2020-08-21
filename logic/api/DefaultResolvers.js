const actionRunner = require('../util/ActionRunner.js');
const Error = require('../util/Error');
const {validateLogin} = require('../../data/mappers/UserMapper');

const defaultResolvers = {
    Signin: {
        __resolveType: (obj) => {
            if (obj instanceof Error) return 'Error';

            return 'User';
        },
    },
    Mutation: {
        signin: async (parent, args) => {
            return actionRunner(async () => {
                const result = await validateLogin(args);

                return result;
            });
        },
    },
};

module.exports = defaultResolvers;
