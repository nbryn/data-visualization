const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMeetingState = {
  CREATING: "CREATING",
  ACTIVE: "ACTIVE",
  ENDING: "ENDING",
  ENDED: "ENDED",
};

const GroupMeetingStatesArray = [
  GroupMeetingState.CREATING,
  GroupMeetingState.ACTIVE,
  GroupMeetingState.ENDING,
  GroupMeetingState.ENDED,
];

const groupMeetingSchema = new Schema(
  {
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    registrationDate: Date,
    cycleNumber: Number,
    meetingDay: Date,
    meetingEnded: Date,
    meetingNumber: Number,
    state: {
      type: String,
      enum: GroupMeetingStatesArray,
      default: GroupMeetingState.CREATING,
    },
  },
  { timestamps: true }
);

module.exports = groupMeetingSchema;
