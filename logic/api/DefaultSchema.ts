const {gql} = require('apollo-server');

export const DefaultSchema = gql`
   scalar JSON

   type Count {
      name: String
      count: Float
   }

   type PerValue {
      value: String
      count: Float
   }

   type Day {
      year: Float!
      month: Float!
      day: Float!
   }

   type NumberDay {
      day: Day!
      count: Float!
   }

   type NumberMonth {
      year: Float
      month: Float
      count: Float
   }

   type User {
      token: String
      firstName: String
      lastName: String
      phoneNumber: String
      email: String
      gender: String
   }

   type Error {
      errorMessage: String
   }

   input SigninInput {
      username: String!
      password: String!
   }

   union Signin = User | Error

   type Mutation {
      signin(input: SigninInput!): Signin
   }

   type Query {
      _empty: String
   }
`;
