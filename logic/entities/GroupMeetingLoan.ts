const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const GroupMeetingLoanSchema = new Schema({
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
   account: {type: mongoose.Schema.Types.ObjectId, ref: 'groupaccount'},
   meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'groupmeeting'},
   member: {type: mongoose.Schema.Types.ObjectId, ref: 'groupmember'},
   registrationDate: Date,
   dayOfLoan: Date,
   endDate: Date,
   amount: Number,
   currency: String,
   fee: Number,
   totalAmount: Number,
});

