import {LastMonthDto, LastYearDto, ServerDto} from '../Dto';

export type UserViewDto = {
   userCount: number;
   usersLastMonth: LastMonthDto[];
   usersLastYear: LastYearDto[];
   userGenderStats: ServerDto[];
};
