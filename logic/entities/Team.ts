import {Document, Schema} from 'mongoose';

import {Match} from './Match';
import {TeamMember} from './TeamMember';

export enum TeamState {
   CREATING = 'CREATING',
   ACTIVE = 'ACTIVE',
   CLOSING = 'CLOSING',
   CLOSED = 'CLOSED',
   NOT_ACTIVE = 'NOT_ACTIVE',
}

export interface Team extends Document {
   name: string;
   registrationDate: Date;
   currency: string;
   amountPerShare: number;
   country: string;
   ngoOrganization: string;
   state: TeamState;
   meetings: Match[];
   members: TeamMember[];
}

export const TeamSchema = new Schema({
   name: String,
   registrationDate: Date,
   currency: String,
   amountPerShare: Number,
   country: String,
   ngoOrganization: String,
   state: {
      type: String,
      default: TeamState.CREATING,
   },
   meetings: [{type: Schema.Types.ObjectId, ref: 'match'}],
   members: [{type: Schema.Types.ObjectId, ref: 'teammember'}],
});
