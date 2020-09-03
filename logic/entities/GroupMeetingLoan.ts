import mongoose, {Document, Schema} from 'mongoose';

export interface GroupMeetingLoan extends Document {
   group: mongoose.Schema.Types.ObjectId;
   account: mongoose.Schema.Types.ObjectId;
   meeting: mongoose.Schema.Types.ObjectId;
   member: mongoose.Schema.Types.ObjectId;
   registrationDate: Date;
   amount: Number;
   currency: String;
   totalAmount: Number;
}

export const GroupMeetingLoanSchema = new Schema({
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
   account: {type: mongoose.Schema.Types.ObjectId, ref: 'groupaccount'},
   meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'groupmeeting'},
   member: {type: mongoose.Schema.Types.ObjectId, ref: 'groupmember'},
   registrationDate: Date,
   amount: Number,
   currency: String,
   totalAmount: Number,
});
