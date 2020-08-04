import { fetchFromServer } from '../Fetch';

export const fetchUserViewData = async (): Promise<any> => {
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
          value
          count
        }
      }
    }`;

    const response = await fetchFromServer('userStats', data);

    return response;
};
