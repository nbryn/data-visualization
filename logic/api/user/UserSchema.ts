const {gql} = require('apollo-server');

export const UserSchema = gql`
   type UserInfo {
      usersWithPhone: [User]
      usersWithEmail: [User]
   }

   type UserStats {
      userCount: Float!
      usersActive: Float
      usersLastMonth: [NumberDay]
      usersLastYear: [NumberMonth]
      userGenderStats: [PerUnit]
   }

   extend type Query {
      me: JSON
      userStats: UserStats
      userInfo: UserInfo
   }
`;
