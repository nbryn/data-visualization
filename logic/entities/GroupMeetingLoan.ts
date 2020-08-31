const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMeetingLoanSchema = new Schema({
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
   account: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupAccount'},
   meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupMeeting'},
   member: {type: mongoose.Schema.Types.ObjectId, ref: 'GroupMember'},
   registrationDate: Date,
   dayOfLoan: Date,
   endDate: Date,
   amount: Number,
   currency: String,
   fee: Number,
   totalAmount: Number,
});

module.exports = groupMeetingLoanSchema;
