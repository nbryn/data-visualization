import {LastMonthDto, LastYearDto, ServerDto} from '../Dto';

export type GroupViewDto = {
    groupTotal: number;
    groupSize: ServerDto[];
    groupsLastMonth: LastMonthDto[];
    groupsLastYear: LastYearDto[];
}