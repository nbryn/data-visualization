const mongoose = require("mongoose");
require("dotenv").config();

const groupMeetingSchema = require("../logic/entities/GroupMeeting");
const groupMemberSchema = require("../logic/entities/GroupMember");
const groupSchema = require("../logic/entities/Group");
const userSchema = require("../logic/entities/User");

let userModel;
let groupModel;
let groupMeetingModel;
let groupMemberModel;

let connection;
let isConnected;

async function getModel(model) {
  if (!isConnected) connection = await connectToDB();

  switch (model) {
    case "User":
      if (!userModel) userModel = connection.model("User", userSchema);
      return userModel;

    case "Group":
      if (!groupModel) groupModel = connection.model("Group", groupSchema);
      return groupModel;

    case "GroupMeeting":
      if (!groupMeetingModel)
        groupMeetingModel = connection.model(
          "GroupMeeting",
          groupMeetingSchema
        );
      return groupModel;
      
    case "GroupMember":
      if (!groupMemberModel)
        groupModel = connection.model("GroupMember", groupMemberSchema);
      return groupMemberModel;
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
