const { gql } = require('apollo-server');

const NGOSchema = gql`
    type GroupsPer {
        name: String
        count: Float
    }

    type GroupsPerUser {
        id: String
        name: String
        count: Float
    }

    type NGOStats {
        groupsNGO: [GroupsPer]
        groupsUser: [GroupsPerUser]
        usersNGO: [GroupsPer]
    }

    extend type Query {
        ngoStats: NGOStats
    }
`;

module.exports = NGOSchema;
