// export const resolvers = {
//   LoginType: {
//     __resolveType(obj) {
//       if (obj.result) {
//         return "ValidationError";
//       }

//       return "Login";
//     }
//   },
//   SignupType: {
//     __resolveType(obj) {
//       if (obj.result) {
//         return "ValidationError";
//       }

//       return "Signup";
//     }
//   },
//   UserType: {
//     __resolveType(obj) {
//       if (obj.result) {
//         return "ValidationError";
//       }

//       return "User";
//     }
//   },
//   UsersType: {
//     __resolveType(obj) {
//       if (obj.result) {
//         return "ValidationError";
//       }

//       return "UserSearchResult";
//     }
//   },
//   SucceedType: {
//     __resolveType(obj) {
//       if (obj.result) {
//         return "ValidationError";
//       }

//       return "Succeed";
//     }
//   },

//   Mutation: {
//     signin: async ({ input }) => {
//       const result = await signinWithUsername(input);
//       if (result.result) {
//         return result;
//       }
//       return convertToLoginDto(result);
//     }
//   },
//   Query: {
//     user: async (parent, { input }) => {
//       const result = await userSearch(input);
//       if (result.result) {
//         return result;
//       }

//       return {
//         users: await convertToUsersDto(result)
//       };
//     },
//     me: async (parent, args, context) => convertToUserDto(context.user),
//     userStats: async () => getUserStats()
//   }
// };
