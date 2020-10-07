import {Document, Schema} from 'mongoose';

import {Team} from './Team';
import {TeamReport} from './TeamReport';
import {Match} from './Match';
import {Player} from './Player';

export interface TeamEvent extends Document {
   Team: Team;
   account: TeamReport;
   meeting: Match;
   member: Player;
   registrationDate: Date;
   amount: number;
   currency: string;
   totalAmount: number;
}

export const TeamEventSchema = new Schema({
   Team: {type: Schema.Types.ObjectId, ref: 'team'},
   account: {type: Schema.Types.ObjectId, ref: 'teamreport'},
   meeting: {type: Schema.Types.ObjectId, ref: 'match'},
   member: {type: Schema.Types.ObjectId, ref: 'teammember'},
   registrationDate: Date,
   amount: Number,
   currency: String,
   totalAmount: Number,
});
