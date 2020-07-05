const { gql } = require("apollo-server");

const UserSchema = gql`
  input SigninInput {
    username: String!
    password: String!
  }

  type User {
    firstName: String
    lastName: String
    phoneNumber: String
    signupDate: String
    email: String
    gender: String
  }

  type UserInfo {
    usersWithPhone: [User]
    usersWithEmail: [User]
  }

  type UserStats {
    userCount: Float!
    usersActive: Float
    usersLastMonth: LastMonth
    usersLastYear: LastYear
    userGenderStats: [PerValue]
  }

  extend type Query {
    me: JSON
    userStats: UserStats
    userInfo: UserInfo
  }

  type Mutation {
    signin(input: SigninInput!): JSON
  }
`;

module.exports = UserSchema;
