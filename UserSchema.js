const { gql } = require("apollo-server");

const UserSchema = gql`
  enum UserGender {
    NOT_SET
    MALE
    FEMALE
  }

  type ValidationFieldError {
    field: String!
    errors: [String]!
  }

  type ValidationError {
    result: [ValidationFieldError]!
  }

  type User {
    id: String!
    email: String
    phoneCode: String
    phoneNumber: String
    username: String
    firstName: String
    lastName: String
    image: String
    gender: UserGender
    active: Boolean
    verified: Boolean
    language: String
  }

  type Login {
    token: String!
    refreshToken: String!
    deviceId: String!
    user: User!
  }

  type Signup {
    token: String!
  }

  type UserSearchResult {
    users: [User]!
  }

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

  input UserSearchInput {
    search: String!
  }

  type Query {
    me: User
    user: User
    userStats: UserStats
  }

  input SigninInput {
    username: String!
    password: String!
  }

  type empty {
      
  }

  type Mutation {
    signin(input: SigninInput!): Login
  }
`;

module.exports = UserSchema;
