import {Document, Schema} from 'mongoose';

import {Group} from './Group';
import {GroupAccount} from './GroupAccount';
import {GroupMeeting} from './GroupMeeting';
import {GroupMember} from './GroupMember';

export interface GroupMeetingLoan extends Document {
   group: Group;
   account: GroupAccount;
   meeting: GroupMeeting;
   member: GroupMember;
   registrationDate: Date;
   amount: number;
   currency: string;
   totalAmount: number;
}

export const GroupMeetingLoanSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   account: {type: Schema.Types.ObjectId, ref: 'groupaccount'},
   meeting: {type: Schema.Types.ObjectId, ref: 'groupmeeting'},
   member: {type: Schema.Types.ObjectId, ref: 'groupmember'},
   registrationDate: Date,
   amount: Number,
   currency: String,
   totalAmount: Number,
});
