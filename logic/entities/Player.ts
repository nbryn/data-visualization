import {Document, Schema} from 'mongoose';

import {Team} from './Team';
import {User} from './User';

export enum PlayerState {
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export enum PlayerRole {
   OWNER = 'OWNER',
   ADMINISTRATOR = 'ADMINISTRATOR',
   MEMBER = 'MEMBER',
}

export interface Player extends Document {
   group: Team;
   user: User;
   registrationDate: Date;
   groupRole: PlayerRole;
   state: PlayerState;
}

export const PlayerSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'team'},
   user: {type: Schema.Types.ObjectId, ref: 'user'},
   registrationDate: Date,
   groupRoles: [
      {
         type: String,
         default: PlayerRole.MEMBER,
      },
   ],
   state: {
      type: String,
      default: PlayerState.ACTIVE,
   },
});
