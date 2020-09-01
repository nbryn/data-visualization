const mongoose = require('mongoose');
require('dotenv').config();

import {GroupAccountSchema} from '../logic/entities/GroupAccount.ts';
import {GroupMeetingLoanSchema} from '../logic/entities/GroupMeetingLoan.ts';
import {GroupMeetingSchema} from '../logic/entities/GroupMeeting.ts';
import {GroupMeetingShareoutSchema} from '../logic/entities/GroupMeetingShareout.ts';
import {GroupMemberSchema} from '../logic/entities/GroupMember.ts';
import {GroupSchema} from '../logic/entities/Group.ts';
import {UserSchema} from '../logic/entities/User.ts';

let groupAccountModel;
let groupMeetingLoanModel;
let groupMeetingModel;
let groupMeetingShareoutModel;
let groupMemberModel;
let groupModel;
let userModel;

let connection;
let isConnected;

async function getModel(model) {
   if (!isConnected) connection = await connectToDB();

   switch (model) {
      case 'GroupAccount':
         if (!groupAccountModel) groupAccountModel = connection.model('GroupAccount', GroupAccountSchema);
         return groupAccountModel;

      case 'GroupMeetingLoan':
         if (!groupMeetingLoanModel)
            groupMeetingLoanModel = connection.model('GroupMeetingLoan', GroupMeetingLoanSchema);
         return groupMeetingLoanModel;

      case 'GroupMeeting':
         if (!groupMeetingModel) groupMeetingModel = connection.model('GroupMeeting', GroupMeetingSchema);
         return groupMeetingModel;

      case 'GroupMeetingShareout':
         if (!groupMeetingShareoutModel)
            groupMeetingShareoutModel = connection.model('GroupMeetingShareout', GroupMeetingShareoutSchema);
         return groupMeetingLoanModel;

      case 'GroupMember':
         if (!groupMemberModel) groupMemberModel = connection.model('GroupMember', GroupMemberSchema);
         return groupMemberModel;

      case 'Group':
         if (!groupModel) groupModel = connection.model('Group', GroupSchema);
         return groupModel;

      case 'User':
         if (!userModel) userModel = connection.model('User', UserSchema);
         return userModel;
   }
}

async function connectToDB() {
   try {
      await mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true,
      });

      isConnected = true;
      connection = mongoose.connection;

      return connection;
   } catch (err) {
      console.log(err);
   }
}

module.exports = {getModel};
