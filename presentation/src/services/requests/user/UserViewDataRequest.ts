import {fetchFromServer} from '../Fetch';
import {UserViewDTO} from './UserViewDto';

export const fetchUserViewData = async (): Promise<UserViewDTO> => {
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

   const response: UserViewDTO = await fetchFromServer<UserViewDTO>('userStats', data);

   return response;
};
