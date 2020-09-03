import {Document, Schema} from 'mongoose';

export enum GroupMeetingState {
   CREATING = 'CREATING',
   ACTIVE = 'ACTIVE',
   ENDING = 'ENDING',
   ENDED = 'ENDED',
}

export interface GroupMeeting extends Document {
   group: Schema.Types.ObjectId;
   registrationDate: Date;
   cycleNumber: Number;
   meetingDay: Date;
   meetingEnded: Date;
   meetingNumber: Number;
   shares: Schema.Types.ObjectId[];
   state: GroupMeetingState;
}

export const GroupMeetingSchema = new Schema({
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   registrationDate: Date,
   cycleNumber: Number,
   meetingDay: Date,
   meetingEnded: Date,
   meetingNumber: Number,
   shares: [{type: Schema.Types.ObjectId, ref: 'groupmeetingshare'}],
   state: {
      type: String,
      default: GroupMeetingState.CREATING,
   },
});
