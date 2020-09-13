import {Document, Schema} from 'mongoose';

export interface GroupMeetingShareout extends Document {
   registrationDate: Date;
   meeting: Schema.Types.ObjectId;
   account: Schema.Types.ObjectId;
   currency: string;
   totalShares: number;
   shareValue: number;
   boxBalance: number;
   shareAmount: number;
   leftInBox: number;
}

export const GroupMeetingShareoutSchema = new Schema({
   registrationDate: Date,
   meeting: {type: Schema.Types.ObjectId, ref: 'groupmeeting'},
   account: {type: Schema.Types.ObjectId, ref: 'groupaccount'},
   currency: String,
   totalShares: Number,
   shareValue: Number,
   boxBalance: Number,
   shareAmount: Number,
   leftInBox: Number,
});
