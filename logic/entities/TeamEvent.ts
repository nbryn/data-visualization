import {Document, Schema} from 'mongoose';

import {Team} from './Team';
import {TeamReport} from './TeamReport';
import {Match} from './Match';
import {TeamMember} from './TeamMember';

export interface TeamEvent extends Document {
   Team: Team;
   account: TeamReport;
   meeting: Match;
   member: TeamMember;
   registrationDate: Date;
   amount: number;
   currency: string;
   totalAmount: number;
}

export const TeamEventSchema = new Schema({
   Team: {type: Schema.Types.ObjectId, ref: 'group'},
   account: {type: Schema.Types.ObjectId, ref: 'groupaccount'},
   meeting: {type: Schema.Types.ObjectId, ref: 'groupmeeting'},
   member: {type: Schema.Types.ObjectId, ref: 'groupmember'},
   registrationDate: Date,
   amount: Number,
   currency: String,
   totalAmount: Number,
});
