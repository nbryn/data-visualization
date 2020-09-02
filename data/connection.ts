import mongoose from 'mongoose';
require('dotenv').config();

import {GroupAccountSchema} from '../logic/entities/GroupAccount';
import {GroupMeetingLoanSchema} from '../logic/entities/GroupMeetingLoan';
import {GroupMeetingSchema} from '../logic/entities/GroupMeeting';
import {GroupMeetingShareoutSchema} from '../logic/entities/GroupMeetingShareout';
import {GroupMemberSchema} from '../logic/entities/GroupMember';
import {GroupSchema} from '../logic/entities/Group';
import {User, UserSchema} from '../logic/entities/User';

export let GroupAccountModel: any;
export let GroupMeetingLoanModel: any;
export let GroupMeetingModel: any;
export let GroupMeetingShareoutModel: any;
export let GroupMemberModel: any;
export let GroupModel: any;
export let UserModel: mongoose.Model<User, {}>;

export async function getModel(model: any) {
   if (!isConnected) connection = await connectToDB();

   switch (model) {
      case 'GroupAccount':
         if (!GroupAccountModel) GroupAccountModel = connection.model('GroupAccount', GroupAccountSchema);
         return GroupAccountModel;

      case 'GroupMeetingLoan':
         if (!GroupMeetingLoanModel)
            GroupMeetingLoanModel = connection.model('GroupMeetingLoan', GroupMeetingLoanSchema);
         return GroupMeetingLoanModel;

      case 'GroupMeeting':
         if (!GroupMeetingModel) GroupMeetingModel = connection.model('GroupMeeting', GroupMeetingSchema);
         return GroupMeetingModel;

      case 'GroupMeetingShareout':
         if (!GroupMeetingShareoutModel)
            GroupMeetingShareoutModel = connection.model('GroupMeetingShareout', GroupMeetingShareoutSchema);
         return GroupMeetingLoanModel;

      case 'GroupMember':
         if (!GroupMemberModel) GroupMemberModel = connection.model('GroupMember', GroupMemberSchema);
         return GroupMemberModel;

      case 'Group':
         if (!GroupModel) GroupModel = connection.model('Group', GroupSchema);
         return GroupModel;

      case 'User':
         if (!UserModel) UserModel = connection.model('User', UserSchema);
         return UserModel;
   }
}

module.exports.getModel = getModel;

let connection: any;
let isConnected: boolean = false;

export async function connectToDB(): Promise<void> {
   try {
      // @ts-ignore
      await mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true,
      });

      if (isConnected) return;

      isConnected = true;
      connection = mongoose.connection;

      GroupAccountModel = connection.model('GroupAccount', GroupAccountSchema);
      GroupMeetingLoanModel = connection.model('GroupMeetingLoan', GroupMeetingLoanSchema);
      GroupMeetingModel = connection.model('GroupMeeting', GroupMeetingSchema);
      GroupMeetingShareoutModel = connection.model('GroupMeetingShareout', GroupMeetingShareoutSchema);
      GroupMemberModel = connection.model('GroupMember', GroupMemberSchema);
      GroupModel = connection.model('Group', GroupSchema);
      UserModel = connection.model('User', UserSchema);
   } catch (err) {
      console.log(err);
   }
}
