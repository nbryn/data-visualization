const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupAccountState = {
   ACTIVE: 'ACTIVE',
   NOT_ACTIVE: 'NOT_ACTIVE',
};

const GroupAccountStatesArray = [GroupAccountState.ACTIVE, GroupAccountState.NOT_ACTIVE];

export const GroupAccountSchema = new Schema({
   name: String,
   registrationDate: Date,
   mainAccount: Boolean,
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
   parent: {type: mongoose.Schema.Types.ObjectId, ref: 'groupaccount'},
   currency: String,
   totalBalance: Number,
   totalShares: Number,
   boxBalance: Number,
   state: {
      type: String,
      enum: GroupAccountStatesArray,
      default: GroupAccountState.ACTIVE,
   },
   description: String,
});

