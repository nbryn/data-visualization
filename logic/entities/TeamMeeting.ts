import {Document, Schema} from 'mongoose';

export interface TeamMeeting extends Document {
   registrationDate: Date;
   meeting: Schema.Types.ObjectId;
   account: Schema.Types.ObjectId;
   currency: string;
   totalShares: number;
   shareValue: number;
   boxBalance: number;
   shareAmount: number;
}

export const TeamMeetingSchema = new Schema({
   registrationDate: Date,
   meeting: {type: Schema.Types.ObjectId, ref: 'match'},
   account: {type: Schema.Types.ObjectId, ref: 'teamreport'},
   currency: String,
   totalShares: Number,
   shareValue: Number,
   boxBalance: Number,
   shareAmount: Number,
});
