import {LastMonthDTO, LastYearDTO, ServerDTO} from '../DTO';

export type UserViewDTO = {
   userCount: number;
   usersLastMonth: LastMonthDTO[];
   usersLastYear: LastYearDTO[];
   userGenderStats: ServerDTO[];
};
