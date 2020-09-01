const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupState = {
   CREATING: 'CREATING',
   ACTIVE: 'ACTIVE',
   CLOSING: 'CLOSING',
   CLOSED: 'CLOSED',
   NOT_ACTIVE: 'NOT_ACTIVE',
};

const GroupStatesArray = [GroupState.CREATING, GroupState.ACTIVE, GroupState.NOT_ACTIVE];

export const GroupSchema = new Schema({
   name: String,
   registrationDate: Date,
   currency: String,
   amountPerShare: Number,
   country: String,
   ngoOrganization: String,
   state: {
      type: String,
      enum: GroupStatesArray,
      default: GroupState.CREATING,
   },
   meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groupmeeting' }],
});

