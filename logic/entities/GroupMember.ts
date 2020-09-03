import {Document, Schema} from 'mongoose';

import {Group} from './Group';
import {User} from './User';

export enum GroupMemberState {
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export enum GroupMemberRole {
   OWNER = 'OWNER',
   ADMINISTRATOR = 'ADMINISTRATOR',
   MEMBER = 'MEMBER',
}

export interface GroupMember extends Document {
   group: Group;
   user: User;
   registrationDate: Date;
   groupRole: GroupMemberRole;
   state: GroupMemberState;
}

export const GroupMemberSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   user: {type: Schema.Types.ObjectId, ref: 'User'},
   registrationDate: Date,
   groupRoles: [
      {
         type: String,
         default: GroupMemberRole.MEMBER,
      },
   ],
   state: {
      type: String,
      default: GroupMemberState.ACTIVE,
   },
});
