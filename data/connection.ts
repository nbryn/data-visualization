import mongoose from 'mongoose';
require('dotenv').config();

import {GroupAccount, GroupAccountSchema} from '../logic/entities/GroupAccount';
import {GroupMeetingLoan, GroupMeetingLoanSchema} from '../logic/entities/GroupMeetingLoan';
import {GroupMeeting, GroupMeetingSchema} from '../logic/entities/GroupMeeting';
import {GroupMeetingShareout, GroupMeetingShareoutSchema} from '../logic/entities/GroupMeetingShareout';
import {GroupMember, GroupMemberSchema} from '../logic/entities/GroupMember';
import {Group, GroupSchema} from '../logic/entities/Group';
import {User, UserSchema} from '../logic/entities/User';

export let GroupAccountModel: mongoose.Model<GroupAccount, {}>;
export let GroupMeetingLoanModel: mongoose.Model<GroupMeetingLoan, {}>;
export let GroupMeetingModel: mongoose.Model<GroupMeeting, {}>;
export let GroupMeetingShareoutModel: mongoose.Model<GroupMeetingShareout, {}>;
export let GroupMemberModel: mongoose.Model<GroupMember, {}>;
export let GroupModel: mongoose.Model<Group, {}>;
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
