const { getModel } = require("../connection");

async function validateLogin(args) {
  const userModel = await getModel("User");

  const dbResult = await userModel.find({
    email: `${args.input.username}`,
  });

  const error = {
    error: "Wrong Email/Username",
  };

  if (dbResult[0] === undefined) {
    return error;
  } else {
    const {
      password,
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    } = dbResult[0];

    if (!password || password !== args.input.password) {
      return error;
    } else {
      const succes = {
        token: "123456",
        user: {
          firstName,
          lastName,
          email,
          phoneNumber,
          gender,
        },
      };
      return succes;
    }
  }
}

async function fetchUserCount() {
  const userModel = await getModel("User");

  const total = await userModel.countDocuments({ state: "ACTIVE" });

  return total;
}

async function fetchAllUsers() {
  const userModel = await getModel("User");

  const activeUsers = await userModel.find(
    {
      state: "ACTIVE",
    },
    { projection: { _id: 1, firstName: 1, lastName: 1 } }
  );

  return activeUsers;
}

async function fetchUsersWithEmail() {
  const userModel = await getModel("User");

  const fetchUsersWithEmail = await userModel.find(
    {
      email: { $ne: null },
      state: "ACTIVE",
    },
    { projection: { _id: 1, firstName: 1, lastName: 1, email: 1 } }
  );

  return fetchUsersWithEmail;
}

async function fetchUsersWithPhone() {
  const userModel = await getModel("User");

  const usersUsersWithPhone = await userModel.find(
    {
      phoneNumber: { $ne: null },
      state: "ACTIVE",
    },
    { projection: { _id: 1, firstName: 1, lastName: 1, phoneNumber: 1 } }
  );

  return usersUsersWithPhone;
}

async function fetchGenderStats() {
  const userModel = await getModel("User");

  const genderStats = await userModel.aggregate([
    {
      $match: {
        $or: [{ gender: "FEMALE" }, { gender: "MALE" }],
      },
    },
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ]);

  const genders = genderStats.map((element) => {
    return {
      value: element._id,
      count: element.count,
    };
  });

  return genders;
}

async function fetchUsersPerCountry() {
  const userModel = await getModel("User");

  const usersPerCountry = await userModel.aggregate([
    {
      $match: { state: "ACTIVE" },
    },
    {
      $group: {
        _id: "$phoneCode",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  return usersPerCountry;
}

async function fetchNumberOfUsersFrom(country) {
  const userModel = await getModel("User");

  const usersCountry = await userModel
    .find({
      state: "ACTIVE",
      phoneCode: country,
    })
    .count();

  return usersCountry;
}

module.exports = {
  validateLogin,
  fetchUserCount,
  fetchAllUsers,
  fetchGenderStats,
  fetchUsersWithEmail,
  fetchUsersWithPhone,
  fetchUsersPerCountry,
  fetchNumberOfUsersFrom,
};
