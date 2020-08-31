import {fetchFromServer} from '../Fetch';
import {UserViewDto} from './UserViewDto';

export const fetchUserViewData = async (): Promise<UserViewDto> => {
   const data = `query {
      userStats{
        userCount
        usersLastMonth{
            day{
              day
              month
              year
            }
            count
        }
        usersLastYear{
            year
            month
            count
          }
        userGenderStats{
          name
          count
        }
      }
    }`;

   const response: UserViewDto = await fetchFromServer<UserViewDto>('userStats', data);

   return response;
};
