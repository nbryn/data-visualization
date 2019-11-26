// const userSchema = `
//   directive @auth(
//     requires: Role = ADMIN,
//   ) on OBJECT | FIELD_DEFINITION
  
//   enum Role {
//     ALL
//     SIGNUP
//     USER
//   }
  
//   scalar Date

//   enum UserGender {
//     NOT_SET
//     MALE
//     FEMALE
//   }

//   type ValidationFieldError {
//     field: String!
//     errors: [String]!
//   }

//   type ValidationError {
//     result: [ValidationFieldError]!
//   }

//   type User {
//     id: String!
//     updatedAt: Date!    
//     email: String
//     phoneCode: String
//     phoneNumber: String
//     username: String
//     firstName: String
//     lastName: String
//     image: String
//     gender: UserGender
//     active: Boolean
//     verified: Boolean
//     language: String
//   }

//   type Login {
//     token: String!
//     refreshToken: String!
//     deviceId: String!
//     user: User!
//   }

//   type Signup {
//     token: String!
//   }

//   type UserSearchResult {
//     users: [User]!
//   }

//   type Day {
//     year: Float!
//     month: Float!
//     day: Float!
//   }

//   type UserNumberDay {
//     day: Day!
//     count: Float!
//   }

//   type UserStats {
//     numberOfUsers: Float!
//     signups: [UserNumberDay]!
//   }

//   input UserSearchInput {
//     search: String!
//   }

//   union UsersType = UserSearchResult | ValidationError

//   input SigninInput {
//     channel: Channel!
//     username: String!
//     password: String!
//   }

//   input RefreshInput {
//     token: String!
//     refresh: String!
//   }

//   type Succeed {
//     succeed: Boolean!
//   }

//   union SucceedType = Succeed | ValidationError

//   union LoginType = ValidationError | Login
//   union SignupType = ValidationError | Signup
//   union UserType = User | ValidationError

//   type Mutation {
//     signin(input: SigninInput!): LoginType
//     refresh(input: RefreshInput!): LoginType
//   }

//   type Query {
//     me: User @auth(requires: USER)
//     user(input: UserSearchInput!): UsersType @auth(requires: USER)
//     userStats: UserStats @auth(requires: USER)
//   }
// `;

// module.exports = userSchema;