import {Document, Schema} from 'mongoose';

export enum MatchState {
   CREATING = 'CREATING',
   ACTIVE = 'ACTIVE',
   ENDING = 'ENDING',
   ENDED = 'ENDED',
}

export interface Match extends Document {
   group: Schema.Types.ObjectId;
   registrationDate: Date;
   cycleNumber: number;
   meetingDay: Date;
   meetingEnded: Date;
   meetingNumber: number;
   shares: Schema.Types.ObjectId[];
   state: MatchState;
}

export const MatchSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   registrationDate: Date,
   cycleNumber: Number,
   meetingDay: Date,
   meetingEnded: Date,
   meetingNumber: Number,
   shares: [{type: Schema.Types.ObjectId, ref: 'groupmeetingshare'}],
   state: {
      type: String,
      default: MatchState.CREATING,
   },
});
