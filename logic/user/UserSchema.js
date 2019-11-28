const { gql } = require("apollo-server");

const UserSchema = gql`
  type Day {
    year: Float!
    month: Float!
    day: Float!
  }

  type UserNumberDay {
    day: Day!
    count: Float!
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

  type Query {
    me: JSON
    userStats: JSON
  }

  type Mutation {
    signin(input: SigninInput!): JSON
  }
`;

module.exports = UserSchema;
