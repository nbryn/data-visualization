const actionRunner = require('../util/ActionRunner.js');
const Error = require('../util/Error');
const {validateLogin} = require('../../data/mappers/UserMapper');

const userResolvers = {
    Signin: {
        __resolveType: (obj) => {
            if (obj instanceof Error) return 'Error';

            return 'User';
        },
    },
    Mutation: {
        signin: async (parent, args) => {
            return actionRunner(async () => {
                console.log(args);
                const result = await validateLogin(args);

                return result;
            });
        },
    },
};

module.exports = userResolvers;
