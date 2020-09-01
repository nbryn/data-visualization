const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const GroupMeetingShareoutSchema = new Schema({
   registrationDate: Date,
   meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'groupmeeting'},
   account: {type: mongoose.Schema.Types.ObjectId, ref: 'groupaccount'},
   currency: String,
   totalShares: Number,
   shareValue: Number,
   boxBalance: Number,
   shareAmount: Number,
   leftInBox: Number,
});

