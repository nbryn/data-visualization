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

const GroupSchema = new Schema({
  name: String,
  image: String,
  registrationDate: Date,
  currency: String,
  amountPerShare: Number,
  country: String,
  location: String,
  ngoOrganization: String,
  state: {
    type: String,
    enum: GroupStatesArray,
    default: GroupState.CREATING,
  },
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupMeeting" }],
});

module.exports = GroupSchema;
