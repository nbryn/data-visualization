import {Document, Schema} from 'mongoose';

export enum GroupAccountState {
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export interface GroupAccount extends Document {
   name: string;
   registrationDate: Date;
   mainAccount: boolean;
   group: Schema.Types.ObjectId;
   parent: Schema.Types.ObjectId;
   currency: string;
   totalBalance: number;
   totalShares: number;
   boxBalance: number;
   state: {
      type: string;
      default: GroupAccountState.ACTIVE;
   };
   description: string;
}

export const GroupAccountSchema = new Schema({
   name: String,
   registrationDate: Date,
   mainAccount: Boolean,
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   parent: {type: Schema.Types.ObjectId, ref: 'groupaccount'},
   currency: String,
   totalBalance: Number,
   totalShares: Number,
   boxBalance: Number,
   state: {
      type: String,
      default: GroupAccountState.ACTIVE,
   },
   description: String,
});
