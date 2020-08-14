import {LastMonthDto, LastYearDto, ServerDto} from '../Dto';

export type MeetingViewDto = {
    meetingTotal: number;
    meetingsLastMonth: LastMonthDto[];
    meetingsLastYear: LastYearDto[];
    meetingsPerGroup: ServerDto[];
    sharesPerMeeting: ServerDto[];
};
