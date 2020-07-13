const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupState = {
  CREATING: "CREATING",
  ACTIVE: "ACTIVE",
  CLOSING: "CLOSING",
  CLOSED: "CLOSED",
  NOT_ACTIVE: "NOT_ACTIVE",
};

const GroupStatesArray = [
  GroupState.CREATING,
  GroupState.ACTIVE,
  GroupState.NOT_ACTIVE,
];

const GroupSchema = new Schema(
  {
    name: String,
    image: String,
    registrationDate: Date,
    currency: String,
    amountPerShare: Number,
    maximumAmountPerMeeting: Number,
    loanServiceFee: Number,
    loanLimit: Number,
    country: String,
    location: String,
    ngoOrganization: String,
    meetingWeeksBetween: Number,
    state: {
      type: String,
      enum: GroupStatesArray,
      default: GroupState.CREATING,
    },
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupMeeting" }],
  },
  { timestamps: true }
);

module.exports = GroupSchema;
