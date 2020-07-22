const mongoose = require("mongoose");
require("dotenv").config();

const groupAccountSchema = require("../logic/entities/GroupAccount.ts");
const groupMeetingLoanSchema = require("../logic/entities/GroupMeetingLoan.ts");
const groupMeetingSchema = require("../logic/entities/GroupMeeting.ts");
const groupMeetingShareoutSchema = require("../logic/entities/GroupMeetingShareout.ts");
const groupMemberSchema = require("../logic/entities/GroupMember.ts");
const groupSchema = require("../logic/entities/Group.ts");
const userSchema = require("../logic/entities/User.ts");

let groupAccountModel;
let groupMeetingLoanModel;
let groupMeetingModel;
let groupMeetingShareoutModel;
let groupMemberModel;
let groupModel;
let userModel;

let connection;
let isConnected;

async function getModel(model) {
  if (!isConnected) connection = await connectToDB();

  switch (model) {
    case "GroupAccount":
      if (!groupAccountModel)
        groupAccountModel = connection.model(
          "GroupAccount",
          groupAccountSchema
        );
      return groupAccountModel;

    case "GroupMeetingLoan":
      if (!groupMeetingLoanModel)
        groupMeetingLoanModel = connection.model(
          "GroupMeetingLoan",
          groupMeetingLoanSchema
        );
      return groupMeetingLoanModel;

    case "GroupMeeting":
      if (!groupMeetingModel)
        groupMeetingModel = connection.model(
          "GroupMeeting",
          groupMeetingSchema
        );
      return groupMeetingModel;

    case "GroupMeetingShareout":
      if (!groupMeetingShareoutModel)
        groupMeetingShareoutModel = connection.model(
          "GroupMeetingShareout",
          groupMeetingShareoutSchema
        );
      return groupMeetingLoanModel;

    case "GroupMember":
      if (!groupMemberModel)
        groupMemberModel = connection.model("GroupMember", groupMemberSchema);
      return groupMemberModel;

    case "Group":
      if (!groupModel) groupModel = connection.model("Group", groupSchema);
      return groupModel;
      
    case "User":
      if (!userModel) userModel = connection.model("User", userSchema);
      return userModel;
  }
}

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });

    isConnected = true;
    connection = mongoose.connection;

    return connection;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getModel };
