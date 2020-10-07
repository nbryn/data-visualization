import mongoose from 'mongoose';
require('dotenv').config();

import {TeamReport, TeamReportSchema} from '../logic/entities/TeamReport';
import {TeamEvent, TeamEventSchema} from '../logic/entities/TeamEvent';
import {Match, MatchSchema} from '../logic/entities/Match';
import {TeamMeeting, TeamMeetingSchema} from '../logic/entities/TeamMeeting';
import {Player, PlayerSchema} from '../logic/entities/Player';
import {Team, TeamSchema} from '../logic/entities/Team';
import {User, UserSchema} from '../logic/entities/User';

export let TeamReportModel: mongoose.Model<TeamReport, {}>;
export let TeamEventModel: mongoose.Model<TeamEvent, {}>;
export let MatchModel: mongoose.Model<Match, {}>;
export let TeamMeetingModel: mongoose.Model<TeamMeeting, {}>;
export let PlayerModel: mongoose.Model<Player, {}>;
export let TeamModel: mongoose.Model<Team, {}>;
export let UserModel: mongoose.Model<User, {}>;

let connection: any;
let isConnected = false;

export async function connectToDB(): Promise<void> {
   try {
      // @ts-ignore
      await mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true,
      });

      if (isConnected) return;

      isConnected = true;
      connection = mongoose.connection;

      TeamReportModel = connection.model('TeamReport', TeamReportSchema);
      TeamEventModel = connection.model('TeamEvent', TeamEventSchema);
      MatchModel = connection.model('Match', MatchSchema);
      TeamMeetingModel = connection.model('TeamMeeting', TeamMeetingSchema);
      PlayerModel = connection.model('TeamMember', PlayerSchema);
      TeamModel = connection.model('Team', TeamSchema);
      UserModel = connection.model('User', UserSchema);
   } catch (err) {
      console.log(err);
   }
}
