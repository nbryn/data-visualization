const { gql } = require("apollo-server");

const UserSchema = gql`
  type UserStats {
    numberOfUsers: Float!
    signups: [NumberDay]!
  }

  input SigninInput {
    username: String!
    password: String!
  }

  type UserGender {
    male: Float
    female: Float
  }

  extend type Query {
    me: JSON
    userGender: UserGender
    userStats: JSON
    usersLastYear: LastYear
  }

  type Mutation {
    signin(input: SigninInput!): JSON
  }
`;

module.exports = UserSchema;
