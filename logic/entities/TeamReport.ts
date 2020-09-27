import {Document, Schema} from 'mongoose';

export enum TeamReportState {
   ACTIVE = 'ACTIVE',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export interface TeamReport extends Document {
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
      default: TeamReportState.ACTIVE;
   };
   description: string;
}

export const TeamReportSchema = new Schema({
   name: String,
   registrationDate: Date,
   mainAccount: Boolean,
   group: {type: Schema.Types.ObjectId, ref: 'Group'},
   parent: {type: Schema.Types.ObjectId, ref: 'teamaccount'},
   currency: String,
   totalBalance: Number,
   totalShares: Number,
   boxBalance: Number,
   state: {
      type: String,
      default: TeamReportState.ACTIVE,
   },
   description: String,
});
