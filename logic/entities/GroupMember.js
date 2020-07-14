const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMemberState = {
  ACTIVE: "ACTIVE",
  NOT_ACTIVE: "NOT_ACTIVE",
};

const GroupMemberStatesArray = [
  GroupMemberState.ACTIVE,
  GroupMemberState.NOT_ACTIVE,
];

const GroupMemberRole = {
  OWNER: "OWNER",
  ADMINISTRATOR: "ADMINISTRATOR",
  KEYHOLDER: "KEYHOLDER",
  MEMBER: "MEMBER",
  CHAIRPERSON: "CHAIRPERSON",
  RECORDKEEPER: "RECORDKEEPER",
  BOXKEEPER: "BOXKEEPER",
  MONEYCOUNTER: "MONEYCOUNTER",
};

const GroupMemberRolesArray = [
  GroupMemberRole.OWNER,
  GroupMemberRole.ADMINISTRATOR,
  GroupMemberRole.KEYHOLDER,
  GroupMemberRole.MEMBER,
  GroupMemberRole.CHAIRPERSON,
  GroupMemberRole.RECORDKEEPER,
  GroupMemberRole.BOXKEEPER,
  GroupMemberRole.MONEYCOUNTER,
];

const groupMemberSchema = new Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registrationDate: Date,
  addedDate: Date,
  memberNumber: Number,
  ngoNumber: String,
  groupRoles: [
    {
      type: String,
      enum: GroupMemberRolesArray,
      default: GroupMemberRole.MEMBER,
    },
  ],
  state: {
    type: String,
    enum: GroupMemberStatesArray,
    default: GroupMemberState.ACTIVE,
  },
});

module.exports = groupMemberSchema;
