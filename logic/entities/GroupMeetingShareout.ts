const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMeetingShareoutSchema = new Schema({
    registrationDate: Date,
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupMeeting' },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupAccount' },
    currency: String,
    totalShares: Number,
    shareValue: Number,
    boxBalance: Number,
    shareAmount: Number,
    leftInBox: Number,
});

module.exports = groupMeetingShareoutSchema;
