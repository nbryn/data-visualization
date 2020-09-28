import {Document, Schema} from 'mongoose';

import {Team} from './Team';
import {User} from './User';

export enum TeamMemberState {
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export enum TeamMemberRole {
   OWNER = 'OWNER',
   ADMINISTRATOR = 'ADMINISTRATOR',
   MEMBER = 'MEMBER',
}

export interface TeamMember extends Document {
   group: Team;
   user: User;
   registrationDate: Date;
   groupRole: TeamMemberRole;
   state: TeamMemberState;
}

export const TeamMemberSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'team'},
   user: {type: Schema.Types.ObjectId, ref: 'user'},
   registrationDate: Date,
   groupRoles: [
      {
         type: String,
         default: TeamMemberRole.MEMBER,
      },
   ],
   state: {
      type: String,
      default: TeamMemberState.ACTIVE,
   },
});
