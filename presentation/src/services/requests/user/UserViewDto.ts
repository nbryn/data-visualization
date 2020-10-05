import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTOs';

export type UserViewDTO = {
   userCount: number;
   usersLastMonth: LastMonthDTO[];
   usersLastYear: LastYearDTO[];
   userGenderStats: ServerDTO[];
};
