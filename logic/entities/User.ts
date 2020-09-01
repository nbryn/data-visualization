const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStates = {
   CREATING: 'CREATING',
   ACTIVE: 'ACTIVE',
   NOT_ACTIVE: 'NOT_ACTIVE',
};

const UserGenders = {
   NOT_SET: 'NOT_SET',
   MALE: 'MALE',
   FEMALE: 'FEMALE',
};

export const UserSchema = new Schema({
   email: String,
   language: String,
   firstName: String,
   lastName: String,
   gender: {
      type: String,
      default: UserGenders.NOT_SET,
   },
   password: String,
   phoneCode: String,
   phoneNumber: String,
   pinCode: String,
   signupDate: Date,
   state: {
      type: String,
      default: UserStates.CREATING,
   },
   username: String,
});

