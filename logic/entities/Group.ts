import {Document, Schema} from 'mongoose';

import {GroupMeeting} from './GroupMeeting';
import {GroupMember} from './GroupMember';

export enum GroupState {
   CREATING = 'CREATING',
   ACTIVE = 'ACTIVE',
   CLOSING = 'CLOSING',
   CLOSED = 'CLOSED',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export interface Group extends Document {
   name: string;
   registrationDate: Date;
   currency: string;
   amountPerShare: number;
   country: string;
   ngoOrganization: string;
   state: GroupState;
   meetings: GroupMeeting[];
   members: GroupMember[];
}

export const GroupSchema = new Schema({
   name: String,
   registrationDate: Date,
   currency: String,
   amountPerShare: Number,
   country: String,
   ngoOrganization: String,
   state: {
      type: String,
      default: GroupState.CREATING,
   },
   meetings: [{type: Schema.Types.ObjectId, ref: 'groupmeeting'}],
   members: [{type: Schema.Types.ObjectId, ref: 'groupmember'}],
});
