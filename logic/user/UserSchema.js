const { gql } = require("apollo-server");

const UserSchema = gql`
  type UserNumberDay {
    day: Day!
    count: Float!
  }

  type UserNumberMonth {
    month: JSON
    count: Float!
  }

  type UserLastYearStats {
    signups: [UserNumberMonth]!
  }

  type UserStats {
    numberOfUsers: Float!
    signups: [UserNumberDay]!
  }

  input SigninInput {
    username: String!
    password: String!
  }

  scalar JSON

  extend type Query {
    me: JSON
    userStats: JSON
    usersLastYear: UserLastYearStats
  }

  type Mutation {
    signin(input: SigninInput!): JSON
  }
`;

module.exports = UserSchema;
