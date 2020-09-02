import mongoose, {Document} from 'mongoose';
const Schema = mongoose.Schema;

export enum UserState {
   CREATING = 'CREATING',
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export enum UserGender {
   NOT_SET = 'NOT_SET',
   MALE = 'MALE',
   FEMALE = 'FEMALE',
}

export interface User extends Document {
   email: string | null;
   language: string;
   firstName: string;
   lastName: string;
   gender: UserGender;
   password: string;
   phoneCode: string;
   phoneNumber: String | null;
   pinCode: string;
   signupDate?: Date;
   state?: UserState;
   token: string;
}

export const UserSchema = new Schema({
   email: String,
   language: String,
   firstName: String,
   lastName: String,
   gender: {
      type: String,
      default: UserGender.NOT_SET,
   },
   password: String,
   phoneCode: String,
   phoneNumber: String,
   pinCode: String,
   signupDate: Date,
   state: {
      type: String,
      default: UserState.CREATING,
   },
   token: String,
});
